import React from "react";

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-auto" }) => {
  return (
    <img
      src="/logo.png"
      alt="FOA"
      className={`${className} object-contain`}
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
};
export default LogoIcon;
