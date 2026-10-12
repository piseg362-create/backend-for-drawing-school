import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import InstructorModel from "@/model/instructor/instructor.model";
import { createAccessToken } from "@/jwt/createToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Access token is required" },
        { status: 400 }
      );
    }

    const instructor = await InstructorModel.findOne({ accessToken });

    if (!instructor) {
      return NextResponse.json(
        { success: false, message: "Invalid access token" },
        { status: 401 }
      );
    }

    if (!instructor.isActive) {
      return NextResponse.json(
        { success: false, message: "Instructor is inactive" },
        { status: 403 }
      );
    }

    const tokenPayload = {
      id: instructor._id.toString(),
      name: instructor.name,
      role: "instructor",
    };

    const jwtToken = await createAccessToken(tokenPayload);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        instructorId: instructor._id,
        name: instructor.name,
        token: jwtToken,
      },
    });
  } catch (error) {
    console.error("Instructor login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}
