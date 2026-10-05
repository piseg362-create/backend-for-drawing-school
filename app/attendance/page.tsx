"use client";

import React, { useEffect, useState, useMemo } from "react";

// Helper to extract initials for the avatar
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function AttendancePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  
  // Track which accordions are open
  const [openBatches, setOpenBatches] = useState<Record<string, boolean>>({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/attendance");
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
        
        // Group logic to find the first batch to open by default
        const batches = Array.from(new Set(data.students.map((s: any) => s.batch))).sort();
        if (batches.length > 0) {
          // Normalize the first batch from DB and match to SCHEDULE_SLOTS format
          const dbBatch = (batches[0] as string).replace(/\s+/g, "");
          const matchedSlot = [
            "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", 
            "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", 
            "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", 
            "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00", 
            "20:00 - 21:00"
          ].find(s => s.replace(/\s+/g, "") === dbBatch) || batches[0] as string;

          setOpenBatches({ [matchedSlot]: true });
        }

        const attMap: Record<string, boolean> = {};
        data.students.forEach((s: any) => {
          attMap[s._id] = false; // Default to absent
        });

        data.attendance.forEach((record: any) => {
          if (record.status === "present") {
            attMap[record.student] = true;
          }
        });
        setAttendance(attMap);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const toggleBatchAccordion = (batch: string) => {
    setOpenBatches((prev) => ({
      ...prev,
      [batch]: !prev[batch],
    }));
  };

  // State to track which batch is currently submitting to show loading spinners locally
  const [submittingBatch, setSubmittingBatch] = useState<string | null>(null);

  const submitBatchAttendance = async (batchName: string, batchStudents: any[]) => {
    if (batchStudents.length === 0) return;
    
    setSubmittingBatch(batchName);
    try {
      const records = batchStudents.map((student) => ({
        studentId: student._id,
        status: attendance[student._id] ? "present" : "absent",
      }));

      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: today,
          records,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Attendance reported successfully for the ${batchName} batch.`);
      } else {
        alert("Failed to submit attendance: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance.");
    } finally {
      setSubmittingBatch(null);
    }
  };

  // Fixed schedule from 8 AM to 9 PM
  const SCHEDULE_SLOTS = useMemo(() => [
    "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", 
    "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", 
    "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", 
    "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00", 
    "20:00 - 21:00"
  ], []);

  // Group students by fixed schedule slots
  const groupedStudents = useMemo(() => {
    return SCHEDULE_SLOTS.map(slot => {
      // Normalize slot strings (remove spaces) to match database data robustly
      const normalizedSlot = slot.replace(/\s+/g, "");
      const batchStudents = students.filter(
        (s) => (s.batch || "").replace(/\s+/g, "") === normalizedSlot
      );
      return [slot, batchStudents] as [string, any[]];
    });
  }, [students, SCHEDULE_SLOTS]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-gray-500 font-medium flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-[#D25B43]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Banner similar to reference UI */}
        <div className="bg-[#D25B43] rounded-xl p-8 shadow-sm text-white flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-1">Student Attendance</h1>
            <p className="text-white/80 text-sm">
              Mark attendance for your scheduled classes today ({today}).
            </p>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Action Bar (Summary) */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-800 text-lg">
            Daily Roster
          </h2>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-md">
            Total Students: {students.length}
          </span>
        </div>

        {/* Batch Accordions */}
        {groupedStudents.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <h3 className="text-gray-900 font-medium">No students scheduled</h3>
            <p className="text-sm text-gray-500 mt-1">There are no students assigned to any batch today.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedStudents.map(([batch, batchStudents]) => {
              const isOpen = !!openBatches[batch];
              
              // Count present students in this batch for the summary badge
              const presentCount = batchStudents.filter(s => attendance[s._id]).length;

              return (
                <div key={batch} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all">
                  {/* Accordion Header */}
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50/50 hover:bg-gray-50 cursor-pointer select-none transition-colors border-b border-transparent"
                    onClick={() => toggleBatchAccordion(batch)}
                    style={isOpen ? { borderBottomColor: '#E5E7EB' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#f8e9e6] text-[#D25B43] p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{batch}</h3>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{batchStudents.length} students enrolled</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Mini summary for this batch */}
                      <div className="hidden sm:flex text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                        {presentCount} / {batchStudents.length} Present
                      </div>
                      {/* Chevron Icon */}
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="p-4 md:p-5 bg-white">
                      {batchStudents.length === 0 ? (
                        <div className="text-center py-6 text-gray-500 text-sm">
                          No students enrolled in this time slot.
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {batchStudents.map((student) => {
                              const isPresent = attendance[student._id];
                              return (
                                <div
                                  key={student._id}
                                  onClick={() => toggleAttendance(student._id)}
                                  className={`flex items-center p-4 bg-white border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                                    isPresent
                                      ? "border-green-500 ring-1 ring-green-500"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  {/* Avatar */}
                                  <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                    isPresent ? "bg-green-100 text-green-700" : "bg-[#f8e9e6] text-[#D25B43]"
                                  }`}>
                                    {getInitials(student.name)}
                                  </div>

                                  {/* Student Info */}
                                  <div className="ml-4 flex-1 truncate">
                                    <h3 className="text-sm font-bold text-gray-900 truncate">{student.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                                      System: {student.systemId || "N/A"}
                                    </p>
                                  </div>

                                  {/* Status Indicator */}
                                  <div className="ml-3 flex-shrink-0">
                                    {isPresent ? (
                                      <div className="bg-green-500 text-white rounded-full p-1 shadow-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                      </div>
                                    ) : (
                                      <div className="bg-gray-100 text-gray-400 rounded-full p-1 border border-gray-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Submit Section for this specific batch */}
                          <div className="flex justify-end pt-4 mt-6 border-t border-gray-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                submitBatchAttendance(batch, batchStudents);
                              }}
                              disabled={submittingBatch === batch}
                              className="bg-[#D25B43] hover:bg-[#b54b35] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {submittingBatch === batch && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              )}
                              {submittingBatch === batch ? "Saving..." : "Save Batch"}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
