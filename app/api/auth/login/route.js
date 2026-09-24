import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import UserModel from "@/model/user/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "@/jwt/createToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { businessName, mobileNumber, password } = body;

    if ((!businessName && !mobileNumber) || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide password and either businessName or mobileNumber",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({
      $or: [
        { businessName: businessName },
        { mobileNumber: mobileNumber },
      ].filter((condition) => Object.values(condition)[0] !== undefined),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const tokenPayload = {
      businessName: user.businessName,
      id: user._id.toString(),
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);

    // Update refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        userId: user._id,
        businessName: user.businessName,
        handlerName: user.handlerName,
        mobileNumber: user.mobileNumber,
        accessToken,
        refreshToken: user.refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed", error: error.message },
      { status: 500 },
    );
  }
}
