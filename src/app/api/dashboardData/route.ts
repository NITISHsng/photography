import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const [hiringRequests, joinUsApplicants, contactMessages] = await Promise.all([
      db.collection("hiringRequests").find({}).sort({ createdAt: -1 }).toArray(),
      db.collection("joinUsApplicants").find({}).sort({ createdAt: -1 }).toArray(),
      db.collection("contactMessages").find({}).sort({ createdAt: -1 }).toArray(),
    ]);

    return NextResponse.json({
      hiringRequests,
      joinUsApplicants,
      contactMessages,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
