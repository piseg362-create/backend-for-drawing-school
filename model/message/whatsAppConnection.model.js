import mongoose from "mongoose";

const whatsappConnectionSchema = new mongoose.Schema(
  {
    // School / user this WhatsApp account belongs to
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // WhatsApp Business Account ID
    wabaId: {
      type: String,
      required: true,
      index: true,
    },

    // WhatsApp Phone Number ID
    phoneNumberId: {
      type: String,
      required: true,
      index: true,
    },

    // WhatsApp access token received from Meta
    accessToken: {
      type: String,
      required: true,
    },

    // Optional phone number information
    displayPhoneNumber: {
      type: String,
      default: null,
    },

    // Optional WhatsApp business name
    verifiedName: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["connected", "disconnected", "expired"],
      default: "connected",
    },
  },
  {
    timestamps: true,
  }
);

const WhatsAppConnectionModel =
  mongoose.models.WhatsAppConnection ||
  mongoose.model("WhatsAppConnection", whatsappConnectionSchema);

export default WhatsAppConnectionModel;
