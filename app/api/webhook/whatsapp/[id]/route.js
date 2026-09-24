import { NextResponse } from "next/server";
import { connectDB } from "../../../../../db/connetion";
import MessageStatusModel from "../../../../../model/message/messageStatus.model";

export async function GET(request, { params }) {
  try {
    const { id } = await params; // Note: Next.js 15+ params is a Promise, better to await it just in case or just destructure if Next 14, in Next 15+ it's a promise but it's safe to await.
    

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    // 1. Meta / WhatsApp Business API Webhook Verification
    if (mode && token) {
      // In a real app, verify the token against your environment variable
      // const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
      if (mode === "subscribe" /* && token === verifyToken */) {
        return new NextResponse(challenge, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    // 2. Fetch statuses for frontend by id (wbId)
    await connectDB();
    const statuses = await MessageStatusModel.find({ wbId: id }).sort({ createdAt: -1 }).limit(50);
    
    return NextResponse.json({
      success: true,
      data: statuses,
    });
  } catch (error) {
    console.error("GET webhook error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    // The webhook payload from WhatsApp Business (Meta)
    // or other WB provider might have different formats. 
    // We try to handle Meta's default structure:
    let messageId = null;
    let status = null;
    let recipientId = null;

    if (body.entry && body.entry.length > 0) {
      const changes = body.entry[0].changes;
      if (changes && changes.length > 0) {
        const value = changes[0].value;
        if (value.statuses && value.statuses.length > 0) {
          const statusObj = value.statuses[0];
          messageId = statusObj.id;
          status = statusObj.status;
          recipientId = statusObj.recipient_id;
        } else if (value.messages && value.messages.length > 0) {
          // It's an incoming message, not a status update
          const msg = value.messages[0];
          messageId = msg.id;
          status = "received";
          recipientId = msg.from;
        }
      }
    }

    // Save the status to our database
    const newStatus = await MessageStatusModel.create({
      wbId: id,
      messageId: messageId || `unknown-${Date.now()}`,
      status: status || "unknown",
      recipientId: recipientId || "unknown",
      rawPayload: body,
    });

    // In a real-time app, you might emit this via Socket.io or Pusher to the frontend here

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
      data: newStatus
    });
  } catch (error) {
    console.error("POST webhook error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
