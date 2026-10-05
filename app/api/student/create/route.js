import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import StudentModel from "@/model/student/student.model";
import UserModel from "@/model/user/user.model";
import { generateSixDigitToken } from "@/utils/generateToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const {
      name,
      number,
      systemId,
      instructorCode,
      batch
    } = body;

    // Validate required fields based on the student schema and user request
    if (!name || !instructorCode || !batch) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, instructorCode, or batch" },
        { status: 400 }
      );
    }

    // Verify if the instructor (client/user) exists
    const client = await UserModel.findById(instructorCode);
    if (!client) {
      return NextResponse.json(
        { success: false, message: "Instructor not found" },
        { status: 404 }
      );
    }

    // Check for duplicate roll number within the same business and batch
    if (number) {
      const existingStudent = await StudentModel.findOne({
        client: instructorCode,
        batch,
        rollNumber: number
      });
      if (existingStudent) {
        return NextResponse.json(
          { success: false, message: "Student with this roll number already exists in this batch" },
          { status: 400 }
        );
      }
    }

    // Generate unique accessToken
    let accessToken = generateSixDigitToken();
    let isUnique = false;
    while (!isUnique) {
      const existingToken = await StudentModel.findOne({ accessToken });
      if (existingToken) {
        accessToken = generateSixDigitToken();
      } else {
        isUnique = true;
      }
    }

    // Create the new student document
    const newStudent = new StudentModel({
      client: instructorCode,
      name,
      rollNumber: number,
      batch,
      systemId,
      accessToken
    });

    await newStudent.save();

    return NextResponse.json(
      {
        success: true,
        message: "Student created successfully",
        data: newStudent
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create student", error: error.message },
      { status: 500 }
    );
  }
}
