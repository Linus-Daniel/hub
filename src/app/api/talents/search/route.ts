// /app/api/talents/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import  TalentUser from "@/models/User";
import { Skill } from "@/models/Skills";
import { Project } from "@/models/Projects";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const major = searchParams.get("major") || "";
    const location = searchParams.get("location") || "";
    const skill = searchParams.get("skill") || "";
    const technology = searchParams.get("technology") || "";
    const sortBy = searchParams.get("sortBy") || "relevance";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // Build the aggregation pipeline
    const pipeline: any[] = [];

    // Start with users that have visible profiles
    pipeline.push({
      $match: {
        "privacy.profileVisible": true,
      },
    });

    // Join with skills collection
    pipeline.push({
      $lookup: {
        from: "skills",
        localField: "_id",
        foreignField: "user",
        as: "skills",
      },
    });

    // Join with projects collection
    pipeline.push({
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "userId",
        as: "projects",
      },
    });

    // Build match conditions
    const matchConditions: any[] = [];

    // Text search across multiple fields
    if (query) {
      matchConditions.push({
        $or: [
          { fullname: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } },
          { major: { $regex: query, $options: "i" } },
          { university: { $regex: query, $options: "i" } },
          { "skills.name": { $regex: query, $options: "i" } },
          { "skills.description": { $regex: query, $options: "i" } },
          { "projects.title": { $regex: query, $options: "i" } },
          { "projects.description": { $regex: query, $options: "i" } },
        ],
      });
    }

    // Filter by major
    if (major) {
      matchConditions.push({ major });
    }

    // Filter by location
    if (location) {
      matchConditions.push({ location });
    }

    // Filter by specific skill
    if (skill) {
      matchConditions.push({
        "skills.name": { $regex: skill, $options: "i" },
      });
    }

    // Filter by technology (in projects)
    if (technology) {
      matchConditions.push({
        "projects.technologies": { $in: [technology] },
      });
    }

    // Apply all match conditions
    if (matchConditions.length > 0) {
      pipeline.push({
        $match: {
          $and: matchConditions,
        },
      });
    }

    // Add computed fields for sorting
    pipeline.push({
      $addFields: {
        skillCount: { $size: "$skills" },
        projectCount: { $size: "$projects" },
        totalEndorsements: {
          $sum: "$skills.endorsements",
        },
        avgProficiency: {
          $avg: "$skills.proficiency",
        },
        // Relevance score for text search
        relevanceScore: {
          $add: [
            {
              $cond: [
                {
                  $regexMatch: {
                    input: "$fullname",
                    regex: query,
                    options: "i",
                  },
                },
                10,
                0,
              ],
            },
            {
              $cond: [
                { $regexMatch: { input: "$bio", regex: query, options: "i" } },
                5,
                0,
              ],
            },
            {
              $multiply: [
                {
                  $size: {
                    $filter: {
                      input: "$skills",
                      cond: {
                        $regexMatch: {
                          input: "$$this.name",
                          regex: query,
                          options: "i",
                        },
                      },
                    },
                  },
                },
                3,
              ],
            },
            {
              $multiply: [
                {
                  $size: {
                    $filter: {
                      input: "$projects",
                      cond: {
                        $regexMatch: {
                          input: "$$this.title",
                          regex: query,
                          options: "i",
                        },
                      },
                    },
                  },
                },
                2,
              ],
            },
          ],
        },
      },
    });

    // Sorting
    let sortStage: any = {};
    switch (sortBy) {
      case "name":
        sortStage = { fullname: 1 };
        break;
      case "skills":
        sortStage = { skillCount: -1, avgProficiency: -1 };
        break;
      case "projects":
        sortStage = { projectCount: -1 };
        break;
      case "endorsements":
        sortStage = { totalEndorsements: -1 };
        break;
      case "relevance":
        sortStage = query
          ? { relevanceScore: -1, skillCount: -1 }
          : { createdAt: -1 };
        break;
      default:
        sortStage = { createdAt: -1 };
    }

    pipeline.push({ $sort: sortStage });

    // Pagination
    const skip = (page - 1) * limit;

    // Get total count before pagination
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await TalentUser.aggregate(countPipeline);
    const totalCount = countResult[0]?.total || 0;

    // Apply pagination
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Project only necessary fields
    pipeline.push({
      $project: {
        password: 0,
        resetPasswordToken: 0,
        emailVerificationToken: 0,
        resetPasswordExpires: 0,
        "skills.user": 0,
        "projects.userId": 0,
      },
    });

    // Execute the pipeline
    const talents = await TalentUser.aggregate(pipeline);

    // Calculate metadata
    const totalPages = Math.ceil(totalCount / limit);

    // Get unique values for filters
    const allTalents = await TalentUser.find({
      "privacy.profileVisible": true,
    }).select("major location");
    const uniqueMajors = [
      ...new Set(allTalents.map((t) => t.major).filter(Boolean)),
    ];
    const uniqueLocations = [
      ...new Set(allTalents.map((t) => t.location).filter(Boolean)),
    ];

    // Get popular skills and technologies
    const popularSkills = await Skill.aggregate([
      { $group: { _id: "$name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    const popularTechnologies = await Project.aggregate([
      { $unwind: "$technologies" },
      { $group: { _id: "$technologies", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    return NextResponse.json({
      talents,
      metadata: {
        total: totalCount,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        majors: uniqueMajors,
        locations: uniqueLocations,
        popularSkills: popularSkills.map((s) => s._id),
        popularTechnologies: popularTechnologies.map((t) => t._id),
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

// /app/talents/page.tsx (Updated version with advanced search)
