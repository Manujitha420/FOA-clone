"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Heart, ChevronLeft, ChevronRight, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ColorSwatch {
  name: string;
  hex: string;
}

interface NewCollectionProduct {
  id: string;
  title: string;
  priceLKR: number;
  colors: ColorSwatch[];
  image: string;
  installments: {
    mintpay: string;
    koko: string;
  };
}

const NEW_COLLECTION_PRODUCTS: NewCollectionProduct[] = [
  {
    id: "neo-utility-short",
    title: "NEO UTILITY SHORT",
    priceLKR: 4500,
    colors: [
      { name: "Navy", hex: "#2b3c5a" },
      { name: "Black", hex: "#151515" }
    ],
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,500.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,500.00 with"
    }
  },
  {
    id: "flux-jogger",
    title: "FLUX JOGGER",
    priceLKR: 4800,
    colors: [
      { name: "Black", hex: "#151515" },
      { name: "Beige", hex: "#dcd6cd" },
      { name: "Navy", hex: "#2b3c5a" },
      { name: "Charcoal", hex: "#4b5563" }
    ],
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,600.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,600.00 with"
    }
  },
  {
    id: "flux-oversize-tee",
    title: "FLUX OVERSIZE TEE",
    priceLKR: 4800,
    colors: [
      { name: "Navy", hex: "#2b3c5a" },
      { name: "Beige", hex: "#dcd6cd" },
      { name: "Maroon", hex: "#7f1d1d" },
      { name: "Grey", hex: "#4b5563" }
    ],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,600.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,600.00 with"
    }
  },
  {
    id: "aero-tank-top",
    title: "AERO TANK TOP",
    priceLKR: 2800,
    colors: [
      { name: "Charcoal", hex: "#374151" },
      { name: "Red/Stripe", hex: "#b91c1c" }
    ],
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 933.33 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 933.33 with"
    }
  },
  {
    id: "core-mens-tee",
    title: "CORE MENS TEE",
    priceLKR: 3200,
    colors: [
      { name: "Black", hex: "#151515" },
      { name: "White", hex: "#ffffff" }
    ],
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,066.67 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,066.67 with"
    }
  },
  {
    id: "urban-cargo-shorts",
    title: "URBAN CARGO SHORTS",
    priceLKR: 4500,
    colors: [
      { name: "Khaki", hex: "#c2b280" },
      { name: "Olive", hex: "#3f493a" }
    ],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,500.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,500.00 with"
    }
  }
];

