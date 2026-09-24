import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import UserModel from "@/model/user/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "@/jwt/createToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { businessName, handlerName, mobileNumber, password, language } =
      body;

    if (!businessName || !handlerName || !mobileNumber || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ businessName });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Business name already exists" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      businessName,
      handlerName,
      mobileNumber,
      password: hashedPassword,
      language,
    });

    // Create tokens
    const tokenPayload = {
      businessName,
      mobileNumber,
      id: newUser._id.toString(),
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);

    newUser.refreshToken = refreshToken;

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
          systemUserId: newUser._id,
          businessName: newUser.businessName,
          handlerName: newUser.handlerName,
          mobileNumber: newUser.mobileNumber,
          accessToken,
          refreshToken: newUser.refreshToken,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed", error: error.message },
      { status: 500 },
    );
  }
}
