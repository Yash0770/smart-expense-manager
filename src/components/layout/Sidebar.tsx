"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "@/src/components/ui/Icon/Icon";
import { sidebarSections } from "@/src/data/sidebarData";
import { SidebarSection } from "@/src/types/sidebar";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-46 lg:w-64 border-r border-gray-200 bg-gray-50 dark:bg-[#030712] flex flex-col dark:border-white/10 hidden md:block">
      <div className="mt-4 flex-1 overflow-y-auto scrollbar p-5">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
                        font-medium transition-colors
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
      </div>
    </aside>
  );
}