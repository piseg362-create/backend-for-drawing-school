"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Play,
  RefreshCw,
  Gauge,
  Zap,
  Car,
  FileCheck2,
  MessageSquare,
  Users,
  CalendarDays,
  Database,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------
   WheelGroup: Spoked wheel, spins continuously.
------------------------------------------------------------------- */
export function WheelGroup({ spinDuration = "0.4s" }: { spinDuration?: string }) {
  return (
    <g
      style={{
        transformOrigin: "0px 0px",
        animation: `cl-spin ${spinDuration} linear infinite`,
      }}
    >
      <circle r="24" fill="#151515" />
      <circle r="24" fill="none" stroke="#333" strokeWidth="2" />
      <circle r="12" fill="#c9c9c9" />
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#777" strokeWidth="2" />
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#777" strokeWidth="2" />
      <circle r="3" fill="#555" />
    </g>
  );
}

/* ------------------------------------------------------------------
   CarBody — Driving school vehicle silhouette with optional
   aerodynamic "L" (Learner) rooftop sign for School Desk.
   viewBox is 300 x 160; wheels sit at (80,120) and (220,120);
   front faces right, rear faces left.
------------------------------------------------------------------- */
export function CarBody({
  className = "",
  style,
  spinDuration = "0.4s",
  showRoofSign = true,
}: {
  className?: string;
  style?: React.CSSProperties;
  spinDuration?: string;
  showRoofSign?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 300 160"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ground shadow */}
      <ellipse cx="150" cy="138" rx="130" ry="8" fill="rgba(0,0,0,0.28)" />

      {/* wheel-well black backdrops */}
      <circle cx="80" cy="120" r="26" fill="#111" />
      <circle cx="220" cy="120" r="26" fill="#111" />

      {/* Driving School "L" Roof Sign (School Desk dual-control vehicle) */}
      {showRoofSign && (
        <g id="driving-school-roof-sign">
          {/* Sign base mount */}
          <rect
            x="136"
            y="39"
            width="34"
            height="8"
            rx="2"
            fill="#eee7dc"
            stroke="#8f3d1e"
            strokeWidth="1"
          />
          {/* Triangular aerodynamic white board */}
          <path
            d="M 139 39 L 144 23 L 162 23 L 167 39 Z"
            fill="#ffffff"
            stroke="#c1552c"
            strokeWidth="1.5"
          />
          {/* Red "L" (Learner Driver) emblem */}
          <rect
            x="147"
            y="25"
            width="12"
            height="12"
            rx="1.5"
            fill="#e02424"
          />
          <text
            x="153"
            y="35"
            fontSize="10"
            fontWeight="900"
            fill="#ffffff"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            L
          </text>
        </g>
      )}

      {/* body */}
      <path
        d="
          M 30 118
          L 30 100
          C 30 92 36 86 44 86
          L 70 86
          L 95 55
          C 100 49 108 46 116 46
          L 190 46
          C 198 46 205 49 210 55
          L 232 82
          L 262 86
          C 270 87 276 93 276 101
          L 276 118
          Z
        "
        fill="#c1552c"
        stroke="#8f3d1e"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* windows */}
      <path
        d="M 100 82 L 118 56 C 121 52 126 50 131 50 L 148 50 L 148 82 Z"
        fill="#161a2e"
      />
      <path
        d="M 154 82 L 154 50 L 186 50 C 191 50 196 52 199 56 L 216 82 Z"
        fill="#161a2e"
      />
      <rect x="150" y="50" width="4" height="32" fill="#8f3d1e" />

      {/* door seam */}
      <line
        x1="180"
        y1="86"
        x2="180"
        y2="118"
        stroke="#8f3d1e"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* bumpers */}
      <rect x="30" y="100" width="12" height="18" rx="3" fill="#eee7dc" />
      <rect x="264" y="100" width="12" height="18" rx="3" fill="#eee7dc" />

      {/* lights: headlight (front, right) / taillight (rear, left) */}
      <circle cx="268" cy="96" r="4" fill="#f4d58d" />
      <circle cx="38" cy="96" r="4" fill="#e0574a" />

      {/* door handle */}
      <rect x="164" y="76" width="10" height="4" rx="2" fill="#eee7dc" />

      {/* wheel arches */}
      <path
        d="M 54 118 A 26 26 0 0 1 106 118"
        fill="none"
        stroke="#eee7dc"
        strokeWidth="3"
        opacity="0.7"
      />
      <path
        d="M 194 118 A 26 26 0 0 1 246 118"
        fill="none"
        stroke="#eee7dc"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* wheels */}
      <g transform="translate(80,120)">
        <WheelGroup spinDuration={spinDuration} />
      </g>
      <g transform="translate(220,120)">
        <WheelGroup spinDuration={spinDuration} />
      </g>
    </svg>
  );
}

