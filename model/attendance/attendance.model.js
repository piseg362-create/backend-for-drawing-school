import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: String, // Stored as standard "YYYY-MM-DD" to avoid timezone-offset bugs
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "excused"],
      default: "present",
      required: true,
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The instructor's user record
      required: true,
    },
    whatsappNotificationSent: {
      type: Boolean,
      default: false,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// Compound unique index: A student can only have ONE attendance record per date
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

// Fast daily queries for desktop sync and notifications
attendanceSchema.index({ client: 1, date: 1, status: 1 });

const AttendanceModel =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;