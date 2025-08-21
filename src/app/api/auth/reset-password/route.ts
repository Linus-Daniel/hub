import { NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validators";
import { findUserByEmail } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        {
          success: true,
          message:
            "If an account exists with this email, you will receive a reset link",
        },
        { status: 200 }
      );
    }

    // In production, you would:
    // 1. Generate a secure reset token
    // 2. Store it in database with expiration
    // 3. Send email with reset link

    console.log(`Password reset requested for: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with this email, you will receive a reset link",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
