"use client";

import Icon from "@/src/components/ui/Icon/Icon";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#030712] px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-white/30 shrink-0 z-10">
      {/* Branding */}
      <p className="text-center sm:text-left">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-700 dark:text-white/60 font-medium">
          Smart Expense Manager
        </span>
        . Built by{" "}
        <span className="text-gray-700 dark:text-white/60 font-medium">
          Yash Solanki
        </span>
      </p>

      {/* Links */}
      <div className="flex items-center gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/Yash0770"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-500 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <Icon name="githubIcon" size={22} />
          <span>GitHub</span>
        </a>

        <span className="text-gray-300 dark:text-white/10">|</span>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yash-solanki-45a6b41bb/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-500 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <Icon name="linkedinIcon" size={22} />
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}
