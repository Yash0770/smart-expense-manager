import React from "react";

interface ChevronRightIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function ChevronRightIcon({
  size = 20,
  className = "",
  strokeWidth = 2,
}: ChevronRightIconProps) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
