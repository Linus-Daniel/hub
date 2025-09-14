// hub/src/app/api/admin/users/[id]/route.ts
import TalentUser from "@/models/User";
import { Project } from "@/models/Projects";
import { Skill } from "@/models/Skills";
import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/validateToken";
import { createOptionsResponse, addCorsHeaders } from "@/lib/cors";
import { connectDB } from "@/lib/mongodb";

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") as string;
  return createOptionsResponse(origin);
}

// GET - Read single user
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Validate admin token
    const tokenData = await validateAdminToken(req);
    console.log("Admin request from:", tokenData.email);

    // Find user by ID and exclude sensitive fields
    const user = await TalentUser.findById(id).select(
      "-password -resetPasswordToken -emailVerificationToken"
    );

    if (!user) {
      const response = NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, req);
    }

    const response = NextResponse.json({ user });
    return addCorsHeaders(response, req);
  } catch (error) {
    console.error("Error fetching user:", error);

    let statusCode = 500;
    let errorMessage = "Failed to fetch user";

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

// PUT - Update user
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Validate admin token
    const tokenData = await validateAdminToken(req);
    console.log("Admin updating user:", tokenData.email);

    // Get update data from request body
    const updateData = await req.json();

    // Remove sensitive fields that shouldn't be updated via admin panel
    const sensitiveFields = [
      "password",
      "resetPasswordToken",
      "resetPasswordExpires",
      "emailVerificationToken",
      "emailVerified",
    ];

    sensitiveFields.forEach((field) => {
      delete updateData[field];
    });

    // Validate status if being updated
    if (
      updateData.status &&
      !["pending", "approved", "rejected"].includes(updateData.status)
    ) {
      const response = NextResponse.json(
        {
          error: "Invalid status. Must be 'pending', 'approved', or 'rejected'",
        },
        { status: 400 }
      );
      return addCorsHeaders(response, req);
    }

    // Update user with validation
    const updatedUser = await TalentUser.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
      select: "-password -resetPasswordToken -emailVerificationToken", // Exclude sensitive fields
    });

    if (!updatedUser) {
      const response = NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, req);
    }

    console.log(
      `User ${updatedUser.email} updated by admin ${tokenData.email}`
    );

    const response = NextResponse.json({
      user: updatedUser,
      message: "User updated successfully",
    });
    return addCorsHeaders(response, req);
  } catch (error) {
    console.error("Error updating user:", error);

    let statusCode = 500;
    let errorMessage = "Failed to update user";

    if (error instanceof Error) {
      errorMessage = error.message;
      if (
        error.message.includes("permission") ||
        error.message.includes("admin") ||
        error.message.includes("authorization") ||
        error.message.includes("token")
      ) {
        statusCode = 401;
      } else if (
        error.message.includes("validation") ||
        error.message.includes("required") ||
        error.name === "ValidationError"
      ) {
        statusCode = 400;
      } else if (
        error.message.includes("duplicate key")  
      ) {
        statusCode = 409;
        errorMessage = "Email already exists";
      }
    }

    const response = NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
    return addCorsHeaders(response, req);
  }
}

// DELETE - Delete user
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Validate admin token
    const tokenData = await validateAdminToken(req);
    console.log("Admin deleting user:", tokenData.email);

    // Check if user exists
    const userToDelete = await TalentUser.findById(id).select("fullname email");

    if (!userToDelete) {
      const response = NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, req);
    }

    // Optional: Check if user has dependent data (projects, skills)
    const [projectCount, skillCount] = await Promise.all([
      Project.countDocuments({ userId: id }),
      Skill.countDocuments({ user: id }),
    ]);

    // Delete the user
    const deletedUser = await TalentUser.findByIdAndDelete(id);

    // Optional: Also delete user's projects and skills
    // Uncomment if you want cascade delete behavior
    /*
    if (projectCount > 0 || skillCount > 0) {
      await Promise.all([
        Project.deleteMany({ userId: id }),
        Skill.deleteMany({ user: id })
      ]);
      console.log(`Deleted ${projectCount} projects and ${skillCount} skills for user ${userToDelete.email}`);
    }
    */

    console.log(
      `User ${userToDelete.email} deleted by admin ${tokenData.email}`
    );

    const response = NextResponse.json({
      message: "User deleted successfully",
      deletedUser: {
        id: deletedUser?._id,
        fullname: userToDelete.fullname,
        email: userToDelete.email,
      },
      relatedData: {
        projects: projectCount,
        skills: skillCount,
        note:
          projectCount > 0 || skillCount > 0
            ? "Note: User had related projects/skills that may need attention"
            : "No related data found",
      },
    });
    return addCorsHeaders(response, req);
  } catch (error) {
    console.error("Error deleting user:", error);

    let statusCode = 500;
    let errorMessage = "Failed to delete user";

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
