import React from "react";

interface CheckIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function CheckIcon({
  size = 20,
  className = "",
  strokeWidth = 2,
}: CheckIconProps) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
