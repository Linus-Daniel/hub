import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { TalentUser } from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email/send-mail";

// Schemas
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const newPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = resetPasswordSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // ✅ Ensure DB connection
    await connectDB();

    const user = await TalentUser.findOne({ email });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists, you will receive a reset link",
        },
        { status: 200 }
      );
    }

    // ✅ Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // ✅ Save token & expiry on user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    user.updatedAt = new Date();
    await user.save();

    // ✅ Send email
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetUrl, user.fullname);

    console.log(`🔑 Reset token for ${email}: ${resetToken}`);

    return NextResponse.json(
      {
        success: true,
        message: "If an account exists, you will receive a reset link",
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

// Reset password with token
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = newPasswordSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { token, password } = validationResult.data;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // ✅ Ensure DB connection
    await connectDB();

    const user = await TalentUser.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Update password & clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
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
