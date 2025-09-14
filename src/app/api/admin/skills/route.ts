// Hub App - hub/src/app/api/admin/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/models/Skills";
import { validateAdminToken } from "@/lib/validateToken";
import { connectDB } from "@/lib/mongodb";
import TalentUser from "@/models/User";
function addCorsHeaders(response: NextResponse) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    process.env.ADMIN_DOMAIN || "http://localhost:3000"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    await validateAdminToken(request);
const userData = await TalentUser.find()
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const skip = (page - 1) * limit;

    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      searchQuery = { ...searchQuery, category };
    }

    const skills = await Skill.find(searchQuery)
      .populate("user", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Skill.countDocuments(searchQuery);
    const categories = await Skill.distinct("category");

    const response = NextResponse.json({
      skills,
      categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

    return addCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching skills:", error);

    let statusCode = 500;
    let errorMessage = "Failed to fetch skills";

    if (error instanceof Error) {
      errorMessage = error.message;
      if (
        error.message.includes("permission") ||
        error.message.includes("admin")
      ) {
        statusCode = 401;
      }
    }

    const response = NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
    return addCorsHeaders(response);
  }
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env.ADMIN_DOMAIN || "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
