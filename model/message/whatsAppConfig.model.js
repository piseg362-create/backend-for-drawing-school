import mongoose from "mongoose";

const whatsAppConfigSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Enforces 1-to-1 mapping for now
      index: true,
    },

    // Meta WhatsApp Cloud API Identifiers
    wabaId: {
      type: String,
      required: [true, "WhatsApp Business Account ID is required"],
      trim: true,
    },

    phoneNumberId: {
      type: String,
      required: [true, "Phone Number ID is required"],
      trim: true,
    },

    displayPhoneNumber: {
      type: String,
      trim: true,
    },

    // Credentials & Tokens
    accessToken: {
      type: String,
      required: [true, "Permanent System User Access Token is required"],
      select: false, // Never return token in queries unless explicitly requested
    },

    tokenExpiresAt: {
      type: Date,
      default: null,
    },

    // Health & Verification State
    status: {
      type: String,
      enum: ["connected", "disconnected", "expired", "rate_limited"],
      default: "connected",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const WhatsAppConfigModel =
  mongoose.models.WhatsAppConfig ||
  mongoose.model("WhatsAppConfig", whatsAppConfigSchema);

export default WhatsAppConfigModel;