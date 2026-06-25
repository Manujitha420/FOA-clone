import React from "react";

export const LogoIcon: React.FC<{ className?: string; invert?: boolean }> = ({ className = "h-6 w-auto", invert = true }) => {
  return (
    <img
      src="/logo.png"
      alt="FOA"
      className={`${className} object-contain`}
      style={{
        filter: invert ? "brightness(0) invert(1)" : "brightness(0)",
        transition: "filter 300ms ease",
        fontSize: "17px",
        fontWeight: 300,
        lineHeight: "27.2px",
        textAlign: "center"
      }}
    />
  );
};
export default LogoIcon;
