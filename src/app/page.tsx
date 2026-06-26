"use client";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { Collections } from "@/components/sections/Collections";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { PromoImage } from "@/components/sections/PromoImage";
import { CampaignCollections } from "@/components/sections/CampaignCollections";
import { BestSellers } from "@/components/sections/BestSellers";
import { PromoBanner } from "@/components/sections/PromoBanner";
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

        {/* Categories Showcase (Mens, Womens, Accessories) */}
        <CategoryShowcase />

        {/* Promo Image Showcase */}
        <PromoImage />

        {/* Campaign Collections Showcase */}
        <CampaignCollections />

        {/* Best Sellers Segment */}
        <BestSellers />

        {/* Promo Statement */}
        <PromoBanner />
      </main>

      {/* Comprehensive brand Footer */}
      <Footer />
    </div>
  );
}
