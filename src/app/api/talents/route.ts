// /app/api/talents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TalentUser } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch all users with public profiles
    const talents = await TalentUser.find({
      "privacy.profileVisible": true,
      status: "approved",
    })
      .select("-password -resetPasswordToken -emailVerificationToken")
      .sort({ createdAt: -1 });

    return NextResponse.json(talents);
  } catch (error) {
    console.error("Error fetching talents:", error);
    return NextResponse.json(
      { error: "Failed to fetch talents" },
      { status: 500 }
    );
  }
}
