"use client";

import ThemeToggle from "@/src/components/ThemeToggle";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Icon from "./ui/Icon/Icon";
import { useEffect, useState } from "react";
import { getInitials } from "@/src/lib/getInitials";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarSections } from "@/src/data/sidebarData";
import { SidebarSection } from "@/src/types/sidebar";

type User = {
  name: string;
  email: string;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClick = () => setOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="h-14 flex items-center justify-between px-4 border-b dark:border-white/10 backdrop-blur-md bg-white/70 dark:bg-[#030712] z-40 relative">
        {/* Left — Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger: only on mobile */}
          <button
            className="md:hidden p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? "closeIcon" : "menuIcon"} size={20} />
          </button>

          <h2
            className="font-semibold text-lg tracking-tight cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            💰{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              Expense Manager
            </span>
          </h2>
        </div>

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

          {/* Avatar Dropdown */}
          {open && (
            <div className="absolute right-0 top-11 w-44 bg-white dark:bg-gray-900 border dark:border-white/10 rounded-xl shadow-md p-2 z-50">
              <div className="px-3 py-2 border-b dark:border-white/10">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
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

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-gray-50 dark:bg-[#030712] border-r border-gray-200 dark:border-white/10 z-40 md:hidden overflow-y-auto p-5">
            {sidebarSections.map((section: SidebarSection, index: number) => (
              <div key={index} className="mb-6">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase">
                  {section.title}
                </h2>

                <nav className="space-y-1">
                  {section.items.map((item, i) => {
                    const isActive = pathname === item.path;

                    return (
                      <Link href={item.path} key={i}>
                        <div
                          className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer font-medium transition-colors
                            ${
                              isActive
                                ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400"
                                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                            }
                          `}
                        >
                          <Icon name={item.icon} size={20} />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </aside>
        </>
      )}
    </>
  );
}
