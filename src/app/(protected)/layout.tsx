"use client";

import Sidebar from "@/src/components/layout/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
