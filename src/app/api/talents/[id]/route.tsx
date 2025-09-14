// /app/api/talents/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import  TalentUser  from "@/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const {id} = await params

    const talent = await TalentUser.findById(id).select(
      "-password -resetPasswordToken -emailVerificationToken -billing -notifications"
    );

    if (!talent) {
      return NextResponse.json({ error: "Talent not found" }, { status: 404 });
    }

    // Check if profile is public
    if (!talent.privacy.profileVisible) {
      return NextResponse.json(
        { error: "Profile is private" },
        { status: 403 }
      );
    }

    return NextResponse.json(talent);
  } catch (error) {
    console.error("Error fetching talent:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent" },
      { status: 500 }
    );
  }
}
