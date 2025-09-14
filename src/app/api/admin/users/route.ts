import { NextRequest, NextResponse } from "next/server";
import TalentUser from "@/models/User";
import { validateAdminToken } from "@/lib/validateToken";
import { connectDB } from "@/lib/mongodb";

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
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { university: { $regex: search, $options: "i" } },
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

    return addCorsHeaders(response);
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
