"use client";

import { useRouter, usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Analytics", path: "/dashboard" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-full w-64 bg-white/70 dark:bg-black/40 backdrop-blur-md border-r border-gray-200 dark:border-white/10 p-4 hidden md:block">
      <h2 className="font-semibold text-lg mb-6">💰 Expense AI</h2>

      <div className="space-y-2">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`p-2 rounded-lg cursor-pointer ${
              pathname === item.path
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}