import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 45,
  },

  handlerName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor",
  },

  paymentStatus: {
    type: String,
    default: "not paid",
  },
  language: {
    type: String,
  },

  refreshToken: {
    type: String,
    required: true,
  },

  termsAccepted: {
    type: Boolean,
    default: true,
  },

  // Add this field inside userSchema:
  whatsAppConfig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WhatsAppConfig",
    default: null,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
