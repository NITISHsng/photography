import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===================== GET: Fetch operators with pagination =====================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const role = searchParams.get("role") || "";

    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("staff");

    // Build query
    const query: any = { role: "operator" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { operatorId: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (role) {
      query.operatorRole = role;
    }

    // Get total count for pagination
    const total = await collection.countDocuments(query);

    // Get operators with pagination
    const operators = await collection
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Map operators to safe data
    const safeOperators = operators.map((op) => ({
      id: op._id.toString(),
      operatorId: op.operatorId,
      name: op.name,
      email: op.email,
      phone: op.phone,
      location: op.location,
      status: op.status || "active",
      role: op.operatorRole || "Operator",
      permissions: op.permissions || [],
      joinDate: op.joinDate || new Date().toISOString().split("T")[0],
      lastLogin: op.lastLogin || null,
    }));

    return NextResponse.json({
      operators: safeOperators,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Fetch operators error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ===================== POST: Create new operator =====================
export async function POST(req: Request) {
  try {
    const operatorData = await req.json();

    // Validate required fields
    const requiredFields = ["name", "email", "operatorId", "password"];
    for (const field of requiredFields) {
      if (!operatorData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("staff");

    // Check if operator with same ID or email already exists
    const existingOperator = await collection.findOne({
      $or: [
        { operatorId: operatorData.operatorId },
        { email: operatorData.email },
      ],
    });

    if (existingOperator) {
      return NextResponse.json(
        {
          error: "An operator with this ID or email already exists",
        },
        { status: 409 }
      );
    }

    // Create new operator document
    const newOperator = {
      ...operatorData,
      role: "operator",
      status: operatorData.status || "active",
      createdAt: new Date(),
      lastLogin: null,
    };

    const result = await collection.insertOne(newOperator);

    // Log to auditLogs (optional — you can remove this too if not needed)
    await db.collection("auditLogs").insertOne({
      action: "create_operator",
      targetId: result.insertedId,
      details: {
        operatorId: operatorData.operatorId,
        name: operatorData.name,
        email: operatorData.email,
      },
      timestamp: new Date(),
    });

    return NextResponse.json(
      {
        message: "Operator created successfully",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create operator error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
