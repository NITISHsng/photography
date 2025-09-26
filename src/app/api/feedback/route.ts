import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, feedbackText,clientName, rating } = body;

    // ✅ Validate input
    if (!feedbackText || !rating) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Insert feedback
    const feedbackCollection = await getCollection("feedbacks");
    const result = await feedbackCollection.insertOne({
      clientId: id,
      publicView:false,
      feedbackText,
      rating,
      clientName,
      createdAt: new Date(),
    });


    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: unknown) {
    console.error("Error in feedback API:", error);

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