import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skills";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all skills for user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const skills = await Skill.find({ user: session.user.id }).sort({
      category: 1,
      proficiency: -1,
    });

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST new skill
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const skill = await Skill.create({
      ...body,
      user: session.user.id,
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
