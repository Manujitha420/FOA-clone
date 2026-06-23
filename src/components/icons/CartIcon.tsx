import React from "react";

export const CartIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 4.58011L3.88304 1.09945V1H15.2164L18 4.58011M1 4.58011V17.2099C1 18.2044 1.89474 19 2.88889 19H16.1111C17.1053 19 18 18.2044 18 17.2099V4.58011M1 4.58011H18M13.3275 8.16022C13.3275 10.1492 11.6374 11.7403 9.54971 11.7403C7.46199 11.7403 5.67251 10.1492 5.67251 8.16022"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default CartIcon;
