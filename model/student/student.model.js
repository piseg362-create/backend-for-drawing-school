import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
    rollNumber: {
      type: String,
      trim: true,
    },
    batch: {
      type: String, // e.g., "Morning Batch", "Class 10-A"
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate roll numbers within the same business/batch
studentSchema.index({ client: 1, batch: 1, rollNumber: 1 }, { unique: true });

const StudentModel =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
export default StudentModel;