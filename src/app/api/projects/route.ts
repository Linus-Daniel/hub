import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { authOptions  } from "@/lib/auth";
import { getServerSession } from "next-auth";

// GET all projects for user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session?.user)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const projects = await Project.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const project = await Project.create({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
