import { NextResponse } from "next/server";
import { connectDB } from "../../../../../db/connetion";
// Double-check this path to ensure it exports the schema we built earlier
import WhatsAppConnectionModel from "../../../../../model/message/messageStatus.model"; 

export async function POST(req) {
  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json(
        { message: "UserID does not exist" },
        { status: 400 }
      );
    }

    await connectDB();
    
    // 1. Query by the 'client' field, not findById
    const send = await WhatsAppConnectionModel.findOne({ client: userId }).lean();

    if (!send) {
      // 2. Properly format the Next.js status response
      return NextResponse.json(
        { message: "User not connected to WhatsApp" },
        { status: 404 } 
      );
    }
    
    return NextResponse.json({
      send,
      message: "Data received successfully",
    }, { status: 200 });

  } catch (error) {
    // 3. Never leave a catch block empty in Next.js App Router
    console.error("WhatsApp status fetch error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}