"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

const COLLECTIONS = [
  {
    id: "men",
    title: "Men's Streetwear",
    tagline: "BOLD & FUNCTIONAL",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
    link: "#men",
  },
  {
    id: "women",
    title: "Women's Activewear",
    tagline: "COMPRESSIVE MOVEMENT",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    link: "#women",
  },
  {
    id: "minimal",
    title: "Minimal Basics",
    tagline: "TIMELESS STAPLES",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    link: "#minimal",
  },
  {
    id: "accessories",
    title: "Aesthetic Gear",
    tagline: "UTILITY ACCESSORIES",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    link: "#accessories",
  },
];

export const Collections: React.FC = () => {
  const handleScroll = (selector: string) => {
    const el = document.getElementById(selector.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-background">
      <div className="text-left mb-16 space-y-3">
        <h2
          style={{
            color: "#151515",
            display: "inline",
            fontFamily: "Prompt, sans-serif",
            fontSize: "40px",
            fontWeight: 600,
            lineHeight: "48px",
            textDecoration: "underline",
          }}
        >
          NEW COLLECTION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLLECTIONS.map((col, idx) => (
          <motion.div
            key={col.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={idx}
            onClick={() => handleScroll(col.link)}
            className="group relative h-[450px] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {/* Background Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${col.image})` }}
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20 group-hover:from-black/90 transition-colors duration-300" />

            {/* Label Details */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-black tracking-[0.2em] text-accent mb-1">
                {col.tagline}
              </span>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black tracking-wider uppercase">{col.title}</h3>
                <div className="p-2 bg-white/10 group-hover:bg-accent group-hover:text-white rounded-full transition-all duration-300 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Collections;
