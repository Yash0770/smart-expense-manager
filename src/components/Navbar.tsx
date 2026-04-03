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
    <div className="flex justify-between items-center px-4 md:px-8 py-3 border-b dark:border-gray-700">
      {/* Left */}
      <h1
        className="font-bold text-lg cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        💰 Expense Manager
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
          U
        </div>

        <button onClick={handleLogout} className="text-sm text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}
