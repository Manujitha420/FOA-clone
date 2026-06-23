"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Plus, ShoppingBag, X } from "lucide-react";

export const ProductsGrid: React.FC = () => {
  const { addToCart, currency } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<Product["category"]>("men");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => p.category === activeTab);

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
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-100 dark:border-neutral-900 bg-background">
      {/* Category Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-black tracking-[0.25em] text-accent uppercase">
            STREET DROPS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wider mt-1">
            Featured Products
          </h2>
        </div>

        <div className="flex space-x-2 border-b border-neutral-100 dark:border-neutral-850 pb-1 w-full md:w-auto overflow-x-auto">
          {(["men", "women", "accessories", "footwear", "sale"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
            >
              {tab === "sale" ? "On Sale" : `${tab}'s collection`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            id={product.id}
            className="group flex flex-col h-full bg-white dark:bg-neutral-950 p-3 border border-neutral-100 dark:border-neutral-900 shadow-xs relative"
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Box */}
            <div className="relative aspect-[3/4] w-full bg-neutral-50 dark:bg-neutral-900 overflow-hidden mb-4">
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
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-[10px] font-black h-9 flex items-center justify-center gap-1.5"
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
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0 flex items-center justify-center bg-white/95 dark:bg-black/95 text-foreground hover:bg-foreground hover:text-background"
                  onClick={() => setSelectedProduct(product)}
                  aria-label="Quick View"
                >
                  <Eye className="h-4 w-4" />
                </Button>
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
                <h3 className="text-xs font-black uppercase tracking-wider line-clamp-1">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-black text-foreground">
                  {formattedPrice(currency === "LKR" ? product.priceLKR : product.priceUSD)}
                </span>
                {product.originalPriceLKR && product.originalPriceUSD && (
                  <span className="text-xs text-muted-foreground line-through font-medium">
                    {formattedPrice(currency === "LKR" ? product.originalPriceLKR : product.originalPriceUSD)}
                  </span>
                )}
              </div>

              {/* Koko Installments badge (light Mode) */}
              {currency === "LKR" && (
                <div className="mt-3 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 border border-emerald-100 dark:border-emerald-900/30 w-fit">
                  3 payments of {getKokoSplits(product.priceLKR)} with Koko
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Dialog Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-neutral-900/60 z-50 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl bg-white dark:bg-neutral-950 z-55 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-foreground/80 hover:text-foreground p-1"
                aria-label="Close details"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Left Column - Image */}
              <div className="relative w-full md:w-1/2 aspect-[3/4] bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
                <Image
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>

              {/* Right Column - Details */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                    {selectedProduct.category}'s wear
                  </span>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-wider leading-snug">
                    {selectedProduct.title}
                  </h3>

                  <div className="flex items-center space-x-3 text-lg font-black">
                    <span>
                      {formattedPrice(
                        currency === "LKR" ? selectedProduct.priceLKR : selectedProduct.priceUSD
                      )}
                    </span>
                    {selectedProduct.originalPriceLKR && selectedProduct.originalPriceUSD && (
                      <span className="text-sm text-muted-foreground line-through font-medium">
                        {formattedPrice(
                          currency === "LKR"
                            ? selectedProduct.originalPriceLKR
                            : selectedProduct.originalPriceUSD
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Sizes Available
                    </span>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <span
                          key={size}
                          className="border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-black tracking-widest bg-neutral-50 dark:bg-neutral-900"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 mt-6 space-y-3">
                  <Button
                    variant="primary"
                    className="w-full text-xs font-black flex items-center justify-center gap-2"
                    onClick={() => {
                      addToCart({
                        id: selectedProduct.id,
                        title: selectedProduct.title,
                        priceLKR: selectedProduct.priceLKR,
                        priceUSD: selectedProduct.priceUSD,
                        originalPriceLKR: selectedProduct.originalPriceLKR,
                        originalPriceUSD: selectedProduct.originalPriceUSD,
                        image: selectedProduct.images[0],
                        selectedSize: selectedProduct.sizes[0],
                      });
                      setSelectedProduct(null);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add To Shopping Cart
                  </Button>
                  <Link href={`/products/${selectedProduct.id}`} className="block">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-black"
                      onClick={() => setSelectedProduct(null)}
                    >
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
export default ProductsGrid;
