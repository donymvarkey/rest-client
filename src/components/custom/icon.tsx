import React from "react";

// Define the icons object with your available icons
const icons: Record<
  string,
  React.ComponentType<{ color?: string; size?: number }>
> = {
  // Example icon components
  home: ({ color, size }) => <svg style={{ color, fontSize: size }}></svg>,
  user: ({ color, size }) => <svg style={{ color, fontSize: size }}></svg>,
};

// Define the props type
interface IconProps {
  name: keyof typeof icons; // Ensures only valid icon names can be passed
  color?: string; // Optional string for color
  size?: number; // Optional number for size
}

const Icon: React.FC<IconProps> = ({ name, color, size }) => {
  const LucideIcon = icons[name]; // Resolve the appropriate icon component

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