export const Collections: React.FC = () => {
  const { addToCart, currency } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState<NewCollectionProduct | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, NEW_COLLECTION_PRODUCTS.length - visibleItems)
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectColor = (productId: string, colorHex: string) => {
    setActiveColors((prev) => ({
      ...prev,
      [productId]: colorHex
    }));
  };

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `Rs ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${(price / 300).toFixed(2)}`;
  };

  return (
    <section 
      className="py-24 px-6 mx-auto bg-background relative"
      style={{
        width: "100%",
        maxWidth: "1800px",
        minHeight: "1390px"
      }}
    >
      {/* Section Header */}
      <div className="text-left mb-12">
        <h2
          style={{
            color: "#151515",
            display: "inline-block",
            fontFamily: "Prompt, sans-serif",
            fontSize: "40px",
            fontWeight: 600,
            lineHeight: "48px",
            textDecoration: "underline",
            textUnderlineOffset: "8px",
          }}
        >
          NEW COLLECTION
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
          <p
            style={{
              color: "#151515",
              fontFamily: "Prompt, sans-serif",
              fontSize: "14px",
              fontWeight: 300,
            }}
          >
            Shop till you drop!
          </p>
          <Link
            href="#men"
            className="relative pb-1 group block"
            style={{
              color: "#151515",
              fontFamily: "Prompt, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Shop New Collection
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-300" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#151515] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group/carousel px-4">
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-[-15px] top-[40%] -translate-y-1/2 z-10 w-11 h-11 bg-white border border-neutral-100 rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Previous items"
          >
            <ChevronLeft className="h-6 w-6 text-[#151515]" />
          </button>
        )}

        {currentIndex < NEW_COLLECTION_PRODUCTS.length - visibleItems && (
          <button
            onClick={handleNext}
            className="absolute right-[-15px] top-[40%] -translate-y-1/2 z-10 w-11 h-11 bg-white border border-neutral-100 rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Next items"
          >
            <ChevronRight className="h-6 w-6 text-[#151515]" />
          </button>
        )}

        {/* Viewport wrapper */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: visibleItems === 4
                ? `translateX(-${currentIndex * (403 + 24)}px)`
                : `translateX(-${currentIndex * (100 / visibleItems + (visibleItems > 1 ? 0.75 : 0))}%)`
            }}
          >
            {NEW_COLLECTION_PRODUCTS.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const selectedColor = activeColors[product.id] || product.colors[0].hex;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 relative group p-3 border border-neutral-100 shadow-xs"
                  style={{
                    width: visibleItems === 4 ? "403px" : `calc((100% - ${(visibleItems - 1) * 24}px) / ${visibleItems})`,
                    height: visibleItems === 4 ? "835px" : "auto",
                    color: "#151515",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "17px",
                    fontWeight: 300,
                    lineHeight: "27.2px",
                    textAlign: "left"
                  }}
                >
                  {/* Image and upper controls */}
                  <div className="relative w-full bg-neutral-50 overflow-hidden mb-4" style={{ height: visibleItems === 4 ? "537px" : "auto", aspectRatio: visibleItems === 4 ? "auto" : "3/4" }}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Wishlist Button (Heart) */}
                    <div className="absolute top-5 right-5 z-20 group/heart">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="transition-transform duration-200 hover:scale-110 active:scale-95"
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`h-7 w-7 stroke-[1.2] transition-colors ${
                            isWishlisted ? "fill-red-500 text-red-500" : "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                          }`}
                        />
                      </button>

                      {/* Tooltip message */}
                      <div className="absolute right-0 top-full mt-2 hidden group-hover/heart:block bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded whitespace-nowrap shadow-md z-30">
                        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        <div className="absolute top-[-4px] right-3.5 w-2 h-2 bg-black rotate-45" />
                      </div>
                    </div>

                    {/* Quick View Slide Up Banner */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute bottom-0 left-0 right-0 bg-[#151515] text-white text-center py-3 text-[11px] font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hover:bg-neutral-800"
                    >
                      QUICK VIEW
                    </button>
                  </div>

                  {/* Product Metadata */}
                  <div className="flex-1 flex flex-col pt-1 text-left">
                    <h3
                      className="text-xs font-black uppercase tracking-wider line-clamp-1"
                      style={{
                        fontFamily: "Prompt",
                        color: "#151515",
                        fontSize: "15px",
                        fontWeight: "500",
                        lineHeight: "22.5px",
                        margin: "0px 0px 5px",
                        textAlign: "left",
                        textTransform: "uppercase"
                      }}
                    >
                      {product.title}
                    </h3>

                    {/* Price details */}
                    <div className="mt-2 mb-2">
                      <span
                        className="text-sm font-black"
                        style={{
                          color: "#151515",
                          display: "inline",
                          fontSize: "15px",
                          fontWeight: "700",
                          letterSpacing: "0.3px",
                          lineHeight: "15px",
                          textAlign: "left"
                        }}
                      >
                        {formattedPrice(product.priceLKR)}
                      </span>
                    </div>

                    {/* Mintpay Split info */}
                    <div
                      className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-0.5"
                      style={{
                        fontFamily: "Prompt, sans-serif",
                        letterSpacing: "0.3px",
                        lineHeight: "13px",
                        textAlign: "left"
                      }}
                    >
                      <span>{product.installments.mintpay}</span>
                      <a href="https://mintpay.lk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                        <img 
                          src="https://s3.amazonaws.com/bizenglish/wp-content/uploads/2022/10/28174525/Mintpay-Logo.jpg" 
                          alt="Mintpay" 
                          className="h-3.5 w-auto object-contain mix-blend-multiply"
                        />
                      </a>
                      <a href="https://mintpay.lk/education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10" 
                          alt="Info" 
                          className="h-3 w-3 object-contain"
                        />
                      </a>
                    </div>

                    {/* Koko Split info */}
                    <div
                      className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-3"
                      style={{
                        fontFamily: "Prompt, sans-serif",
                        letterSpacing: "0.3px",
                        lineHeight: "13px",
                        textAlign: "left"
                      }}
                    >
                      <span>{product.installments.koko}</span>
                      <a href="https://paykoko.com/customer-education?Amount=100" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                        <img 
                          src="https://qa-merchant.paykoko.com/assets/images/logo.png" 
                          alt="Koko" 
                          className="h-3.5 w-auto object-contain mix-blend-multiply"
                        />
                      </a>
                      <a href="https://paykoko.com/customer-education?Amount=1500.0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10" 
                          alt="Info" 
                          className="h-3 w-3 object-contain"
                        />
                      </a>
                    </div>

                    {/* Color Swatch Selectors */}
                    <div className="flex items-center space-x-2.5 mb-4">
                      {product.colors.map((color) => {
                        const isActive = selectedColor === color.hex;
                        const isRedStripe = color.name === "Red/Stripe";
                        return (
                          <button
                            key={color.name}
                            onClick={() => selectColor(product.id, color.hex)}
                            className={`w-7 h-7 flex items-center justify-center border transition-all relative ${
                              isActive ? "border-2 border-black" : "border border-neutral-200 hover:border-neutral-400"
                            }`}
                            aria-label={`Select ${color.name}`}
                            style={{ padding: "3px" }}
                          >
                            <span
                              className="w-full h-full block relative"
                              style={{ backgroundColor: isRedStripe ? "#e5e7eb" : color.hex }}
                            >
                              {isRedStripe && (
                                <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                  <span className="w-[150%] h-[1.5px] bg-[#ef4444] transform rotate-45 origin-center" />
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          title: product.title,
                          priceLKR: product.priceLKR,
                          priceUSD: product.priceLKR / 300,
                          image: product.image,
                          selectedSize: "M",
                        })
                      }
                      className="mt-auto w-fit bg-black text-white hover:bg-neutral-800 transition-all uppercase font-bold text-[13px] py-3 px-8 tracking-wider rounded-[50px] shadow-sm hover:shadow-md"
                      style={{
                        fontFamily: "Prompt, sans-serif",
                        lineHeight: "18px",
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl bg-white z-55 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[85vh] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-neutral-800 hover:text-black p-1 z-10"
                aria-label="Close details"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Left Column - Image */}
              <div className="relative w-full md:w-1/2 aspect-[3/4] bg-neutral-50 overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>

              {/* Right Column - Details */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-widest text-[#151515] uppercase">
                    New Collection Drop
                  </span>
                  <h3
                    className="text-lg md:text-xl font-black uppercase tracking-wider leading-snug"
                    style={{ fontFamily: "Prompt, sans-serif", color: "#151515" }}
                  >
                    {selectedProduct.title}
                  </h3>

                  <div className="flex items-center space-x-3 text-lg font-black">
                    <span style={{ fontFamily: "Prompt, sans-serif", color: "#151515" }}>
                      {formattedPrice(selectedProduct.priceLKR)}
                    </span>
                  </div>

                  <p
                    className="text-xs text-neutral-500 font-semibold uppercase tracking-wider leading-relaxed"
                    style={{ fontFamily: "Prompt, sans-serif" }}
                  >
                    Experience extreme comfort with this release. Part of our new drop featuring premium fabrics, double stitched details and comfort aesthetics.
                  </p>

                  <div className="space-y-2 pt-2">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest text-neutral-400"
                      style={{ fontFamily: "Prompt, sans-serif" }}
                    >
                      Sizes Available
                    </span>
                    <div className="flex gap-2">
                      {["S", "M", "L", "XL"].map((size) => (
                        <span
                          key={size}
                          className="border border-neutral-300 px-3 py-1.5 text-xs font-black tracking-widest bg-neutral-50"
                          style={{ fontFamily: "Prompt, sans-serif" }}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 mt-6 space-y-3">
                  <button
                    className="w-full bg-[#151515] text-white hover:bg-neutral-800 transition-colors uppercase font-black text-xs py-3.5 text-center tracking-widest flex items-center justify-center gap-2"
                    style={{ fontFamily: "Prompt, sans-serif" }}
                    onClick={() => {
                      addToCart({
                        id: selectedProduct.id,
                        title: selectedProduct.title,
                        priceLKR: selectedProduct.priceLKR,
                        priceUSD: selectedProduct.priceLKR / 300,
                        image: selectedProduct.image,
                        selectedSize: "M",
                      });
                      setSelectedProduct(null);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add To Shopping Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Collections;
