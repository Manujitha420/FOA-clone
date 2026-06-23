"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", animate = true, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-none font-semibold uppercase tracking-wider transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-neutral-800 dark:hover:bg-neutral-200",
      secondary: "bg-secondary text-secondary-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800",
      outline: "border border-neutral-300 dark:border-neutral-700 bg-transparent text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900",
      ghost: "bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-950",
      accent: "bg-accent text-white hover:bg-emerald-700",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (animate) {
      return (
        <motion.button
          ref={ref as any}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          {...(props as any)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
