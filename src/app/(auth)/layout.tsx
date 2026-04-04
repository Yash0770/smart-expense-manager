"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard"); // redirect if already logged in
    } else {
      setLoading(false);
    }
  }, []);

  // prevent flicker
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Checking auth...</p>
      </div>
    );
  }

  return <>{children}</>;
}
