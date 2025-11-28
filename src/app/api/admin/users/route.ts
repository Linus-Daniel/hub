import { NextRequest, NextResponse } from "next/server";
import TalentUser from "@/models/User";
import { validateAdminToken } from "@/lib/validateToken";
import { connectDB } from "@/lib/mongodb";
import { addCorsHeaders, createOptionsResponse } from "@/lib/cors";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Validate admin token
    const tokenData = await validateAdminToken(request);
    console.log("Admin request from:", tokenData.email);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { fullName: { $regex: search, $options: "i" } }, // Changed from name to fullName
          { email: { $regex: search, $options: "i" } },
          { institution: { $regex: search, $options: "i" } }, // Changed from university to institution
          { major: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await TalentUser.find(searchQuery)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await TalentUser.countDocuments(searchQuery);

    const response = NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

    return addCorsHeaders(response, request);
  } catch (error) {
    console.error("Error in admin/users API:", error);

    let statusCode = 500;
    let errorMessage = "Failed to fetch users";

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
    return addCorsHeaders(response, request);
  }
}

export async function OPTIONS(request: NextRequest) {
  return createOptionsResponse();
}
