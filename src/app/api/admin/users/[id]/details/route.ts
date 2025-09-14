// hub/src/app/api/admin/users/[id]/details/route.ts
import TalentUser from "@/models/User";
import { Skill } from "@/models/Skills";
import { Project } from "@/models/Projects";
import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/validateToken"; // Use this instead
import { createOptionsResponse, addCorsHeaders } from "@/lib/cors";
import { connectDB } from "@/lib/mongodb";

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return createOptionsResponse(origin as string);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to database
    await connectDB();

    const { id } = await params;

    // Use validateAdminToken instead of getServerSession
    const tokenData = await validateAdminToken(req);
    console.log("Admin request from:", tokenData);

    // Find user and exclude password
    const user = await TalentUser.findById(id).select("-password");

    if (!user) {
      const response = NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, req);
    }

    // Fetch skills and projects with sorting
    const skills = await Skill.find({ user: user._id }).sort({
      category: 1,
      name: 1,
    });
    const projects = await Project.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    // Combine data with counts (as expected by frontend)
    const userDetails = {
      ...user.toObject(),
      skills,
      projects,
      skillsCount: skills.length,
      projectsCount: projects.length,
    };

    const response = NextResponse.json(userDetails);
    return addCorsHeaders(response, req);
  } catch (error) {
    console.error("Error fetching user details:", error);

    let statusCode = 500;
    let errorMessage = "Failed to fetch user details";

    if (error instanceof Error) {
      errorMessage = error.message;
      if (
        error.message.includes("permission") ||
        error.message.includes("admin") ||
        error.message.includes("authorization") ||
        error.message.includes("token")
      ) {
        statusCode = 401;
      }
    }

    const response = NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
    return addCorsHeaders(response, req);
  }
}
