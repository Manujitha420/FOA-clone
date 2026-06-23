"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    image: "https://foaclothing.com/cdn/shop/files/Untitled_design_1_5b73bf05-5465-4cbc-8706-35c6474443a1.png?v=1772531406&width=1920",
    title: "Printed Tees Collection",
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
  }, []);

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
            <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tight leading-none">
              {HERO_SLIDES[currentSlide].title}
            </h1>
            <div className="pt-4">
              <Button
                variant="accent"
                size="lg"
                onClick={() => {
                  const el = document.getElementById(HERO_SLIDES[currentSlide].link.substring(2));
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {HERO_SLIDES[currentSlide].cta}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 z-10 flex space-x-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-none ${currentSlide === idx ? "w-10 bg-accent" : "w-4 bg-white/40"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
export default Hero;
