import mongoose from "mongoose";

const messageStatusSchema = new mongoose.Schema(
  {
    wbId: {
      type: String, // String to allow both ObjectId string and "unknown" fallback
      index: true,
    },
    messageId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["accepted", "sent", "delivered", "read", "failed"],
      required: true,
    },
    recipientId: {
      type: String,
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const MessageStatusModel =
  mongoose.models.MessageStatus ||
  mongoose.model("MessageStatus", messageStatusSchema);

export default MessageStatusModel;
