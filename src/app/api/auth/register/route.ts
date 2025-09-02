import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validators";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email/send-mail";
import { connectDB } from "@/lib/mongodb";
import { TalentUser } from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ Validate input with Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { fullname, email, password, role } = validationResult.data;

    // ✅ Ensure DB connection
    await connectDB();

    // ✅ Check if user already exists
    const existingUser = await TalentUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    // ✅ Create user with Mongoose
    const newUser = await TalentUser.create({
      fullname,
      email,
      password: hashedPassword,
      role: role || "student",
      emailVerified: null,
      emailVerificationToken,
      image: null,
    });

    // ✅ Send verification email
    await sendVerificationEmail(email, fullname, emailVerificationToken);

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful. Please check your email to verify your account.",
        userId: (newUser._id as string).toString(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    // ✅ Handle duplicate email (MongoDB error code 11000)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
