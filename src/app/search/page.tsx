"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Search, Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const { addToCart, currency } = useCart();
  const [query, setQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredProducts = query
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `LKR ${price.toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getKokoSplits = (price: number) => {
    const split = price / 3;
    return `LKR ${split.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between pt-32">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-12">
          <Link href="/" className="hover:text-black transition-colors underline underline-offset-4">
            Home
          </Link>{" "}
          <span className="mx-2">/</span> Search
        </div>

        {/* Header Title */}
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-[#111111]">
            Search Results
          </h1>

          {/* Centered Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for anything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3.5 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          </div>
        </div>

        {/* Results Area */}
        {query && (
          <div className="space-y-8">
            <div className="border-b border-neutral-100 pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Result" : "Results"} found for "{query}"
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col h-full bg-white p-3 border border-neutral-100 shadow-xs relative"
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden mb-4">
                      <Link href={`/products/${product.id}`}>
                        {/* Primary Image */}
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className={`object-cover transition-opacity duration-500 ${
                            hoveredCard === product.id && product.images[1] ? "opacity-0" : "opacity-100"
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Secondary Hover Image */}
                        {product.images[1] && (
                          <Image
                            src={product.images[1]}
                            alt={`${product.title} Alternate`}
                            fill
                            className={`object-cover absolute inset-0 transition-opacity duration-500 ${
                              hoveredCard === product.id ? "opacity-100" : "opacity-0"
                            }`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        )}
                      </Link>

                      {/* Action Buttons overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex space-x-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          className="flex-1 py-2 bg-[#111111] hover:bg-neutral-800 text-white text-[10px] font-black uppercase tracking-wider rounded-none flex items-center justify-center gap-1.5"
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              title: product.title,
                              priceLKR: product.priceLKR,
                              priceUSD: product.priceUSD,
                              originalPriceLKR: product.originalPriceLKR,
                              originalPriceUSD: product.originalPriceUSD,
                              image: product.images[0],
                              selectedSize: product.sizes[0],
                            })
                          }
                        >
                          <Plus className="h-3 w-3" /> Add
                        </button>
                        <Link
                          href={`/products/${product.id}`}
                          className="h-9 w-9 border border-neutral-300 bg-white text-[#111111] hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                          aria-label="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>

                      {/* Sale Tag */}
                      {product.originalPriceLKR && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Title & Pricing */}
                    <div className="flex-1 flex flex-col pt-1">
                      <Link href={`/products/${product.id}`} className="hover:opacity-75 transition-opacity">
                        <h3 className="text-xs font-black uppercase tracking-wider line-clamp-1 text-[#111111]">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm font-black text-[#111111]">
                          {formattedPrice(currency === "LKR" ? product.priceLKR : product.priceUSD)}
                        </span>
                        {product.originalPriceLKR && product.originalPriceUSD && (
                          <span className="text-xs text-neutral-400 line-through font-medium">
                            {formattedPrice(currency === "LKR" ? product.originalPriceLKR : product.originalPriceUSD)}
                          </span>
                        )}
                      </div>

                      {/* Koko Installments badge */}
                      {currency === "LKR" && (
                        <div className="mt-3 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 border border-emerald-100 w-fit">
                          3 payments of {getKokoSplits(product.priceLKR)} with Koko
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-neutral-400 text-sm font-semibold tracking-wider uppercase">
                No matching collections or products found.
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
