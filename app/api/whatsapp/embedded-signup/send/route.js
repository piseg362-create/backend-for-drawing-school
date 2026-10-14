import { NextResponse } from "next/server";
import mongoose from "mongoose";
import WhatsAppConnectionModel from "../../../../../model/message/whatsAppConnection.model";
import { connectDB } from "../../../../../db/connetion";

async function fetchConnection(id) {
  if (!id) return null;
  await connectDB();

  const queryConditions = [
    { schoolId: id },
    { _id: id },
  ];

  if (mongoose.Types.ObjectId.isValid(id)) {
    const objId = new mongoose.Types.ObjectId(id);
    queryConditions.push({ schoolId: objId }, { _id: objId });
  }

  return await WhatsAppConnectionModel.findOne({
    $or: queryConditions,
  }).lean();
}

// GET: /api/whatsapp/embedded-signup/send?userId=... or ?schoolId=...
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId") || searchParams.get("schoolId") || searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "userId or schoolId query parameter is required" },
        { status: 400 },
      );
    }

    const send = await fetchConnection(id);

    if (!send) {
      return NextResponse.json(
        { message: "User not connected to WhatsApp" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        send,
        message: "Data received successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("WhatsApp status fetch error (GET):", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

// POST: /api/whatsapp/embedded-signup/send with { userId: "..." } or { schoolId: "..." }
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const id = body.userId || body.schoolId || body.client || body.id;

    if (!id) {
      return NextResponse.json(
        { message: "userId or schoolId is required in request body" },
        { status: 400 },
      );
    }

    const send = await fetchConnection(id);

    if (!send) {
      return NextResponse.json(
        { message: "User not connected to WhatsApp" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        send,
        message: "Data received successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("WhatsApp status fetch error (POST):", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}