"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    subtitle: "STREETWEAR COLLECTIVE",
    title: "FREEDOM OVER ANYTHING",
    description: "Explore the new heavy-weight street dropped tees, cargos, and basic minimal drop.",
    link: "/#men",
    cta: "Shop Streetwear",
  },
  {
    image: "https://images.unsplash.com/photo-1548624149-f7b2e65922b1?q=80&w=1600&auto=format&fit=crop",
    subtitle: "ATHLETIC STRENGTH",
    title: "ELEVATE YOUR TRAINING",
    description: "Contoured activewear designed to withstand high-intensity workouts and daily motion.",
    link: "/#women",
    cta: "Shop Activewear",
  },
  {
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=1600&auto=format&fit=crop",
    subtitle: "MINIMALIST AESTHETIC",
    title: "TIMELESS STAPLES",
    description: "Premium French Terry essentials. Zero external logos. Absolute simplicity.",
    link: "/#minimal",
    cta: "Shop Minimal",
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
            <span className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-accent">
              {HERO_SLIDES[currentSlide].subtitle}
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tight leading-none">
              {HERO_SLIDES[currentSlide].title}
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-neutral-300 font-medium uppercase tracking-wider leading-relaxed">
              {HERO_SLIDES[currentSlide].description}
            </p>
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
            className={`h-1.5 transition-all duration-300 rounded-none ${
              currentSlide === idx ? "w-10 bg-accent" : "w-4 bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
export default Hero;
