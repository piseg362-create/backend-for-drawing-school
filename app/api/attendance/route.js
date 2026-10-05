import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import StudentModel from "@/model/student/student.model";
import AttendanceModel from "@/model/attendance/attendance.model";
import mongoose from "mongoose";

// GET: Fetch all students and their attendance for today
export async function GET(req) {
  try {
    await connectDB();
    
    // For testing/mock purposes, we just fetch all students
    let students = await StudentModel.find({}).lean();
    
    // If less than 10 students exist, re-seed with a comprehensive demo set for all batches
    if (students.length < 10) {
      await StudentModel.deleteMany({}); // Clear old test data
      const mockClientId = new mongoose.Types.ObjectId();
      const mockData = [
        { client: mockClientId, name: "Liam Johnson", rollNumber: "101", batch: "08:00 - 09:00", systemId: "SYS-001" },
        { client: mockClientId, name: "Emma Smith", rollNumber: "102", batch: "08:00 - 09:00", systemId: "SYS-002" },

        { client: mockClientId, name: "Noah Williams", rollNumber: "103", batch: "09:00 - 10:00", systemId: "SYS-003" },
        { client: mockClientId, name: "Olivia Brown", rollNumber: "104", batch: "09:00 - 10:00", systemId: "SYS-004" },
        { client: mockClientId, name: "James Jones", rollNumber: "105", batch: "09:00 - 10:00", systemId: "SYS-005" },

        { client: mockClientId, name: "William Garcia", rollNumber: "106", batch: "10:00 - 11:00", systemId: "SYS-006" },
        { client: mockClientId, name: "Isabella Martinez", rollNumber: "107", batch: "10:00 - 11:00", systemId: "SYS-007" },

        { client: mockClientId, name: "Benjamin Rodriguez", rollNumber: "108", batch: "11:00 - 12:00", systemId: "SYS-008" },
        { client: mockClientId, name: "Sophia Hernandez", rollNumber: "109", batch: "11:00 - 12:00", systemId: "SYS-009" },

        { client: mockClientId, name: "Lucas Lopez", rollNumber: "110", batch: "12:00 - 13:00", systemId: "SYS-010" },

        { client: mockClientId, name: "Henry Gonzalez", rollNumber: "111", batch: "13:00 - 14:00", systemId: "SYS-011" },
        { client: mockClientId, name: "Mia Wilson", rollNumber: "112", batch: "13:00 - 14:00", systemId: "SYS-012" },

        { client: mockClientId, name: "Alexander Anderson", rollNumber: "113", batch: "14:00 - 15:00", systemId: "SYS-013" },
        { client: mockClientId, name: "Charlotte Thomas", rollNumber: "114", batch: "14:00 - 15:00", systemId: "SYS-014" },

        { client: mockClientId, name: "Jack Taylor", rollNumber: "115", batch: "15:00 - 16:00", systemId: "SYS-015" },
        
        { client: mockClientId, name: "Daniel Moore", rollNumber: "116", batch: "16:00 - 17:00", systemId: "SYS-016" },
        { client: mockClientId, name: "Amelia Jackson", rollNumber: "117", batch: "16:00 - 17:00", systemId: "SYS-017" },
        { client: mockClientId, name: "Matthew Martin", rollNumber: "118", batch: "16:00 - 17:00", systemId: "SYS-018" },

        { client: mockClientId, name: "Joseph Lee", rollNumber: "119", batch: "17:00 - 18:00", systemId: "SYS-019" },
        { client: mockClientId, name: "Harper Perez", rollNumber: "120", batch: "17:00 - 18:00", systemId: "SYS-020" },

        { client: mockClientId, name: "David Thompson", rollNumber: "121", batch: "18:00 - 19:00", systemId: "SYS-021" },
        { client: mockClientId, name: "Evelyn White", rollNumber: "122", batch: "18:00 - 19:00", systemId: "SYS-022" },

        { client: mockClientId, name: "Carter Harris", rollNumber: "123", batch: "19:00 - 20:00", systemId: "SYS-023" },
        { client: mockClientId, name: "Abigail Sanchez", rollNumber: "124", batch: "19:00 - 20:00", systemId: "SYS-024" },

        { client: mockClientId, name: "Wyatt Clark", rollNumber: "125", batch: "20:00 - 21:00", systemId: "SYS-025" },
        { client: mockClientId, name: "Emily Ramirez", rollNumber: "126", batch: "20:00 - 21:00", systemId: "SYS-026" },
      ];
      await StudentModel.insertMany(mockData);
      students = await StudentModel.find({}).lean();
    }
    
    // Get today's attendance
    const today = new Date().toISOString().split("T")[0];
    const attendanceRecords = await AttendanceModel.find({ date: today }).lean();
    
    return NextResponse.json({
      success: true,
      students,
      attendance: attendanceRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Mark bulk attendance
export async function POST(req) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { date, records } = body; // records: [{ studentId, status }, ...]
    
    if (!date || !records || !Array.isArray(records)) {
      return NextResponse.json({ success: false, message: "Missing required fields or invalid format" }, { status: 400 });
    }

    const markedBy = new mongoose.Types.ObjectId(); // mock instructor ID
    
    // Process all updates in parallel
    const operations = records.map(async (record) => {
      const { studentId, status } = record;
      
      const student = await StudentModel.findById(studentId);
      if (!student) return null;
      
      const clientId = student.client || new mongoose.Types.ObjectId();
      
      return AttendanceModel.findOneAndUpdate(
        { student: studentId, date },
        { 
          status, 
          client: clientId, 
          markedBy,
          date
        },
        { new: true, upsert: true }
      );
    });

    await Promise.all(operations);

    return NextResponse.json({
      success: true,
      message: "Bulk attendance saved successfully",
    });
  } catch (error) {
    console.error("Error saving attendance:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
