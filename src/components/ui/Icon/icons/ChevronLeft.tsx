import React from "react";

interface ChevronLeftIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function ChevronLeftIcon({
  size = 20,
  className = "",
  strokeWidth = 2,
}: ChevronLeftIconProps) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
