import React from "react";

interface PlusIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function PlusIcon({
  size = 20,
  className = "",
  strokeWidth = 2,
}: PlusIconProps) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
