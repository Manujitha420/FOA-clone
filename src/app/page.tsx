"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { Collections } from "@/components/sections/Collections";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Footer } from "@/components/layout/Footer";

export default function StorefrontPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Headers & Cart panels */}
      <Navbar />
      <CartDrawer />

      {/* Hero Slideshow */}
      <main className="flex-grow">
        <Hero />
        
        {/* Curated collection list cards */}
        <div id="collections">
          <Collections />
        </div>

        {/* Dynamic tabs + products grid */}
        <div id="men">
          <ProductsGrid />
        </div>

        {/* Promo Statement */}
        <PromoBanner />

        {/* Native Accordion FAQ segment */}
        <FaqAccordion />
      </main>

      {/* Comprehensive brand Footer */}
      <Footer />
    </div>
  );
}
