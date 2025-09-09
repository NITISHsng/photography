import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { request } from "http";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(request: Request) {
  const clientId= await request.json();
  
  try {


    if (!clientId) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    // const client = await getClient();
    const db = client.db();
    const collection = db.collection("hiringRequests");

    const doc = await collection.findOne({ _id: clientId });

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const hiringForm = await request.json();
    console.log("Received hiringForm:", hiringForm);

    // Validate required nested fields
    const requiredDetailFields = [
      "name",
      "email",
      "phone",
      "eventType",
      "location",
    ];

    for (const field of requiredDetailFields) {
      if (
        !hiringForm.details[field] ||
        (typeof hiringForm.details[field] === "string" &&
          hiringForm.details[field].trim() === "")
      ) {
        return NextResponse.json(
          { error: `Missing or empty field: details.${field}` },
          { status: 400 }
        );
      }
    }

    // Validate at least one eventTime with eventDate/startTime/endTime
    if (
      !Array.isArray(hiringForm.details.eventTimes) ||
      hiringForm.details.eventTimes.length === 0 ||
      !hiringForm.details.eventTimes[0].eventDate
    ) {
      return NextResponse.json(
        { error: "Missing or invalid eventTimes" },
        { status: 400 }
      );
    }

    // You can also validate requiredServices if needed (example for videoCategory)
    if (!hiringForm.requiredServices.videography.videoCategory?.id) {
      return NextResponse.json(
        { error: "Missing videography.videoCategory" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db();
    const collection = db.collection("hiringRequests");

    const result = await collection.insertOne({
      ...hiringForm,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Hiring form submitted successfully",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Hiring form failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
