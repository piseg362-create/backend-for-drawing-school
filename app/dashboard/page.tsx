"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Palette,
  Brush,
  BookImage,
  CalendarDays,
  Calendar,
  MessageSquare,
  Settings,
  Sun,
  ChevronDown,
  LogOut,
  Brush as BrushIcon,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true, href: "/dashboard" },
  { name: "Attendance", icon: CalendarDays, href: "/attendance" },
  { name: "Students", icon: Users },
  { name: "Instructors", icon: Brush },
  { name: "Studio Spaces", icon: Palette },
  { name: "Courses", icon: BookImage },
  { name: "Schedule", icon: CalendarDays },
  { name: "Calendar", icon: Calendar },
  { name: "Messages", icon: MessageSquare },
  { name: "Settings", icon: Settings },
];

const weeklyData = [
  { day: "Mon", students: 45 },
  { day: "Tue", students: 52 },
  { day: "Wed", students: 38 },
  { day: "Thu", students: 65 },
  { day: "Fri", students: 85 },
  { day: "Sat", students: 110 },
  { day: "Sun", students: 95 },
];

const scheduleData = [
  {
    name: "Watercolor Basics",
    time: "10:00 AM - 12:00 PM",
    instructor: "Elena R.",
    color: "bg-indigo-100 text-indigo-600",
    initials: "WB",
  },
  {
    name: "Figure Drawing",
    time: "01:00 PM - 03:00 PM",
    instructor: "Marcus T.",
    color: "bg-fuchsia-100 text-fuchsia-600",
    initials: "FD",
  },
  {
    name: "Acrylic Pouring",
    time: "03:30 PM - 05:30 PM",
    instructor: "Sarah K.",
    color: "bg-rose-100 text-rose-600",
    initials: "AP",
  },
  {
    name: "Digital Illustration",
    time: "06:00 PM - 08:00 PM",
    instructor: "David L.",
    color: "bg-violet-100 text-violet-600",
    initials: "DI",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 w-full h-screen bg-slate-50/50 font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div>
          {/* Logo */}
          <div className="p-6 flex flex-col items-center justify-center border-b border-slate-100">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-2xl mb-3 shadow-lg shadow-indigo-500/20 text-white">
              <Palette className="w-7 h-7" />
            </div>
            <h1 className="text-center font-bold text-lg leading-tight text-slate-900 tracking-tight">
              Creative Core<br />
              <span className="text-sm font-medium text-slate-500">Art Academy</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href || "#"}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  item.active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 ${
                    item.active ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile Summary */}
        <div className="p-4 m-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Admin</p>
              <p className="text-slate-500 text-xs">Studio Manager</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
            <p className="text-sm text-slate-500 font-medium">Welcome back, here's what's happening at the studio.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
              <span>Current Term: Fall 2026</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-500">
              <Sun className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 flex items-center justify-between shadow-xl shadow-indigo-600/10 relative overflow-hidden">
              {/* Decorative background shapes */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 right-32 -mb-16 w-48 h-48 rounded-full bg-fuchsia-500/20 blur-2xl"></div>

              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-bold mb-2 tracking-tight">Ready to inspire today?</h3>
                <p className="text-indigo-100 text-lg font-medium">4 classes are scheduled and 120 students are expected today.</p>
              </div>
              <button className="relative z-10 bg-white text-indigo-600 hover:bg-indigo-50 transition-colors px-6 py-3 rounded-xl font-bold shadow-sm flex items-center">
                <BrushIcon className="w-4 h-4 mr-2" />
                Manage Today's Studio
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Students", value: "842", subtitle: "+12 this week", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
                { title: "Active Courses", value: "24", subtitle: "4 starting soon", icon: BookImage, color: "text-fuchsia-600", bg: "bg-fuchsia-50" },
                { title: "Available Easels", value: "18 / 50", subtitle: "32 in use right now", icon: Palette, color: "text-emerald-600", bg: "bg-emerald-50" },
                { title: "Monthly Revenue", value: "$42,500", subtitle: "$8,200 pending", icon: LayoutDashboard, color: "text-violet-600", bg: "bg-violet-50" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-40 group">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-500 text-sm font-semibold">{stat.title}</p>
                    <div className={`p-2.5 ${stat.bg} ${stat.color} rounded-xl group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">{stat.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area (Chart & Schedule) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Chart */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Student Attendance Activity</h3>
                    <p className="text-sm text-slate-500 font-medium">Daily visits over the last 7 days</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-slate-100 transition-colors">
                    <span>This Week</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="h-72 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={weeklyData}
                      margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Today's Classes</h3>
                  <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">View All</a>
                </div>
                
                <div className="flex-1 flex flex-col space-y-4 mb-6">
                  {scheduleData.map((item, index) => (
                    <div key={index} className="flex items-start p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 transition-colors group cursor-pointer border border-transparent hover:border-indigo-100">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm mr-4 shrink-0 ${item.color}`}>
                        {item.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center">
                          <Brush className="w-3 h-3 mr-1" />
                          {item.instructor}
                        </p>
                      </div>
                      <div className="text-right ml-2">
                        <span className="text-[11px] font-bold text-slate-400 block whitespace-nowrap bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">{item.time.split(' - ')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors flex items-center justify-center">
                  + Schedule New Class
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
