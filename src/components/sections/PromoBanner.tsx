"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export const PromoBanner: React.FC = () => {
  return (
    <section
      className="relative bg-black text-white overflow-hidden flex items-center justify-center mx-auto w-full"
      style={{
        maxWidth: "1440px",
        height: "812px",
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100 select-none pointer-events-none"
        style={{
          backgroundImage:
            "url('https://media.licdn.com/dms/image/v2/D4D16AQEomYovJmxROw/profile-displaybackgroundimage-shrink_200_800/B4DZdE0XHAHkAU-/0/1749206267272?e=2147483647&v=beta&t=rHRtvrzd_r7WyLc9NbDhmtqj2azDc4r_im1-btFnVLs')",
        }}
      />
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            color: "#fff",
            fontFamily: "Prompt, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "6px",
            lineHeight: "24px",
            margin: "0px auto 20px",
            textAlign: "center",
            textTransform: "uppercase",
            width: "700px",
            height: "24px",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          IRON ISLAND
        </motion.div>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            color: "#fff",
            fontFamily: "Prompt",
            fontSize: "52px",
            fontWeight: "600",
            lineHeight: "60px",
            margin: "0px 0px 20px",
            textAlign: "center",
            maxWidth: "100%"
          }}>
          STRONGEST IN THE CITY
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            color: "#fff",
            fontFamily: "Prompt",
            fontSize: "17px",
            fontWeight: "300",
            lineHeight: "27.2px",
            margin: "0px 0px 20px",
            textAlign: "center"
          }}
        >
          Test your limits with a short run, long run, or lifting showdown. Limited spots, lock in your entry today!
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-4"
        >
          <button
            onClick={() => {
              const el = document.getElementById("collections");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center justify-center border border-white rounded-[50px] bg-transparent transition-all duration-300 hover:bg-white hover:border-white mx-auto"
            style={{
              alignItems: "center",
              color: "#ffffffff",
              borderColor: "#fff",
              borderRadius: "50px",
              borderStyle: "solid",
              borderWidth: "1px",
              display: "flex",
              fontFamily: "Prompt, sans-serif",
              justifyContent: "center",
              margin: "25px auto 0px",
              padding: "7px 30px",
              textAlign: "center"
            }}
          >
            <span
              className="transition-colors duration-300 text-white group-hover:text-black"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.28px",
                lineHeight: "22.4px",
                textAlign: "center",
                textTransform: "uppercase"
              }}
            >
              Explore
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
export default PromoBanner;
