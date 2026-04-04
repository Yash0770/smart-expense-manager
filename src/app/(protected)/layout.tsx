"use client";

import Sidebar from "@/src/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";

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
      <div className="h-screen flex items-center justify-center">
        {" "}
        <p>Loading dashboard...</p>
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
    </div>
  );
}
