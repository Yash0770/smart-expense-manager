"use client";

import Sidebar from "@/src/components/layout/Sidebar";
import Navbar from "@/src/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/Footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-[#030712]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-white/40">
            Loading dashboard...
          </p>
        </div>
      </div>
    );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100 dark:bg-[#030712]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-[#030712]">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
