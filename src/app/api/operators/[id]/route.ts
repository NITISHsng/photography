import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

// Get a specific operator by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Check user role from cookies
    const cookieStore = cookies();
    const userRole = cookieStore.get('asan_user_role')?.value;
    const userId = cookieStore.get('asan_user_id')?.value;
    
    // Only admin users can access operator details
    if (userRole !== 'admin') {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("staff");

    let operatorId;
    try {
      operatorId = new ObjectId(params.id);
    } catch (error) {
      return NextResponse.json({ error: "Invalid operator ID format" }, { status: 400 });
    }

    const operator = await collection.findOne({ _id: operatorId, role: "operator" });
    if (!operator) {
      return NextResponse.json({ error: "Operator not found" }, { status: 404 });
    }
    
    // Log the access to operator details
    await db.collection("auditLogs").insertOne({
      action: "operator_details_access",
      userId,
      userRole,
      accessedOperatorId: params.id,
      timestamp: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || "unknown"
    });

    // Remove sensitive data
    const { password, ...safeOperator } = operator;
    
    return NextResponse.json({
      id: safeOperator._id.toString(),
      operatorId: safeOperator.operatorId,
      name: safeOperator.name,
      email: safeOperator.email,
      phone: safeOperator.phone || "",
      location: safeOperator.location || "",
      status: safeOperator.status || "active",
      role: safeOperator.operatorRole || "Operator",
      permissions: safeOperator.permissions || [],
      joinDate: safeOperator.joinDate || new Date().toISOString().split('T')[0],
      lastLogin: safeOperator.lastLogin || null
    });
  } catch (err) {
    console.error("Fetch operator error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update an operator
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Check user role from cookies
    const cookieStore = cookies();
    const userRole = cookieStore.get('asan_user_role')?.value;
    const userId = cookieStore.get('asan_user_id')?.value;
    
    // Only admin users can update operators
    if (userRole !== 'admin') {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
    
    const updateData = await req.json();
    
    // Prevent updating sensitive fields
    const { password, role, _id, ...allowedUpdates } = updateData;
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("staff");

    let operatorId;
    try {
      operatorId = new ObjectId(params.id);
    } catch (error) {
      return NextResponse.json({ error: "Invalid operator ID format" }, { status: 400 });
    }

    // Check if operator exists
    const existingOperator = await collection.findOne({ _id: operatorId, role: "operator" });
    if (!existingOperator) {
      return NextResponse.json({ error: "Operator not found" }, { status: 404 });
    }
    
    // If updating email or operatorId, check for duplicates
    if (allowedUpdates.email || allowedUpdates.operatorId) {
      const duplicateQuery: any = { role: "operator", _id: { $ne: operatorId } };
      
      if (allowedUpdates.email) {
        duplicateQuery.email = allowedUpdates.email;
      }
      
      if (allowedUpdates.operatorId) {
        duplicateQuery.operatorId = allowedUpdates.operatorId;
      }
      
      const duplicate = await collection.findOne(duplicateQuery);
      if (duplicate) {
        return NextResponse.json({ 
          error: "An operator with this ID or email already exists" 
        }, { status: 409 });
      }
    }
    
    // Update the operator
    const result = await collection.updateOne(
      { _id: operatorId },
      { $set: { ...allowedUpdates, updatedAt: new Date() } }
    );
    
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes made" }, { status: 400 });
    }
    
    // Log the action for audit
    await db.collection("auditLogs").insertOne({
      action: "update_operator",
      performedBy: "admin", // This should be the actual admin ID
      targetId: operatorId,
      details: {
        updates: Object.keys(allowedUpdates),
      },
      timestamp: new Date()
    });
    
    return NextResponse.json({ message: "Operator updated successfully" });
  } catch (err) {
    console.error("Update operator error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete an operator
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("staff");

    let operatorId;
    try {
      operatorId = new ObjectId(params.id);
    } catch (error) {
      return NextResponse.json({ error: "Invalid operator ID format" }, { status: 400 });
    }

    // Check if operator exists
    const existingOperator = await collection.findOne({ _id: operatorId, role: "operator" });
    if (!existingOperator) {
      return NextResponse.json({ error: "Operator not found" }, { status: 404 });
    }
    
    // Delete the operator
    const result = await collection.deleteOne({ _id: operatorId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Failed to delete operator" }, { status: 500 });
    }
    
    // Log the action for audit
    await db.collection("auditLogs").insertOne({
      action: "delete_operator",
      performedBy: "admin", // This should be the actual admin ID
      targetId: operatorId,
      details: {
        operatorId: existingOperator.operatorId,
        name: existingOperator.name,
        email: existingOperator.email
      },
      timestamp: new Date()
    });
    
    return NextResponse.json({ message: "Operator deleted successfully" });
  } catch (err) {
    console.error("Delete operator error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}