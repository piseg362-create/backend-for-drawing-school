import { NextResponse } from "next/server";
import WhatsAppConnectionModel from "../../../../../model/message/messageStatus.model";
import { connectDB } from "../../../../../db/connetion";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      code,
      schoolId,
      wabaId,
      phoneNumberId,
      displayPhoneNumber,
      verifiedName,
    } = body;

    // -----------------------------------------
    // 1. Validate request
    // -----------------------------------------
    const requiredFields = { code, schoolId, wabaId, phoneNumberId };
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const appId = process.env.META_APP_ID;
    const appSecret = process.env.META_APP_SECRET;

    if (!appId || !appSecret) {
      console.error("Meta credentials are missing in environment variables.");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    // -----------------------------------------
    // 2. Connect Database (Fail-fast)
    // -----------------------------------------
    await connectDB();

    // -----------------------------------------
    // 3. Exchange authorization code with Meta
    // -----------------------------------------
    const params = new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      code,
      grant_type: "authorization_code",
    });

    const metaResponse = await fetch(
      "https://graph.facebook.com/v25.0/oauth/access_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        cache: "no-store",
      }
    );

    const metaData = await metaResponse.json();

    if (!metaResponse.ok || !metaData?.access_token) {
      console.error("Meta token exchange failed:", metaData);
      return NextResponse.json(
        {
          success: false,
          message: "Meta token exchange failed.",
          error: metaData?.error || metaData,
        },
        { status: metaResponse.status || 400 }
      );
    }

    const accessToken = metaData.access_token;

    // Optional but Recommended: Verify token belongs to the wabaId
    // const verifyResponse = await fetch(`https://graph.facebook.com/v25.0/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`);
    // const verifyData = await verifyResponse.json();
    // if (verifyData.data.error || verifyData.data.is_valid === false) { ... }

    // -----------------------------------------
    // 4. Save / update WhatsApp connection
    // -----------------------------------------
    await WhatsAppConnectionModel.findOneAndUpdate(
      { schoolId },
      {
        schoolId,
        wabaId,
        phoneNumberId,
        accessToken,
        displayPhoneNumber,
        verifiedName,
        status: "connected",
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "WhatsApp connected successfully.",
    });

  } catch (error) {
    console.error("WhatsApp Embedded Signup exchange error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}