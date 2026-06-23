import React from "react";

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-auto" }) => {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Serif F */}
      <path
        d="M 6 19 
           h 10 
           v -1.5 
           h -3.5 
           v -5.5 
           h 3.5 
           v -1.5 
           h -3.5 
           v -4.5 
           h 5.5 
           v 1.5 
           h 1.5 
           v -3 
           h -14 
           v 1.5 
           h 1.5 
           v 13 
           h -1.5 
           v 1.5 
           z"
      />
      
      {/* First Dot */}
      <circle cx="30" cy="11.5" r="2.2" />

      {/* Circle O */}
      <circle
        cx="50"
        cy="11.5"
        r="7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Second Dot */}
      <circle cx="70" cy="11.5" r="2.2" />

      {/* Serif Caret Lambda Λ */}
      <path
        d="M 76.5 19 
           h 4 
           L 87 4 
           L 93 19 
           h 4 
           v -1.5 
           h -1.5 
           L 87 5.5 
           L 78 17.5 
           h -1.5 
           v 1.5 
           z"
      />
    </svg>
  );
};
export default LogoIcon;
