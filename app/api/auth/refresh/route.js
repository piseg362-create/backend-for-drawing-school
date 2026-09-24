import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import UserModel from "@/model/user/user.model";
import { verifyRefreshToken } from "@/jwt/verifyToken";
import { createAccessToken } from "@/jwt/createToken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token is required" },
        { status: 400 }
      );
    }

    // Verify the refresh token mathematically
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    // Determine how to find the user
    let user;
    if (payload.id) {
      user = await UserModel.findById(payload.id);
    } else if (payload.businessName) {
      user = await UserModel.findOne({ businessName: payload.businessName });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Compare with the DB refresh token
    if (user.refreshToken !== refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token has been invalidated" },
        { status: 401 }
      );
    }

    // Generate a new access token
    const tokenPayload = {
      businessName: user.businessName,
      id: user._id.toString(),
    };
    const newAccessToken = await createAccessToken(tokenPayload);

    return NextResponse.json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to refresh token", error: error.message },
      { status: 500 }
    );
  }
}
