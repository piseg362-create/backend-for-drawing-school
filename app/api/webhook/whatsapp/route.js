import { NextResponse } from "next/server";
import { connectDB } from "../../../../db/connetion";
import MessageStatusModel from "../../../../model/message/messageStatus.model";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    console.log("Webhook verification request:");
    console.log("mode:", mode);
    console.log("token:", token);
    console.log("challenge:", challenge);

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === "subscribe" && token === verifyToken) {
      console.log("Webhook verified successfully");

      return new NextResponse(challenge, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    console.log("Webhook verification failed");

    return new NextResponse("Forbidden", {
      status: 403,
    });
  } catch (error) {
    console.error("Webhook GET error:", error);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
export async function POST(request) {
  try {
    const body = await request.json();

    console.log(
      "========== WHATSAPP WEBHOOK =========="
    );

    console.log(JSON.stringify(body, null, 2));

    await connectDB();

    /*
     * Meta normally sends:
     *
     * body.entry[]
     *   ↓
     * changes[]
     *   ↓
     * value
     *
     * value.statuses[]  -> sent/delivered/read/failed
     * value.messages[]  -> incoming WhatsApp message
     */

    if (!body.entry || body.entry.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Webhook received",
      });
    }

    for (const entry of body.entry) {
      const changes = entry.changes || [];

      for (const change of changes) {
        const value = change.value;

        // --------------------------------
        // MESSAGE STATUS
        // --------------------------------

        if (value?.statuses) {
          for (const statusObj of value.statuses) {
            await MessageStatusModel.create({
              messageId: statusObj.id,
              status: statusObj.status,
              recipientId: statusObj.recipient_id,
              rawPayload: body,
            });

            console.log(
              "WhatsApp status:",
              statusObj.id,
              statusObj.status
            );
          }
        }

        // --------------------------------
        // INCOMING MESSAGE
        // --------------------------------

        if (value?.messages) {
          for (const message of value.messages) {
            console.log(
              "Incoming WhatsApp message:",
              message
            );

            /*
             * Later we can save incoming messages
             * into your message/inbox collection.
             */
          }
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "EVENT_RECEIVED",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook POST error:", error);

    /*
     * Meta expects a successful response quickly.
     * During development, return 500 so you can see errors.
     */

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}