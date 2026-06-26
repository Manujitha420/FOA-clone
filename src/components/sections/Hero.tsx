"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_SLIDES = [
  {
    image: "https://foaclothing.com/cdn/shop/files/Untitled_design_1_5b73bf05-5465-4cbc-8706-35c6474443a1.png?v=1772531406&width=1920",
    title: "Printed Tees\nCollection",
    link: "/#men",
    cta: "Shop Now",
  },
  {
    image: "https://foaclothing.com/cdn/shop/files/web_1_a3b9b7ef-a9c0-43fc-83a0-139d1dcf9a32.png?v=1769071508&width=1920",
    title: "Womans Collection",
    link: "/#women",
    cta: "Shop Now",
  },

];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none whitespace-pre-line" style={{ fontFamily: "sans-serif" }}>
              {HERO_SLIDES[currentSlide].title}
            </h1>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  const el = document.getElementById(HERO_SLIDES[currentSlide].link.substring(2));
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center justify-center border border-white rounded-[50px] bg-transparent transition-all duration-300 hover:bg-white hover:border-white"
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
                  {HERO_SLIDES[currentSlide].cta}
                </span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 z-10 flex items-center space-x-2">
        {HERO_SLIDES.map((_, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="w-6 h-6 flex items-center justify-center focus:outline-none relative"
              aria-label={`Go to slide ${idx + 1}`}
            >
              {isActive ? (
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1.5"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="white"
                      strokeWidth="1.5"
                      fill="transparent"
                      strokeDasharray="50.26"
                      initial={{ strokeDashoffset: 50.26 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </svg>
                  <span className="w-2 h-2 bg-white rounded-full block z-10" />
                </div>
              ) : (
                <span className="w-2.5 h-2.5 bg-white/40 hover:bg-white/70 rounded-full transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
export default Hero;
