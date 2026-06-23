import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: custom * 0.1 },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: custom * 0.08 },
  }),
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const hoverZoom: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.4, ease: "easeOut" } },
};
