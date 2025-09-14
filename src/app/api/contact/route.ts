import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Handle warmup requests
    if (body.warmup) {
      if (!clientPromise) {
        await getCollection("contactMessages");
      }
      return NextResponse.json({ success: true, warmedUp: true });
    }

    // ✅ Validate user input
    if (!body.name || !body.email || !body.service || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Insert user message
    const collection = await getCollection("contactMessages");
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: unknown) {
    console.error("Error in api:", error);

    // safely handle unknown error type
    let message = "Internal server error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
