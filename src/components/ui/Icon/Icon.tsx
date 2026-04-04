import React from "react";
import { ICON_MAP } from "./iconMap";

type IconName = keyof typeof ICON_MAP;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}
