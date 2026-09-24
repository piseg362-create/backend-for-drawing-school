import mongoose from "mongoose";

const messageStatusSchema = new mongoose.Schema(
  {
    wbId: {
      type: String,
      required: true,
      index: true,
    },
    messageId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["sent", "delivered", "read", "failed", "deleted", "replied"],
    },
    recipientId: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
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
