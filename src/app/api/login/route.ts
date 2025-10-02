// app/api/login/route.ts
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

type UserType = "admin" | "operator" | "member";

interface LoginRequest {
  userType: UserType;
  staffId?: string;
  memberId?: string;
  password: string;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  try {
    const { userType, staffId, memberId, password }: LoginRequest =
      await req.json();

    if (!["admin", "operator", "member"].includes(userType)) {
      return errorResponse("Invalid user type", 400);
    }

    // ✅ Build queries with proper typing (no `any`)
type Queries = {
  admin: { staffId: string; password: string };
  operator: { staffId: string; password: string };
  member: { memberId: string; password: string };
};

const queries: Queries = {
  member: { memberId: memberId ?? "", password },
  admin: { staffId: staffId ?? "", password },
  operator: { staffId: staffId ?? "", password },
};

    const collection =
      userType === "member"
        ? await getCollection("joinUsApplicants")
        : await getCollection("staff");

    // Debug log to help troubleshoot
    // console.log("Login attempt:", { userType, query: queries[userType] });
    
    const user = await collection.findOne(queries[userType]);

    if (!user) return errorResponse("User not found", 401);


    const loginHistoryCollection = await getCollection("loginHistory");
    await loginHistoryCollection.insertOne({
      staffId: user.staffId || user.memberId,
      userType,
      name: user.name || null,
      loginAt: new Date(),
    });

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