export const CAR_ASPECT = 300 / 160; // 1.875

/* ------------------------------------------------------------------
   Global Keyframes and Styles
------------------------------------------------------------------- */
export const carKeyframes = `
@keyframes cl-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes cl-drive-road {
  0%   { left: -260px; }
  100% { left: 100%; }
}
@keyframes cl-bob {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-3.5px); }
}
@keyframes cl-idle-bob {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%      { transform: translateY(-2.5px) rotate(-0.6deg); }
}
@keyframes cl-lane-move {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes cl-dots {
  0%, 20%  { opacity: 0; }
  50%      { opacity: 1; }
  100%     { opacity: 0; }
}

/* smoke: puffs backwards from tailpipe (left) */
@keyframes cl-smoke {
  0%   { transform: translate(0, 0) scale(0.3); opacity: 0.65; }
  100% { transform: translate(-50px, -32px) scale(1.8); opacity: 0; }
}

/* dust: kicked back from wheel wells */
@keyframes cl-dust {
  0%   { transform: translate(0, 0) scale(0.4); opacity: 0.7; }
  100% { transform: translate(-44px, 4px) scale(1.4); opacity: 0; }
}

.cl-bob       { animation: cl-bob 0.35s ease-in-out infinite; }
.cl-idle-bob  { animation: cl-idle-bob 1.1s ease-in-out infinite; }
.cl-lane-fast { animation: cl-lane-move 0.38s linear infinite; }
.cl-lane-mid  { animation: cl-lane-move 0.58s linear infinite; }

.cl-smoke {
  width: 12px;
  height: 12px;
  left: 5%;
  bottom: 34%;
}
.cl-smoke-1 { animation: cl-smoke 1.1s ease-out infinite; }
.cl-smoke-2 { animation: cl-smoke 1.1s ease-out infinite 0.36s; }
.cl-smoke-3 { animation: cl-smoke 1.1s ease-out infinite 0.72s; }

.cl-dust {
  width: 9px;
  height: 6px;
  bottom: 2%;
}
.cl-dust-front-1 { left: 26%; animation: cl-dust 0.8s ease-out infinite; }
.cl-dust-front-2 { left: 26%; animation: cl-dust 0.8s ease-out infinite 0.4s; }
.cl-dust-rear-1  { left: 73%; animation: cl-dust 0.8s ease-out infinite 0.18s; }
.cl-dust-rear-2  { left: 73%; animation: cl-dust 0.8s ease-out infinite 0.58s; }

.cl-dots span { display: inline-block; opacity: 0; animation: cl-dots 1.2s infinite; }
.cl-dots span:nth-child(1) { animation-delay: 0s; }
.cl-dots span:nth-child(2) { animation-delay: 0.2s; }
.cl-dots span:nth-child(3) { animation-delay: 0.4s; }
`;

