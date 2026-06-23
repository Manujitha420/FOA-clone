"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const { addToCart, currency } = useCart();
  const [searchVal, setSearchVal] = useState("");

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `Rs ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const popularSearches = ["SHOES", "TEES", "NEW COLLECTION", "FOOTWEAR", "BAGS"];

  const trendingProducts = [
    {
      id: "foa-boxer-briefs",
      title: "F.O.A BOXER BRIEFS",
      priceLKR: 1500,
      priceUSD: 5,
      image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600&auto=format&fit=crop",
      colors: [
        { code: "#111111", available: true },
        { code: "#b83b3b", available: false },
        { code: "#1e293b", available: true },
      ]
    },
    {
      id: "foa-crossbody-bag-2",
      title: "CROSSBODY BAG 2.0",
      priceLKR: 2450,
      priceUSD: 8,
      originalPriceLKR: 3500,
      originalPriceUSD: 12,
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
      colors: [
        { code: "#737373", available: false },
        { code: "#b45309", available: true },
        { code: "#475569", available: true },
      ]
    }
  ];

  const handleAddProduct = (item: typeof trendingProducts[0]) => {
    addToCart({
      id: item.id,
      title: item.title,
      priceLKR: item.priceLKR,
      priceUSD: item.priceUSD,
      image: item.image,
      selectedSize: "M",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 bottom-0 right-0 w-[460px] max-w-[95vw] bg-white text-[#111111] z-55 flex flex-col shadow-2xl p-6 overflow-y-auto"
          >
            {/* Search Input Box */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-8">
              <div className="flex-1 flex items-center relative">
                <input
                  type="text"
                  placeholder="Search for anything"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full text-neutral-800 placeholder-neutral-400 text-sm font-sans tracking-wide outline-none border-none pr-8"
                  autoFocus
                />
              </div>
              <button onClick={onClose} className="text-neutral-800 hover:opacity-75 transition-opacity pl-4">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Popular Searches */}
            <div className="space-y-3 mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchVal(term);
                    }}
                    className="border border-neutral-200 hover:border-black rounded-full px-4 py-1.5 text-[9px] font-black tracking-widest text-[#111111] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Now */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                Trending Now
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {trendingProducts.map((item) => (
                  <div key={item.id} className="flex flex-col space-y-2 pb-4">
                    {/* Image box */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                      {item.originalPriceLKR && (
                        <span className="absolute top-2 left-2 bg-black text-white text-[8px] font-black uppercase px-2 py-0.5 tracking-widest">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-[10px] font-black tracking-wider uppercase text-[#111111] line-clamp-1">
                      {item.title}
                    </h4>

                    {/* Pricing */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-black text-neutral-800">
                        {formattedPrice(currency === "LKR" ? item.priceLKR : item.priceUSD)}
                      </span>
                      {item.originalPriceLKR && item.originalPriceUSD && (
                        <span className="text-[9px] text-neutral-400 line-through font-medium">
                          {formattedPrice(currency === "LKR" ? item.originalPriceLKR : item.originalPriceUSD)}
                        </span>
                      )}
                    </div>

                    {/* Installments info */}
                    {currency === "LKR" && (
                      <p className="text-[8px] text-neutral-500 leading-normal font-semibold">
                        3 X Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} or 4.5% Cashback with{" "}
                        <span className="font-bold text-sky-600">mintpay</span> or pay in 3 X Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with{" "}
                        <span className="font-bold text-indigo-600">KOKO</span>
                      </p>
                    )}

                    {/* Color Swatches */}
                    <div className="flex space-x-1.5 py-1">
                      {item.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="h-4.5 w-4.5 rounded-none border border-neutral-300 flex items-center justify-center cursor-pointer p-0.5 relative"
                        >
                          <span
                            className="h-full w-full block"
                            style={{ backgroundColor: color.code }}
                          />
                          {!color.available && (
                            <span className="absolute inset-0 bg-neutral-200/50 flex items-center justify-center">
                              <span className="w-[1px] h-full bg-red-600 rotate-45 transform origin-center absolute" />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add to Cart button */}
                    <button
                      onClick={() => handleAddProduct(item)}
                      className="w-full py-2 bg-[#111111] hover:bg-neutral-800 text-white text-[8px] font-black uppercase tracking-wider rounded-full transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default SearchDrawer;
