// app/api/member/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

// POST handler to accept JSON body
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const staffId = body.staffId; // make sure body has { staffId: "..." }

    if (!staffId) {
      return NextResponse.json({ error: "staffId is required" }, { status: 400 });
    }

    const collection = await getCollection("joinUsApplicants");
    const doc = await collection.findOne({ _id: new ObjectId(staffId) });
    
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
