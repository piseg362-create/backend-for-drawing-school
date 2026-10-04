import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import UserModel from "@/model/user/user.model";
import { createAccessToken, createRefreshToken } from "@/jwt/createToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, systemUserId, razorpayPaymentData } = body;
    
    const idToUpdate = userId || systemUserId;

    if (!idToUpdate || !razorpayPaymentData) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: userId or razorpayPaymentData" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      idToUpdate,
      {
        isPaymentVerified: true,
        paymentStatus: "paid",
        razorpayPaymentData: razorpayPaymentData,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const tokenPayload = {
      businessName: updatedUser.businessName,
      id: updatedUser._id.toString(),
      isPaymentVerified: updatedUser.isPaymentVerified,
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);
    
    // Update refresh token in DB
    updatedUser.refreshToken = refreshToken;
    await updatedUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified and data saved successfully",
        data: {
          userId: updatedUser._id,
          businessName: updatedUser.businessName,
          isPaymentVerified: updatedUser.isPaymentVerified,
          accessToken,
          refreshToken: updatedUser.refreshToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed", error: error.message },
      { status: 500 }
    );
  }
}
