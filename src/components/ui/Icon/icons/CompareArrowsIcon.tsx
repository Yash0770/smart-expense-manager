import React from "react";

interface CompareArrowsIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function CompareArrowsIcon({
  size = 20,
  className = "",
  strokeWidth = 2,
}: CompareArrowsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 13H7" />
      <path d="M19 9h-4" />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <rect x="15" y="5" width="4" height="12" rx="1" />
      <rect x="7" y="8" width="4" height="9" rx="1" />
    </svg>
  );
}
