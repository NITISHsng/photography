// app/api/login/route.ts
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

type UserType = "admin" | "operator" | "member";

interface LoginRequest {
  userType: UserType;
  userId?: string;
  operatorId?: string;
  memberId?: string;
  password: string;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  try {
    const { userType, userId, operatorId, memberId, password }: LoginRequest =
      await req.json();

    if (!["admin", "operator", "member"].includes(userType)) {
      return errorResponse("Invalid user type", 400);
    }

    // ✅ Build queries with proper typing (no `any`)
    type Queries = {
      admin: { userId: string; role: "admin"; password: string };
      operator: { operatorId: string; role: "operator"; password: string };
      member: { memberId: string; password: string };
    };

    const queries: Queries = {
      admin: { userId: userId ?? "", role: "admin", password },
      operator: { operatorId: operatorId ?? "", role: "operator", password },
      member: { memberId: memberId ?? "", password },
    };

    const collection =
      userType === "member"
        ? await getCollection("joinUsApplicants")
        : await getCollection("staff");

    const user = await collection.findOne(queries[userType]);

    if (!user) return errorResponse("User not found", 401);

    // ✅ Build safe response
    const response = NextResponse.json(
      {
        id: user._id.toString(),
        user, // includes the full document
      },
      { status: 200 }
    );

    // ✅ Secure cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict" as const,
    };

    response.cookies.set("asan_user_id", user._id.toString(), cookieOptions);

    return response;
  } catch (err: unknown) {
    console.error("Login error:", err);
    const errorMessage =
      process.env.NODE_ENV === "development" && err instanceof Error
        ? `Internal server error: ${err.message}`
        : "Internal server error";
    return errorResponse(errorMessage, 500);
  }
}