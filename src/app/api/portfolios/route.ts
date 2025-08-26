// app/api/portfolios/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Portfolio } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const client = await clientPromise;
    const db = client.db("talent_directory");

    const query = userId ? { userId } : {};
    const portfolios = await db
      .collection<Portfolio>("portfolios")
      .find(query)
      .toArray();

    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("talent_directory");

    const newPortfolio: Portfolio = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection<Portfolio>("portfolios")
      .insertOne(newPortfolio);

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
        portfolio: newPortfolio,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
