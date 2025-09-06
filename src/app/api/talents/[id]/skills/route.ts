// /app/api/talents/[id]/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skills";
import { Types } from "mongoose";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const skills = await Skill.find({ user: new Types.ObjectId(id) });

    if (!skills || skills.length === 0) {
      console.log("No skills found for this user");
      return NextResponse.json(
        { message: "No skills found for this user", skills: [] },
        { status: 404 }
      );
    }

    console.log(`
      Attempting to fetch skills of a user with ID: ${id}
      Fetched ${skills.length} skills
    `);

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
