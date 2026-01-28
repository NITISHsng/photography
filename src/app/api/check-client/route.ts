// app/api/check-client/route.ts

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import type { BookingWithId } from "@/contexts/fromType";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { valid: false, error: "Missing booking ID" },
        { status: 400 }
      );
    }

    const hiringCollection = await getCollection<BookingWithId>("hiringRequests");
    const client = await hiringCollection.findOne({ id });

    if (!client) {
      // Client not found → log info (not error)
      console.log(`Client ID "${id}" not found.`);
    }

    return NextResponse.json({ valid: !!client });
  } catch (err) {
    // Only unexpected errors are logged as errors
    console.error("API error:", err);
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 }
    );
  }
}
