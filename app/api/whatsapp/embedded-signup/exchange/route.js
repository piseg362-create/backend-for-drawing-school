import { NextResponse } from "next/server";
import WhatsAppConnectionModel from "../../../../../model/message/messageStatus.model";
import { connectDB } from "../../../../../db/connetion";

export async function POST(request) {
  console.log("\n========================================");
  console.log("WHATSAPP EMBEDDED SIGNUP BACKEND");
  console.log("========================================");

  try {
    // -----------------------------------------
    // 1. Read request body
    // -----------------------------------------
    const body = await request.json();

    console.log("\n========== REQUEST RECEIVED ==========");

    console.log("Request body:", {
      code: body?.code ? "PRESENT" : "MISSING",
      userId: body?.userId || "MISSING",
      wabaId: body?.wabaId || "MISSING",
      phoneNumberId: body?.phoneNumberId || "MISSING",
      displayPhoneNumber:
        body?.displayPhoneNumber || null,
      verifiedName:
        body?.verifiedName || null,
    });

    const {
      code,
      userId,
      wabaId,
      phoneNumberId,
      displayPhoneNumber,
      verifiedName,
    } = body;

    // -----------------------------------------
    // 2. Validate request
    // -----------------------------------------
    console.log(
      "\n========== VALIDATING REQUEST ==========",
    );

    const requiredFields = {
      code,
      userId,
      wabaId,
      phoneNumberId,
    };

    const missingFields =
      Object.keys(requiredFields).filter(
        (key) => !requiredFields[key],
      );

    if (missingFields.length > 0) {
      console.error(
        "❌ Missing required fields:",
        missingFields,
      );

      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(
            ", ",
          )}`,
        },
        { status: 400 },
      );
    }

    console.log(
      "✅ All required fields received",
    );

    console.log("User ID:", userId);
    console.log("WABA ID:", wabaId);
    console.log(
      "Phone Number ID:",
      phoneNumberId,
    );
    console.log(
      "Code:",
      code ? "PRESENT" : "MISSING",
    );

    // -----------------------------------------
    // 3. Meta credentials
    // -----------------------------------------
    console.log(
      "\n========== META CONFIGURATION ==========",
    );

    const appId =
      process.env.META_APP_ID;

    const appSecret =
      process.env.META_APP_SECRET;

    console.log(
      "META_APP_ID:",
      appId ? "PRESENT" : "MISSING",
    );

    console.log(
      "META_APP_SECRET:",
      appSecret
        ? "PRESENT"
        : "MISSING",
    );

    if (!appId || !appSecret) {
      console.error(
        "❌ Meta credentials are missing in environment variables.",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Server configuration error.",
        },
        { status: 500 },
      );
    }

    console.log(
      "✅ Meta credentials available",
    );

    // -----------------------------------------
    // 4. Connect Database
    // -----------------------------------------
    console.log(
      "\n========== DATABASE CONNECTION ==========",
    );

    await connectDB();

    console.log(
      "✅ Database connected",
    );

    // -----------------------------------------
    // 5. Exchange authorization code with Meta
    // -----------------------------------------
    console.log(
      "\n========== META TOKEN EXCHANGE ==========",
    );

    const params =
      new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        code,
        grant_type:
          "authorization_code",
      });

    console.log(
      "Sending authorization code to Meta...",
    );

    console.log(
      "Meta endpoint:",
    );

    console.log(
      "https://graph.facebook.com/v25.0/oauth/access_token",
    );

    const metaResponse =
      await fetch(
        "https://graph.facebook.com/v25.0/oauth/access_token",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            params.toString(),

          cache: "no-store",
        },
      );

    console.log(
      "Meta HTTP status:",
      metaResponse.status,
    );

    const metaData =
      await metaResponse.json();

    // NEVER LOG ACTUAL ACCESS TOKEN
    console.log(
      "Meta response:",
      {
        success:
          metaResponse.ok,

        hasAccessToken:
          !!metaData?.access_token,

        tokenType:
          metaData?.token_type ||
          null,

        error:
          metaData?.error ||
          null,
      },
    );

    if (
      !metaResponse.ok ||
      !metaData?.access_token
    ) {
      console.error(
        "❌ Meta token exchange failed",
      );

      console.error(
        "Meta error:",
        metaData?.error ||
          metaData,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Meta token exchange failed.",

          error:
            metaData?.error ||
            metaData,
        },
        {
          status:
            metaResponse.status ||
            400,
        },
      );
    }

    const accessToken =
      metaData.access_token;

    console.log(
      "✅ Meta access token received",
    );

    // -----------------------------------------
    // 6. Save / Update WhatsApp connection
    // -----------------------------------------
    console.log(
      "\n========== SAVING WHATSAPP CONNECTION ==========",
    );

    console.log(
      "Searching connection for userId:",
      userId,
    );

    const savedConnection =
      await WhatsAppConnectionModel.findOneAndUpdate(
        {
          userId,
        },

        {
          userId,

          wabaId,

          phoneNumberId,

          accessToken,

          displayPhoneNumber,

          verifiedName,

          status:
            "connected",
        },

        {
          new: true,

          upsert: true,

          setDefaultsOnInsert:
            true,
        },
      );

    console.log(
      "✅ WhatsApp connection saved",
    );

    console.log(
      "Saved connection:",
      {
        id:
          savedConnection?._id?.toString(),

        userId:
          savedConnection?.userId,

        wabaId:
          savedConnection?.wabaId,

        phoneNumberId:
          savedConnection?.phoneNumberId,

        displayPhoneNumber:
          savedConnection?.displayPhoneNumber,

        verifiedName:
          savedConnection?.verifiedName,

        status:
          savedConnection?.status,

        hasAccessToken:
          !!savedConnection?.accessToken,
      },
    );

    // -----------------------------------------
    // 7. Success
    // -----------------------------------------
    console.log(
      "\n========================================",
    );

    console.log(
      "✅ WHATSAPP EMBEDDED SIGNUP SUCCESS",
    );

    console.log(
      "========================================\n",
    );

    return NextResponse.json({
      success: true,

      message:
        "WhatsApp connected successfully.",
    });

  } catch (error) {
    console.error(
      "\n========================================",
    );

    console.error(
      "❌ WHATSAPP EMBEDDED SIGNUP ERROR",
    );

    console.error(
      "========================================",
    );

    console.error(
      "Error name:",
      error?.name,
    );

    console.error(
      "Error message:",
      error?.message,
    );

    console.error(
      "Full error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Internal server error.",
      },
      { status: 500 },
    );
  }
}