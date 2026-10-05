import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import InstructorModel from "@/model/instructor/instructor.model";
import UserModel from "@/model/user/user.model";
import { generateSixDigitToken } from "@/utils/generateToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const {
      name,
      systemId,
      clientId // This is the ObjectId of the User (business)
    } = body;

    // Validate required fields
    if (!name || !clientId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name or clientId" },
        { status: 400 }
      );
    }

    // Verify if the client (business/user) exists
    const client = await UserModel.findById(clientId);
    if (!client) {
      return NextResponse.json(
        { success: false, message: "Client (business) not found" },
        { status: 404 }
      );
    }

    // Optional: Check if an instructor with the same systemId already exists for this client
    if (systemId) {
      const existingInstructor = await InstructorModel.findOne({
        client: clientId,
        systemId
      });
      if (existingInstructor) {
        return NextResponse.json(
          { success: false, message: "Instructor with this systemId already exists for this client" },
          { status: 400 }
        );
      }
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
      client: clientId,
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
