"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Icon from "@/src/components/ui/Icon/Icon";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch {
      toast.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="relative bg-[#111118] border border-white/[0.06] rounded-2xl p-8 shadow-2xl shadow-black/60">
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Icon name="keyRoundIcon" size={22} className="text-violet-400" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-white text-center mb-1 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-white/40 text-center mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-widest">
                Email
              </label>
              <div
                className={`relative rounded-lg border ${errors.email ? "border-red-500/60 bg-red-500/5" : "border-white/[0.08] bg-white/[0.03]"} transition-colors focus-within:border-violet-500/50 focus-within:bg-violet-500/5`}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <Icon name="emailIcon" size={15} />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                  className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none rounded-lg"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <Icon name="circleAlertIcon" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-widest">
                Password
              </label>
              <div
                className={`relative rounded-lg border ${errors.password ? "border-red-500/60 bg-red-500/5" : "border-white/[0.08] bg-white/[0.03]"} transition-colors focus-within:border-violet-500/50 focus-within:bg-violet-500/5`}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <Icon name="lockIcon" size={15} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  className="w-full bg-transparent pl-10 pr-11 py-3 text-sm text-white placeholder-white/20 outline-none rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <Icon
                      name="eyeOffIcon"
                      size={15}
                      className="cursor-pointer"
                    />
                  ) : (
                    <Icon name="eyeIcon" size={15} className="cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <Icon name="circleAlertIcon" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 relative overflow-hidden bg-violet-600 hover:bg-violet-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/30 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-white/40">
            Don't have an account?{" "}
            <span
              className="text-violet-400 hover:text-violet-300 cursor-pointer transition-colors font-medium"
              onClick={() => router.push("/register")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
