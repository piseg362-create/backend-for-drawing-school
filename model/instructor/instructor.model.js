import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    systemId: {
      type: String,
      trim: true,
      sparse: true,
    },
    accessToken: {
      type: String,
      unique: true,
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate instructor names if needed (optional)

const InstructorModel =
  mongoose.models.Instructor || mongoose.model("instructor", instructorSchema);
export default InstructorModel;
