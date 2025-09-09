import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function verifyConnection() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    return true;
  } catch (err) {
    console.error("MongoDB ping failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const { userType, userId, operatorId, memberId, password } =
      await req.json();

    // Validate required fields
    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

    if (!["admin", "operator", "member"].includes(userType)) {
      return NextResponse.json(
        { error: "Invalid user type" },
        { status: 400 }
      );
    }

    if (userType === "admin" && !userId) {
      return NextResponse.json(
        { error: "Admin user ID required" },
        { status: 400 }
      );
    }
    if (userType === "operator" && !operatorId) {
      return NextResponse.json(
        { error: "Operator ID required" },
        { status: 400 }
      );
    }
    if (userType === "member" && !memberId) {
      return NextResponse.json(
        { error: "Member ID required" },
        { status: 400 }
      );
    }

    // Verify MongoDB connection
    const isConnected = await verifyConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    let collection;
    if (userType === "member") {
      collection = db.collection("joinUsApplicants");
    } else {
      collection = db.collection("staff");
    }

    // Find user
    let user = null;
    if (userType === "admin") {
      user = await collection.findOne({ userId, role: "admin" });
    } else if (userType === "operator") {
      user = await collection.findOne({ operatorId, role: "operator" });
    } else {
      user = await collection.findOne({ memberId });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Check if inactive
    if (user.status === "inactive") {
      return NextResponse.json(
        { error: "Account is inactive" },
        { status: 403 }
      );
    }

    // Verify password (plain text)
    if (user.password !== password) {
      // Log failed attempt
      await db.collection("auditLogs").insertOne({
        action: "failed_login",
        userType,
        userId:
          userType === "admin"
            ? userId
            : userType === "operator"
            ? operatorId
            : memberId,
        timestamp: new Date(),
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      });

      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Update last login
    await collection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    // Log success
    await db.collection("auditLogs").insertOne({
      action: "successful_login",
      userType,
      userId: user._id.toString(),
      timestamp: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
    });

    // Create safe response
    const response = NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status || "active",
    });

    // Cookies
    response.cookies.set({
      name: "asan_user_id",
      value: user._id.toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set({
      name: "asan_user_role",
      value: user.role,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `Internal server error: ${(err as Error).message}`
        : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
