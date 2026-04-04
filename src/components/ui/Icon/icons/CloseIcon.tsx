import React from "react";

interface CloseIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function CloseIcon({
  size = 20,
  className = "",
  strokeWidth = 2,
}: CloseIconProps) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
