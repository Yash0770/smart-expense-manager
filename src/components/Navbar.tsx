"use client";

import ThemeToggle from "@/src/components/ThemeToggle";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Icon from "./ui/Icon/Icon";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <div className="h-14 flex items-center justify-between px-4 border-b dark:border-white/10 backdrop-blur-md bg-white/70 dark:bg-[#030712]">
      {/* Left */}
      <h2
        className="font-semibold text-lg tracking-tight cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <span>💰</span>{" "}
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Expense Manager
        </span>
      </h2>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
          Y
        </div>

        <button onClick={logout}>
          <Icon name="logoutIcon" size={20} className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
