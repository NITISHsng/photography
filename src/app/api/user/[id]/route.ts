import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; 
import { ObjectId } from "mongodb";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("staff");

    const user = await collection.findOne({ _id: new ObjectId(params.id) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Fetch user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
