import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Crucial for tenant isolation
    },
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

// Prevent duplicate instructor names within the same business if needed (optional)
// instructorSchema.index({ client: 1, name: 1 }, { unique: true });

const InstructorModel =
  mongoose.models.Instructor || mongoose.model("instructor", instructorSchema);
export default InstructorModel;
