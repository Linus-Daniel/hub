// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { User } from "@/types";
import clientPromise from "@/lib/mongodb";

interface Params  {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const client = await clientPromise 
    const db = client.db("talent_directory");
    const {id} = await params
    const user = await db.collection<User>("users").findOne({
      _id: id ,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("talent_directory");
    const {id} = await params

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    const result = await db
      .collection<User>("users")
      .updateOne({ _id: id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("talent_directory");
    const {id} = await params

    const result = await db.collection<User>("users").deleteOne({
      _id: id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
