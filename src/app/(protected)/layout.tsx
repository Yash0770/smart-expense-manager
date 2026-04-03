"use client";

import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4 md:p-8">{children}</div>
    </div>
  );
}
