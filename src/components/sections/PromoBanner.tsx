"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export const PromoBanner: React.FC = () => {
  return (
    <section className="relative py-32 bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background Image with slight transparency */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 select-none pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1548624149-f7b2e65922b1?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-accent"
        >
          ELEVATE YOUR TRAINING
        </motion.span>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black uppercase tracking-wider leading-none"
        >
          Built for daily movement, styled for street culture.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-xs md:text-sm text-neutral-300 font-semibold uppercase tracking-widest leading-relaxed"
        >
          Our athletic cuts and street silhouettes represent the ultimate freedom of expression. Handcrafted locally using premium fabric blends.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-4"
        >
          <Button
            variant="accent"
            size="md"
            onClick={() => {
              const el = document.getElementById("men");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore The Range
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
export default PromoBanner;
