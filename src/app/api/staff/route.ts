import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { StaffWithId, Staff } from "@/contexts/fromType";

export async function POST(req: Request) {
  try {
    const body: Staff = await req.json();

    // ✅ Validate user input
    if (!body.name || !body.phone || !body.role) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: patient name or phone number",
        },
        { status: 400 }
      );
    }

    // ✅ Get collection
    const collection = await getCollection<Staff>("staff");

    const result = await collection.insertOne({
      ...body,
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: unknown) {
    console.error("Error in api:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body: StaffWithId = await req.json();

    // ✅ Validate user input
    if (!body ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: staffId or amount" },
        { status: 400 }
      );
    }

    // ✅ Get collection
    const collection = await getCollection<StaffWithId>("staff");

    // ✅ Push a new payment record into paymentHistory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = body;


const result = await collection.replaceOne(
  { staffId: body.staffId }, // filter
  rest                       // full replacement without _id
);


    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Staff not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in API:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { staffId } = body;

    if (!staffId) {
      return NextResponse.json(
        { success: false, error: "Staff ID is required" },
        { status: 400 }
      );
    }

    const collection = await getCollection<Staff>("staff");

    const result = await collection.deleteOne({ staffId: staffId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Staff not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in DELETE /api/staff:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
