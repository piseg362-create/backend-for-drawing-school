import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import InstructorModel from "@/model/instructor/instructor.model";
import { generateSixDigitToken } from "@/utils/generateToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const {
      name,
      systemId,
    } = body;

    // Validate required fields
    if (!name ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name" },
        { status: 400 }
      );
    }

    // Generate unique accessToken
    let accessToken = generateSixDigitToken();
    let isUnique = false;
    while (!isUnique) {
      const existingToken = await InstructorModel.findOne({ accessToken });
      if (existingToken) {
        accessToken = generateSixDigitToken();
      } else {
        isUnique = true;
      }
    }

    // Create the new instructor document
    const newInstructor = new InstructorModel({
      name,
      systemId,
      accessToken
    });

    await newInstructor.save();

    return NextResponse.json(
      {
        success: true,
        message: "Instructor created successfully",
        data: newInstructor
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating instructor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create instructor", error: error.message },
      { status: 500 }
    );
  }
}
