import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const userIdCookie = await (await cookieStore).get("asan_user_id");
    const userId = userIdCookie?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // ✅ Fetch all collections in parallel
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
