"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  MessageCircle,
  Zap,
  Languages,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  Download,
  CalendarDays,
  CreditCard,
  WifiOff,
  Brush,
  Menu,
  X,
  Play,
  ArrowRight,
  Sparkles,
  Users,
  LineChart,
  Star,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import NavCarLogo, { HeroFullWidthRoad, CarLoaderShowcase } from "@/components/CarLogo";

/* ─── Animated Counter ──────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: MessageCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/40",
      glow: "hover:shadow-emerald-500/10",
      title: "WhatsApp Automation",
      desc: "Send enrollment confirmations, fee reminders, and schedule alerts automatically through official Meta WhatsApp templates.",
      preview: (
        <div className="bg-[#075E54] rounded-2xl p-4 flex items-end gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm max-w-[220px]">
            🎨 Welcome to Drawing Pro! Your first class is tomorrow at 10 AM with Instructor Elena.
          </div>
        </div>
      ),
    },
    {
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/40",
      glow: "hover:shadow-amber-500/10",
      title: "Lightning-Fast Performance",
      desc: "Built as a native desktop app with a local database — works offline, starts instantly, and never freezes during class.",
      preview: (
        <div className="flex items-center justify-center gap-4 py-2">
          {["DB", "App", "You"].map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs">
                  {label}
                </div>
              </div>
              {i < 2 && (
                <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-500/60 to-amber-500/20 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1 rounded">
                    {"<1ms"}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ),
    },
    {
      icon: CalendarDays,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "hover:border-violet-500/40",
      glow: "hover:shadow-violet-500/10",
      title: "Smart Scheduling",
      desc: "Assign instructors, manage batch timings, track attendance, and prevent double-bookings across your entire fleet.",
      preview: (
        <div className="grid grid-cols-5 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
            <div key={d} className="text-center">
              <div className="text-[10px] font-bold text-muted-foreground mb-1">{d}</div>
              <div className="h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: CreditCard,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "hover:border-primary/40",
      glow: "hover:shadow-primary/10",
      title: "Integrated Payments",
      desc: "Collect fees via Razorpay, track pending dues, and auto-send payment receipts — all from one unified dashboard.",
      preview: (
        <div className="space-y-2">
          {[
            { name: "Rahul Sharma", amount: "₹5,000", status: "paid" },
            { name: "Priya Patel", amount: "₹3,500", status: "pending" },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between bg-secondary rounded-xl px-3 py-2">
              <span className="text-sm font-semibold">{r.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{r.amount}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === "paid" ? "bg-emerald-500/20 text-emerald-500" : "bg-destructive/20 text-destructive"}`}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Ramesh Gupta",
      role: "Owner, City Drive Academy, Pune",
      avatar: "RG",
      color: "from-orange-400 to-red-500",
      rating: 5,
      text: "DriveSync has completely transformed how we run our school. The WhatsApp automation alone saves us 3 hours every day. Our students love the professional experience.",
    },
    {
      name: "Sunita Rao",
      role: "Manager, Star Driving School, Bangalore",
      avatar: "SR",
      color: "from-violet-400 to-purple-600",
      rating: 5,
      text: "We used to miss fee follow-ups all the time. Now everything is automated and our revenue has gone up by 30% just from better collection rates.",
    },
    {
      name: "Aditya Kulkarni",
      role: "Director, Pro Drive Institute, Mumbai",
      avatar: "AK",
      color: "from-blue-400 to-cyan-500",
      rating: 5,
      text: "The offline capability is a game-changer. When our internet goes down during peak hours, the software keeps running flawlessly. Absolutely love it.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative overflow-hidden">

      {/* Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-0 md:opacity-100"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(193, 85, 44, 0.07), transparent 40%)",
        }}
      />

      {/* Background Ambient */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full bg-primary/8 blur-[180px]" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[55%] h-[55%] rounded-full bg-accent/8 blur-[180px]" />
      </div>

      {/* ─── Navbar ─────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group">
              <div className="mr-3 group-hover:scale-105 transition-transform duration-300">
                <NavCarLogo height={38} />
              </div>
              <span className="font-extrabold text-2xl tracking-tight">
                Drawing<span className="text-primary">Pro</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1 items-center bg-card/60 px-2 py-2 rounded-2xl border border-border/60 backdrop-blur-xl">
              {["Features", "How it Works", "Pricing"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a href="/login" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-xl hover:bg-secondary">
                Log In
              </a>
              <a
                href="/login"
                className="relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Get Started Free
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground bg-secondary p-2.5 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl">
            <div className="px-6 py-6 space-y-2">
              {["Features", "How it Works", "Pricing"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-bold text-foreground hover:text-primary hover:bg-secondary rounded-xl transition-all"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <a href="/login" className="block text-center text-base font-bold text-muted-foreground hover:text-primary py-3">
                  Log In
                </a>
                <a href="/login" className="block text-center rounded-xl bg-primary text-white px-4 py-4 text-base font-bold shadow-lg">
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero Section ───────────────────────────── */}
      <section className="relative pt-36 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
        {/* Grid Lines */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 10%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 10%, black 30%, transparent 100%)",
          }}
        />

        {/* Decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-primary/8 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-primary bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4" />
              <span>India's #1 Art School Management Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05]">
              Manage Your
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  Art School
                </span>
                {/* underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 9C50 3 100 1 150 3s100 6 148 6" stroke="url(#heroUnderline)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="heroUnderline" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#c1552c" />
                      <stop offset="1" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {" "}Effortlessly.
            </h1>

            {/* Subhead */}
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed font-medium max-w-2xl">
              The all-in-one platform for art academies to manage students, track attendance, automate communications, and collect payments — without breaking a sweat.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="/login"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-primary text-white px-8 py-4 font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(193,85,44,0.35)] hover:shadow-[0_0_60px_rgba(193,85,44,0.55)] hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start For Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:bg-[position:right_center] transition-all duration-500" />
              </a>
              <button className="inline-flex items-center justify-center rounded-2xl border border-border bg-card/80 backdrop-blur-sm text-foreground px-8 py-4 font-bold text-lg hover:border-primary/50 hover:bg-secondary transition-all duration-300 gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-muted-foreground">
              {[
                { icon: ShieldCheck, text: "No credit card required", color: "text-emerald-500" },
                { icon: Clock, text: "5-minute setup", color: "text-blue-500" },
                { icon: Award, text: "Trusted by 500+ schools", color: "text-amber-500" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${color}`} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Cinematic Full-Width Driving Road Banner ── */}
          <div className="mt-12 max-w-5xl mx-auto w-full">
            <HeroFullWidthRoad />
          </div>

          {/* Dashboard Mockup */}
          <div className="mt-12 relative mx-auto max-w-5xl">
            {/* Glow under mockup */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[3rem] blur-3xl opacity-40" />

            <div className="relative rounded-3xl bg-card border border-border/60 shadow-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="h-12 bg-secondary/80 border-b border-border flex items-center justify-between px-5 shrink-0">
                <div className="flex gap-2">
                  {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                  ))}
                </div>
                <div className="text-xs font-bold text-muted-foreground bg-background px-4 py-1 rounded-md border border-border">
                  Drawing Pro Admin ✦
                </div>
                <div className="w-16" />
              </div>

              {/* Inner layout */}
              <div className="flex bg-background min-h-[340px]">
                {/* Sidebar */}
                <div className="w-52 bg-secondary/30 border-r border-border p-4 flex flex-col gap-2 shrink-0">
                  <div className="h-8 w-full bg-secondary rounded-xl mb-2" />
                  {[
                    { icon: LayoutDashboard, label: "Overview", active: true },
                    { icon: Users, label: "Students" },
                    { icon: CalendarDays, label: "Schedule" },
                    { icon: CreditCard, label: "Payments" },
                  ].map(({ icon: Icon, label, active }) => (
                    <div
                      key={label}
                      className={`h-9 w-full rounded-xl flex items-center px-3 gap-2 text-xs font-bold transition-colors ${
                        active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col gap-5 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Good morning 👋</div>
                      <div className="text-xl font-extrabold">Dashboard Overview</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent shadow-md" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Total Students", value: "842", icon: Users, color: "text-violet-500", bg: "bg-violet-500/10" },
                      { label: "Today's Classes", value: "12", icon: CalendarDays, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                      { label: "Revenue", value: "₹42K", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                      <div key={label} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                        <div className={`w-8 h-8 rounded-lg ${bg} ${color} flex items-center justify-center mb-2`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-semibold text-muted-foreground">{label}</div>
                        <div className="text-2xl font-black mt-0.5">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart bars */}
                  <div className="flex-1 bg-secondary/40 rounded-2xl border border-border p-4 flex flex-col justify-end relative overflow-hidden">
                    <div className="absolute top-3 left-4 text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
                      <LineChart className="w-3.5 h-3.5" />
                      Weekly Attendance
                    </div>
                    <div className="flex items-end gap-2 h-20 mt-4">
                      {[50, 75, 55, 90, 70, 100, 85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md relative overflow-hidden"
                          style={{ height: `${h}%`, background: `hsl(${20 + i * 5}, 70%, ${45 + i * 2}%)`, opacity: 0.85 }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <div key={i} className="flex-1 text-center text-[10px] font-bold text-muted-foreground">{d}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -right-6 top-1/4 bg-card border border-border rounded-2xl p-4 shadow-xl hidden lg:block animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Payment Received</div>
                  <div className="text-xs text-muted-foreground">Rahul S. — ₹5,000</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-6 bottom-1/3 bg-card border border-border rounded-2xl p-4 shadow-xl hidden lg:block" style={{ animation: "bounce 4s ease-in-out 1s infinite" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-500 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">New Enrollment</div>
                  <div className="text-xs text-muted-foreground">Priya P. joined Batch A</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Band ──────────────────────────────── */}
      <section className="py-16 border-y border-border/50 bg-secondary/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 500, suffix: "+", label: "Art Schools", icon: Award },
              { value: 50000, suffix: "+", label: "Students Enrolled", icon: Users },
              { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Star },
              { value: 3, prefix: "", suffix: "hrs saved/day", label: "Average Time Saved", icon: Clock },
            ].map(({ value, suffix, prefix = "", label, icon: Icon }, i) => (
              <div key={i} className="group">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-foreground mb-1">
                  <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
                </div>
                <div className="text-sm font-semibold text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────── */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-primary bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Thrive
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
              Purpose-built tools for art school owners who want to spend less time on admin and more time inspiring students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, color, bg, border, glow, title, desc, preview }) => (
              <div
                key={title}
                className={`group bg-card border border-border ${border} ${glow} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 flex flex-col gap-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="bg-secondary/70 rounded-2xl p-4 border border-border/50">{preview}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interactive Car Loader Showcase ─────────── */}
      <CarLoaderShowcase />

      {/* ─── Problem vs Solution ─────────────────────── */}
      <section className="py-32 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Stop Managing. Start{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Creating.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
              See the difference Drawing Pro makes in your daily workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-destructive/20 p-10 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-destructive/5 rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6">
                  <WifiOff className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Before Drawing Pro</h3>
                <ul className="space-y-3">
                  {[
                    "Paper attendance sheets that get lost",
                    "Manual fee follow-ups by phone call",
                    "Double-booked studio slots",
                    "No insight into monthly revenue",
                    "Students unsure about schedules",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground font-medium">
                      <X className="w-4 h-4 text-destructive flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card border border-primary/30 p-10 rounded-3xl relative overflow-hidden group shadow-[0_0_60px_rgba(193,85,44,0.08)] hover:shadow-[0_0_80px_rgba(193,85,44,0.15)] transition-shadow duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">After Drawing Pro</h3>
                <ul className="space-y-3">
                  {[
                    "Digital attendance tracked in one tap",
                    "Automated WhatsApp fee reminders",
                    "Smart scheduling prevents conflicts",
                    "Real-time revenue dashboard",
                    "Students receive instant updates",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────── */}
      <section id="how-it-works" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-primary bg-primary/10 border border-primary/20 mb-6">
              <Clock className="w-4 h-4" />
              Quick Setup
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Up and Running in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Minutes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
              We designed every step to be as smooth as your brushstrokes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[22%] right-[22%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {[
              { step: "01", title: "Create Your Account", desc: "Sign up in 30 seconds. No credit card, no commitment. Your academy profile is ready instantly.", icon: Download },
              { step: "02", title: "Add Students & Batches", desc: "Import your roster or add students one by one. Set up batch timings and instructor assignments.", icon: Users },
              { step: "03", title: "Go Live & Grow", desc: "Start marking attendance, collecting payments, and sending automated messages the same day.", icon: TrendingUp },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <div key={i} className="relative group text-center">
                <div className="w-28 h-28 mx-auto bg-card border border-border rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:border-primary/40 transition-all duration-500 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon className="w-10 h-10 text-primary relative z-10" />
                  <div className="absolute -top-2 -right-2 w-9 h-9 bg-gradient-to-br from-primary to-accent text-white rounded-xl flex items-center justify-center text-xs font-extrabold shadow-lg border-2 border-background rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    {step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────── */}
      <section className="py-32 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 mb-6">
              <Star className="w-4 h-4 fill-amber-500" />
              Loved by School Owners
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Schools That Chose to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Grow Smarter
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, color, rating, text }) => (
              <div key={name} className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-6">
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium flex-1">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────── */}
      <section className="py-32 relative overflow-hidden m-4 lg:m-8 rounded-[2.5rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#d4622f] to-accent rounded-[2.5rem]" />
        <div className="absolute inset-0 opacity-10 rounded-[2.5rem]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent rounded-r-[2.5rem]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-bold text-white mb-8">
            <Sparkles className="w-4 h-4" />
            Start free. Scale fast.
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
            Ready to Transform
            <br />
            Your Art School?
          </h2>
          <p className="text-xl text-white/85 mb-12 font-medium max-w-2xl mx-auto">
            Join 500+ art academies across India who traded manual chaos for automated, professional management.
          </p>

          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 mb-8">
            <a
              href="/login"
              className="flex-1 text-center rounded-2xl bg-white text-primary px-8 py-4 font-black text-lg hover:bg-white/90 transition-colors shadow-xl flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/login"
              className="flex-1 text-center rounded-2xl bg-white/15 border border-white/30 backdrop-blur-sm text-white px-8 py-4 font-bold text-lg hover:bg-white/25 transition-colors"
            >
              Schedule a Demo
            </a>
          </div>

          <p className="text-sm text-white/70 font-semibold flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            No credit card required · Cancel anytime · Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────── */}
      <footer className="bg-background pt-20 pb-10 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-5 cursor-pointer group">
                <div className="mr-3 group-hover:scale-105 transition-transform duration-300">
                  <NavCarLogo height={36} />
                </div>
                <span className="font-extrabold text-2xl tracking-tight">
                  Drawing<span className="text-primary">Pro</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-medium">
                The complete management platform built specifically for art academies and drawing schools across India.
              </p>
              <div className="flex gap-3">
                {[
                  <path key="fb" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
                  <path key="tw" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
                  <><rect key="ig1" width="20" height="20" x="2" y="2" rx="5" ry="5"/><path key="ig2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line key="ig3" x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>,
                ].map((shape, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {shape}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "How it Works", "Download App", "What's New"],
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Careers", "Contact Support"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Data Processing"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-extrabold text-base mb-5">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-semibold text-muted-foreground">
              © {new Date().getFullYear()} Drawing Pro Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-secondary px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure · Reliable · Made in India 🇮🇳</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
