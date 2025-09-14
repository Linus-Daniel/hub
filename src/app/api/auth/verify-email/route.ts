import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import  TalentUser  from "@/models/User";
import { sendWelcomeEmail } from "@/lib/email/send-mail";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token is required" },
        { status: 400 }
      );
    }

    // Ensure DB is connected
    await connectDB();

    // Find user with this verification token
    const user = await TalentUser.findOne({ emailVerificationToken: token });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Mark email as verified
    user.emailVerified = new Date();
    user.updatedAt = new Date();
    user.emailVerificationToken = undefined; // remove token
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.fullname || user.email);

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully! You can now log in.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
