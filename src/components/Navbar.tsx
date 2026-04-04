"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out 👋");
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/40 border-b border-gray-200 dark:border-white/10 px-6 py-3 flex justify-between items-center">
      <h1
        className="font-semibold text-lg tracking-tight cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        💰 Expense Manager
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
          Y
        </div>
        <button
          onClick={handleLogout}
          className="font-semibold text-sm text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