/* ------------------------------------------------------------------
   1) NavCarLogo — Compact logo for navigation header
------------------------------------------------------------------- */
export default function NavCarLogo({
  height = 38,
  showRoofSign = true,
}: {
  height?: number;
  showRoofSign?: boolean;
}) {
  const width = height * CAR_ASPECT;
  return (
    <div className="relative inline-flex items-center">
      <style>{carKeyframes}</style>
      <CarBody
        showRoofSign={showRoofSign}
        style={{ width, height, display: "block" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   2) CarLoader — Drive-by loading banner for School Desk ERP operations
------------------------------------------------------------------- */
export function CarLoader({
  label = "School Desk — Syncing Fleet & Schedules",
  moduleName = "Desktop ERP Engine",
  width = 480,
  height = 224,
  showRoofSign = true,
}: {
  label?: string;
  moduleName?: string;
  width?: number | string;
  height?: number;
  showRoofSign?: boolean;
}) {
  const roadH = height * 0.22;
  const carH = height * 0.48;
  const carW = carH * CAR_ASPECT;

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#2c3242] via-[#232734] to-[#171a22] border border-border/50 shadow-2xl"
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: `${height}px`,
      }}
    >
      <style>{carKeyframes}</style>

      {/* Sky Glow */}
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_80%_20%,#f2b077_0%,transparent_55%)] pointer-events-none" />

      {/* Road */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#20232a] border-t-2 border-[#3a3d45]"
        style={{ height: roadH }}
      >
        <div
          className="cl-lane-mid absolute top-1/2 -translate-y-1/2 left-0 h-1.5 flex gap-10"
          style={{ width: "240%" }}
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-12 rounded-full bg-[#cfd3da]/70 shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Car Rig: drives left-to-right via coordinate animation */}
      <div
        className="absolute"
        style={{
          bottom: roadH - carH * 0.08,
          animation: "cl-drive-road 3.8s linear infinite",
          width: carW,
          height: carH,
        }}
      >
        <div className="cl-bob relative w-full h-full">
          <CarBody
            showRoofSign={showRoofSign}
            className="absolute inset-0 w-full h-full"
          />

          {/* Exhaust smoke */}
          <span className="cl-smoke cl-smoke-1 absolute rounded-full bg-black/40" />
          <span className="cl-smoke cl-smoke-2 absolute rounded-full bg-black/30" />
          <span className="cl-smoke cl-smoke-3 absolute rounded-full bg-black/20" />

          {/* Dust behind wheels */}
          <span className="cl-dust cl-dust-front-1 absolute rounded-full bg-[#cbb89a]/75" />
          <span className="cl-dust cl-dust-front-2 absolute rounded-full bg-[#cbb89a]/55" />
          <span className="cl-dust cl-dust-rear-1 absolute rounded-full bg-[#cbb89a]/75" />
          <span className="cl-dust cl-dust-rear-2 absolute rounded-full bg-[#cbb89a]/55" />
        </div>
      </div>

      {/* Label with animated dots & Module Tag */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 w-max max-w-[90%]">
        <div className="text-[#f2e9de] text-xs sm:text-sm font-semibold tracking-wide bg-background/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 shadow-md flex items-center gap-1.5">
          <span className="truncate">{label}</span>
          <span className="cl-dots flex shrink-0">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
        {moduleName && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            {moduleName}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   3) CarLoaderCompact — Inline spinner with suspension bobbing
------------------------------------------------------------------- */
export function CarLoaderCompact({
  size = 96,
  showRoofSign = true,
}: {
  size?: number;
  showRoofSign?: boolean;
}) {
  const carH = size / CAR_ASPECT;
  return (
    <div
      className="relative inline-block select-none"
      style={{ width: size, height: carH }}
    >
      <style>{carKeyframes}</style>
      <div className="cl-idle-bob relative w-full h-full">
        <CarBody
          showRoofSign={showRoofSign}
          className="absolute inset-0 w-full h-full"
        />
        <span className="cl-smoke cl-smoke-1 absolute rounded-full bg-black/40" />
        <span className="cl-smoke cl-smoke-2 absolute rounded-full bg-black/30" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   4) HeroFullWidthRoad — Cinematic Full-Width Driving Road Banner
   Tailored for "School Desk" Driving School Management ERP.
------------------------------------------------------------------- */
export function HeroFullWidthRoad() {
  const [speed, setSpeed] = useState<"normal" | "turbo">("normal");
  const [roofSign, setRoofSign] = useState(true);

  const driveDuration = speed === "turbo" ? "2.2s" : "3.8s";
  const wheelDuration = speed === "turbo" ? "0.22s" : "0.38s";
  const carHeight = 110;
  const carWidth = carHeight * CAR_ASPECT;
  const roadHeight = 70;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-[#191d26] via-[#14161f] to-[#0c0d12] shadow-2xl shadow-primary/10">
      <style>{carKeyframes}</style>

      {/* Atmospheric Top Header / Status bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            School Desk ERP
          </span>
          <span className="text-xs text-primary font-bold px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
            Dual-Control Fleet Active
          </span>
          <span className="hidden sm:inline text-xs text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            SQLite (Offline-First)
          </span>
        </div>

        {/* Controls: Speed + Roof Sign Toggle */}
        <div className="flex items-center gap-3">
          {/* Roof sign toggle */}
          <button
            onClick={() => setRoofSign(!roofSign)}
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              roofSign
                ? "bg-red-500/15 text-red-400 border-red-500/30"
                : "bg-secondary text-muted-foreground border-border/40"
            }`}
            title="Toggle Learner Driving School Sign"
          >
            <span className="w-3.5 h-3.5 rounded bg-red-600 text-white font-extrabold text-[9px] flex items-center justify-center">
              L
            </span>
            <span className="hidden md:inline">Learner Sign</span>
          </button>

          {/* Speed switcher */}
          <div className="inline-flex rounded-xl bg-black/40 p-1 border border-border/40">
            <button
              onClick={() => setSpeed("normal")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                speed === "normal"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              Lesson Speed
            </button>
            <button
              onClick={() => setSpeed("turbo")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                speed === "turbo"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Highway / RTO
            </button>
          </div>
        </div>
      </div>

      {/* Horizon Ambient Glow */}
      <div className="relative h-44 w-full overflow-hidden">
        {/* Warm sunrise / street glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,rgba(193,85,44,0.22),transparent_70%)] pointer-events-none" />
        <div className="absolute top-4 left-1/4 w-96 h-32 bg-primary/10 blur-[80px] pointer-events-none" />

        {/* City Skyline Silhouette */}
        <div className="absolute bottom-16 left-0 right-0 h-16 opacity-20 pointer-events-none flex items-end justify-between px-8">
          <div className="w-16 h-12 bg-white/20 rounded-t-sm" />
          <div className="w-24 h-20 bg-white/15 rounded-t-sm" />
          <div className="w-12 h-8 bg-white/25 rounded-t-sm" />
          <div className="w-32 h-14 bg-white/10 rounded-t-sm" />
          <div className="w-20 h-18 bg-white/20 rounded-t-sm" />
          <div className="w-28 h-10 bg-white/15 rounded-t-sm" />
          <div className="w-14 h-16 bg-white/25 rounded-t-sm" />
          <div className="w-36 h-22 bg-white/10 rounded-t-sm" />
        </div>

        {/* Road Surface */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#16181f] border-t-2 border-[#2f333e]"
          style={{ height: roadHeight }}
        >
          {/* Upper Curb reflector line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

          {/* Animated Center Lane Dashes */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-0 h-2 flex gap-12 ${
              speed === "turbo" ? "cl-lane-fast" : "cl-lane-mid"
            }`}
            style={{ width: "240%" }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-14 rounded-full bg-[#f4d58d]/75 shadow-[0_0_8px_rgba(244,213,141,0.5)] shrink-0"
              />
            ))}
          </div>

          {/* Lower Road shoulder line */}
          <div className="absolute bottom-1.5 left-0 right-0 h-[1px] bg-white/15" />
        </div>

        {/* Car Driving Rig */}
        <div
          className="absolute z-10"
          style={{
            bottom: roadHeight - carHeight * 0.1,
            width: carWidth,
            height: carHeight,
            animation: `cl-drive-road ${driveDuration} linear infinite`,
          }}
        >
          <div className="cl-bob relative w-full h-full">
            {/* Front Headlight Beam glowing onto road */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "86%",
                top: "40%",
                width: "280px",
                height: "65px",
                background:
                  "radial-gradient(ellipse 100% 70% at 0% 50%, rgba(244, 213, 141, 0.45) 0%, rgba(244, 213, 141, 0.15) 45%, transparent 80%)",
                transform: "rotate(4deg)",
                transformOrigin: "left center",
              }}
            />

            {/* Main Car Body SVG */}
            <CarBody
              showRoofSign={roofSign}
              className="absolute inset-0 w-full h-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
              spinDuration={wheelDuration}
            />

            {/* Rear Taillight Red Glow */}
            <div
              className="absolute pointer-events-none rounded-full blur-md"
              style={{
                left: "4%",
                top: "54%",
                width: "24px",
                height: "24px",
                background: "rgba(224, 87, 74, 0.6)",
              }}
            />

            {/* Exhaust Smoke */}
            <span className="cl-smoke cl-smoke-1 absolute rounded-full bg-black/45" />
            <span className="cl-smoke cl-smoke-2 absolute rounded-full bg-black/35" />
            <span className="cl-smoke cl-smoke-3 absolute rounded-full bg-black/25" />

            {/* Dust kicked up at wheels */}
            <span className="cl-dust cl-dust-front-1 absolute rounded-full bg-[#d2be9f]/75" />
            <span className="cl-dust cl-dust-front-2 absolute rounded-full bg-[#d2be9f]/50" />
            <span className="cl-dust cl-dust-rear-1 absolute rounded-full bg-[#d2be9f]/75" />
            <span className="cl-dust cl-dust-rear-2 absolute rounded-full bg-[#d2be9f]/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   5) CarLoaderShowcase — Interactive Demo Section for Home Page
   Reflects the actual Core Modules of School Desk (Driving School ERP):
   - Student Admissions & Document Tracking
   - WhatsApp Automation (Meta Cloud API Worker)
   - Instructor Duty & Payroll Worker
   - Fleet Tracking & Maintenance
   - Scheduling & Conflict Detection
   - Offline-first SQLite + Prisma Sync
------------------------------------------------------------------- */
export function CarLoaderShowcase() {
  const modules = [
    {
      id: "students",
      label: "Syncing Student Admissions & KYC Documents",
      module: "StudentsTab & KYC",
      icon: FileCheck2,
      desc: "Student registration, license category, package selection, and fee installment ledger.",
    },
    {
      id: "whatsapp",
      label: "Worker: Polling MessageQueue via Meta Cloud API",
      module: "WhatsApp MessageWorker",
      icon: MessageSquare,
      desc: "Automated onboarding notifications, fee payment receipts, and lesson reminder templates.",
    },
    {
      id: "payroll",
      label: "Automating Instructor Duty & Payroll Ledger",
      module: "PayrollWorker Engine",
      icon: Users,
      desc: "Instructor schedule calculation, commission/hourly rates, and automated monthly payroll cycles.",
    },
    {
      id: "fleet",
      label: "Tracking Dual-Control Fleet & Service Logs",
      module: "VehiclesTab & Maintenance",
      icon: Car,
      desc: "Vehicle registration, insurance renewals, fuel logs, and driver duty assignments.",
    },
    {
      id: "schedule",
      label: "Detecting Slot Conflicts & RTO Test Dates",
      module: "ScheduleTab & Calendar",
      icon: CalendarDays,
      desc: "Time-slot reservations, dual-booking prevention, and daily instructor attendance.",
    },
    {
      id: "sqlite",
      label: "Writing to Local SQLite Database (Offline-First)",
      module: "better-sqlite3 & Prisma 7",
      icon: Database,
      desc: "Native desktop persistence with zero network dependency, syncing when online.",
    },
  ];

  const [activeModule, setActiveModule] = useState(modules[0]);
  const [scale, setScale] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedAction, setSimulatedAction] = useState<string | null>(null);

  const handleSimulate = (actionName: string) => {
    setSimulatedAction(actionName);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedAction(null);
    }, 2500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-primary bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4" />
            School Desk System Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Driving School Loaders &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Fleet Operations
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Custom vector driving vehicle with authentic "L" roof sign, suspension physics, and
            real-time operation states matching each core module of the School Desk ERP.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Hero CarLoader Banner */}
          <div className="lg:col-span-7 bg-card border border-border/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl font-bold">1. Drive-By Operation Banner</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Active state indicator during batch processing & background worker cycles
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <Play className="w-3.5 h-3.5 fill-primary" />
                  Live Fleet State
                </div>
              </div>

              {/* Loader Render Area */}
              <div className="w-full flex items-center justify-center p-4 bg-background/50 rounded-2xl border border-border/40 overflow-hidden min-h-[260px]">
                <CarLoader
                  label={activeModule.label}
                  moduleName={activeModule.module}
                  width="100%"
                  height={220 * scale}
                  showRoofSign={true}
                />
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-secondary/50 border border-border/40 text-xs text-muted-foreground">
                <span className="font-bold text-foreground">Active Module: </span>
                {activeModule.desc}
              </div>
            </div>

            {/* Customizer Controls based on ERP Modules */}
            <div className="mt-6 pt-6 border-t border-border/60 space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-wider">
                  Select Driving School Module:
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {modules.map((m) => {
                    const Icon = m.icon;
                    const isSelected = activeModule.id === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setActiveModule(m)}
                        className={`text-left text-xs font-bold p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                            : "bg-secondary/70 border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-primary"}`} />
                        <span className="truncate">{m.module}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>Scale Size: {Math.round(scale * 100)}%</span>
                <div className="flex gap-2">
                  {[0.85, 1, 1.15].map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        scale === s
                          ? "bg-primary text-white"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {s === 1 ? "100%" : `${s * 100}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Inline Spinners for Actions & Workers */}
          <div className="lg:col-span-5 bg-card border border-border/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl font-bold">2. Compact Inline Spinner</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Embedded inside buttons, table rows, and worker status cards
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <RefreshCw className="w-4 h-4" />
                </div>
              </div>

              {/* Compact Showcase Box */}
              <div className="space-y-4">
                {/* Standalone Spinner Preview */}
                <div className="bg-secondary/40 border border-border/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2.5">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Idle Suspension Bobbing with Dual-Control "L" Sign
                  </div>
                  <div className="py-2">
                    <CarLoaderCompact size={110} showRoofSign={true} />
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground bg-background px-3 py-1 rounded-md border border-border">
                    {"<CarLoaderCompact size={110} showRoofSign={true} />"}
                  </div>
                </div>

                {/* Simulated Desktop ERP Action Buttons */}
                <div className="bg-secondary/40 border border-border/50 rounded-2xl p-4 space-y-2.5">
                  <div className="text-xs font-bold text-foreground">
                    Simulate Desktop ERP Worker Tasks:
                  </div>

                  {/* Button 1: WhatsApp Queue */}
                  <button
                    onClick={() => handleSimulate("WhatsApp MessageWorker")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-between hover:opacity-95 shadow-md shadow-primary/20 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Dispatch WhatsApp Receipts
                    </span>
                    {isSimulating && simulatedAction === "WhatsApp MessageWorker" ? (
                      <CarLoaderCompact size={34} showRoofSign={false} />
                    ) : (
                      <span className="text-[10px] bg-black/25 px-2 py-0.5 rounded">Meta API</span>
                    )}
                  </button>

                  {/* Button 2: SQLite Sync */}
                  <button
                    onClick={() => handleSimulate("SQLite Prisma Sync")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-card border border-border text-foreground text-xs font-bold flex items-center justify-between hover:bg-secondary transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-primary" />
                      Sync Offline SQLite Database
                    </span>
                    {isSimulating && simulatedAction === "SQLite Prisma Sync" ? (
                      <CarLoaderCompact size={34} showRoofSign={false} />
                    ) : (
                      <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground">better-sqlite3</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Architecture specs callout */}
            <div className="mt-6 pt-5 border-t border-border/60">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-secondary/50 rounded-xl p-2.5 border border-border/30">
                  <div className="text-xs font-black text-primary">Nextron</div>
                  <div className="text-[10px] font-semibold text-muted-foreground">
                    Electron + React 19
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-2.5 border border-border/30">
                  <div className="text-xs font-black text-emerald-500">Prisma 7</div>
                  <div className="text-[10px] font-semibold text-muted-foreground">
                    Local SQLite DB
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-2.5 border border-border/30">
                  <div className="text-xs font-black text-amber-500">Meta API</div>
                  <div className="text-[10px] font-semibold text-muted-foreground">
                    WhatsApp Queue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
