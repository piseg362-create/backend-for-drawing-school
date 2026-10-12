import { NextResponse } from "next/server";
import { connectDB } from "@/db/connetion";
import StudentModel from "@/model/student/student.model";
import AttendanceModel from "@/model/attendance/attendance.model";
import InstructorModel from "@/model/instructor/instructor.model";
import mongoose from "mongoose";
import { verifyAccessToken } from "@/jwt/verifyToken";

async function getAuthUser(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  return await verifyAccessToken(token);
}

// GET: Fetch mapped students and their attendance for today
export async function GET(req) {
  try {
    await connectDB();
    
    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    

    let students = [];
    if (user.role === "instructor") {
        const instructor = await InstructorModel.findById(user.id);
        if (!instructor) {
             return NextResponse.json({ success: false, message: "Instructor not found" }, { status: 404 });
        }
        students = await StudentModel.find({ instructorAccessToken: instructor.accessToken }).lean();
    } else {
        students = await StudentModel.find({}).lean();
    }
    
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
    
    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { date, records } = body; 
    
    if (!date || !records || !Array.isArray(records)) {
      return NextResponse.json({ success: false, message: "Missing required fields or invalid format" }, { status: 400 });
    }

    const markedBy = new mongoose.Types.ObjectId(user.id); 
    
    const operations = records.map(async (record) => {
      const { studentId, status } = record;
      
      const student = await StudentModel.findById(studentId);
      if (!student) return null;
      
      if (user.role === "instructor") {
         const instructor = await InstructorModel.findById(user.id);
         if (student.instructorAccessToken !== instructor.accessToken) {
             return null; // Not allowed
         }
      }

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
