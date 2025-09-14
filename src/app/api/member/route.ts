// app/api/member/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

// POST handler to accept JSON body
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId; // make sure body has { userId: "..." }

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const collection = await getCollection("joinUsApplicants");
    const doc = await collection.findOne({ _id: new ObjectId(userId) });
    
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
