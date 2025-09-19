import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getCollection } from "@/lib/mongodb";
const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...hiringRequest } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing _id" }, { status: 400 });
    }

    const objectId = new ObjectId(_id);
    const hiringRequestsCol = await getCollection("hiringRequests");
    const joinUsApplicantsCol = await getCollection("joinUsApplicants");

    // update hiringRequest itself
    const result = await hiringRequestsCol.updateOne(
      { _id: objectId },
      { $set: hiringRequest }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "No hiring request found with that id" },
        { status: 404 }
      );
    }

    // if assignedTeam exists, update each member in joinUsApplicants
    if (hiringRequest.details?.assignedTeam?.length > 0) {
      const eventPayload = {
        id: hiringRequest.id, // hiringRequest id
        eventsDate: hiringRequest.details.eventTimes, // you might replace with eventTimes[0]?.eventDate
        title: hiringRequest.details.eventType,
        location: hiringRequest.details.location,
        contact: hiringRequest.details.phone,
        pinCode: hiringRequest.details.pinCode,
        nearArea: hiringRequest.details.nearArea,
        district: hiringRequest.details.dist,
        state: hiringRequest.details.state,
      };

      for (const member of hiringRequest.details.assignedTeam) {
        if (!member?.id) continue;

        await joinUsApplicantsCol.updateOne(
          { id: member.id }, 
          {
            $push: {
              events: eventPayload,
            },
          } 
        );
      }
    }

    return NextResponse.json(
      { message: "Updated successfully", updatedData: hiringRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("id");

    if (!clientId) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const db = client.db();
    const collection = db.collection("hiringRequests");

    // 👉 if you use _id as ObjectId
    const doc = await collection.findOne({ _id: new ObjectId(clientId) });

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {   
    const hiringForm = await request.json();

   if (hiringForm.warmup) {
      if(!clientPromise){
        await getCollection("hiringRequests");
      }
      return NextResponse.json({ success: true, warmedUp: true });
    }


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

     const collection = await getCollection("hiringRequests");
    const result = await collection.insertOne({
      ...hiringForm,
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
