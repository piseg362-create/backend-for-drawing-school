"use client";

import React, { useState, useEffect } from "react";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'instructor'>('admin');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInstructorLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/instructor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        router.push("/attendance");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'instructor') {
      handleInstructorLogin();
    } else {
      // Mock admin login
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden p-4">
      
      {/* --- Cursor Spotlight Effect --- */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-0 md:opacity-100"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(193, 85, 44, 0.08), transparent 40%)'
        }}
      />

      {/* --- Background Ambient Effects --- */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div 
          className="absolute inset-0 h-full w-full opacity-60"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 40%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 40%, transparent 100%)'
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* --- Logo Header --- */}
      <Link href="/" className="flex items-center mb-8 relative z-10 group cursor-pointer">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center mr-3 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
          <Car className="w-6 h-6" />
        </div>
        <span className="font-extrabold text-3xl tracking-tight">Drive<span className="text-primary">Sync</span></span>
      </Link>

      {/* --- Auth Card --- */}
      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
        
        {/* Subtle top glow inside card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p className="text-muted-foreground font-medium">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start your 14-day free trial today.'}
          </p>
        </div>

        {isLogin && (
          <div className="flex bg-secondary/50 p-1 rounded-xl mb-6 border border-border/50">
            <button 
              onClick={() => { setRole('admin'); setError(""); }} 
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'admin' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Admin
            </button>
            <button 
              onClick={() => { setRole('instructor'); setError(""); }} 
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'instructor' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Instructor
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-red-500 text-sm font-bold text-center">{error}</div>}
          
          {role === 'instructor' ? (
            <div>
              <label className="block text-sm font-bold text-foreground mb-1.5">Access Token</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium uppercase" 
                  placeholder="e.g. A02247"
                  required
                />
              </div>
            </div>
          ) : (
            <>
              {/* Name Field (Only on Signup) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">School Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Car className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input 
                      type="text" 
                      className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium" 
                      placeholder="City Drive Academy"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium" 
                    placeholder="admin@school.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-foreground">Password</label>
                  {isLogin && <a href="#" className="text-sm font-bold text-primary hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-extrabold text-lg flex items-center justify-center hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(193,85,44,0.3)] hover:shadow-[0_0_30px_rgba(193,85,44,0.5)] hover:-translate-y-0.5 group">
            {isLogin ? 'Sign In' : 'Start Free Trial'}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {role === 'admin' && (
          <>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="h-px bg-border flex-1" />
              <span className="text-sm font-bold text-muted-foreground">or continue with</span>
              <div className="h-px bg-border flex-1" />
            </div>

            {/* Social Logins */}
            <div className="mt-6">
              <button className="w-full bg-background border border-border rounded-xl py-3 font-bold flex items-center justify-center hover:bg-secondary transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>
          </>
        )}

        {/* Toggle Login/Signup */}
        {role === 'admin' && (
          <p className="text-center mt-8 text-sm font-bold text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-extrabold"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        )}

      </div>

      <div className="mt-8 text-center relative z-10 flex items-center justify-center text-xs font-bold text-muted-foreground">
        <ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" />
        Secure 256-bit AES encryption
      </div>
    </div>
  );
}
