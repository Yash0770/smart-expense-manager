"use client";

import ThemeToggle from "@/src/components/ThemeToggle";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Icon from "./ui/Icon/Icon";
import { useEffect, useState } from "react";
import { getInitials } from "@/src/lib/getInitials";

type User = {
  name: string;
  email: string;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    router.push("/login");
  };

  useEffect(() => {
    const handleClick = () => setOpen(false);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="h-14 flex items-center justify-between px-4 border-b dark:border-white/10 backdrop-blur-md bg-white/70 dark:bg-[#030712]">
      {/* Left */}
      <h2
        className="font-semibold text-lg tracking-tight cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        💰{" "}
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Expense Manager
        </span>
      </h2>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        <ThemeToggle />

        {/* Avatar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer"
        >
          {user ? getInitials(user.name) : "Y"}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-11 w-44 bg-white dark:bg-gray-900 border dark:border-white/10 rounded-xl shadow-md p-2 z-50">
            {/* User Info */}
            <div className="px-3 py-2 border-b dark:border-white/10">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            {/* Logout */}
            <div
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 mt-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"
            >
              <Icon name="logoutIcon" size={16} />
              <span className="text-sm">Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
