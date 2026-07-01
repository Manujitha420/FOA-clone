"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Heart, SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  title: string;
  priceLKR: number;
  priceUSD: number;
  image: string;
  categories: string[];
  sizes: string[];
  badge?: string;
  bestSellerOrder: number; // for best selling sort
  dateAdded: number; // timestamp
}

const PRODUCTS: Product[] = [
  {
    id: "foa-neo-utility-short",
    title: "NEO UTILITY SHORT",
    priceLKR: 4500,
    priceUSD: 15,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "New Collection"],
    sizes: ["L", "XL", "30", "32", "34"],
    badge: "30% OFF",
    bestSellerOrder: 2,
    dateAdded: 1688000000,
  },
  {
    id: "foa-flux-jogger",
    title: "FLUX JOGGER",
    priceLKR: 4800,
    priceUSD: 16,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "New Collection", "Trending"],
    sizes: ["L", "XL", "2XL", "32", "34", "36"],
    bestSellerOrder: 1,
    dateAdded: 1689000000,
  },
  {
    id: "foa-flux-oversize-tee",
    title: "FLUX OVERSIZE TEE",
    priceLKR: 4800,
    priceUSD: 16,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "New Collection", "Trending"],
    sizes: ["L", "XL", "ONE SIZE"],
    bestSellerOrder: 3,
    dateAdded: 1690000000,
  },
  {
    id: "foa-aero-tank-top",
    title: "AERO TANK TOP",
    priceLKR: 2800,
    priceUSD: 9,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "Trending"],
    sizes: ["L", "XL", "2XL"],
    bestSellerOrder: 4,
    dateAdded: 1687000000,
  },
  {
    id: "foa-core-mens-tee",
    title: "CORE MENS TEE",
    priceLKR: 3200,
    priceUSD: 10.5,
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600&auto=format&fit=crop",
    categories: ["Men"],
    sizes: ["L", "XL", "ONE SIZE"],
    bestSellerOrder: 5,
    dateAdded: 1686000000,
  },
  {
    id: "foa-freedom-oversized-tee",
    title: 'FOA "Freedom" Oversized Tee',
    priceLKR: 4200,
    priceUSD: 14,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "New Collection", "Trending"],
    sizes: ["L", "XL", "ONE SIZE"],
    badge: "30% OFF",
    bestSellerOrder: 6,
    dateAdded: 1691000000,
  },
  {
    id: "foa-carbon-utility-cargo",
    title: "FOA Carbon Utility Cargo Pants",
    priceLKR: 7500,
    priceUSD: 25,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "New Collection"],
    sizes: ["30", "32", "34", "36"],
    bestSellerOrder: 7,
    dateAdded: 1692000000,
  },
  {
    id: "foa-crossbody-bag-black",
    title: "FOA Technical Crossbody Bag",
    priceLKR: 4500,
    priceUSD: 15,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
    categories: ["Trending", "Women"],
    sizes: ["ONE SIZE"],
    badge: "SALE",
    bestSellerOrder: 8,
    dateAdded: 1685000000,
  },
  {
    id: "foa-unchained-tee",
    title: "UNCHAINED TEE",
    priceLKR: 5200,
    priceUSD: 17.5,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "Trending"],
    sizes: ["L", "XL", "2XL"],
    bestSellerOrder: 9,
    dateAdded: 1684000000,
  },
  {
    id: "foa-linear-tee",
    title: "LINEAR TEE",
    priceLKR: 4500,
    priceUSD: 15,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    categories: ["Men"],
    sizes: ["L", "XL"],
    bestSellerOrder: 10,
    dateAdded: 1683000000,
  },
  {
    id: "foa-unisex-hoodie",
    title: "UNISEX STREETWEAR HOODIE",
    priceLKR: 6500,
    priceUSD: 22,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "Women", "Trending"],
    sizes: ["L", "XL", "2XL", "1L"],
    bestSellerOrder: 11,
    dateAdded: 1693000000,
  },
  {
    id: "foa-sliders",
    title: "FOA SLIDERS",
    priceLKR: 3500,
    priceUSD: 11.5,
    image: "https://images.unsplash.com/photo-1603808033192-082d6f74b30d?q=80&w=600&auto=format&fit=crop",
    categories: ["Men", "Women"],
    sizes: ["ONE SIZE"],
    bestSellerOrder: 12,
    dateAdded: 1682000000,
  },
  {
    id: "foa-water-bottle",
    title: "FOA Matte Black Water Bottle",
    priceLKR: 5500,
    priceUSD: 18.5,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    categories: ["Trending", "Women"],
    sizes: ["ONE SIZE"],
    bestSellerOrder: 13,
    dateAdded: 1681000000,
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "most-relevant", label: "Most relevant" },
  { value: "best-selling", label: "Best selling" },
  { value: "alphabetical-az", label: "Alphabetically, A-Z" },
  { value: "alphabetical-za", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "date-asc", label: "Date, old to new" },
  { value: "date-desc", label: "Date, new to old" },
];

export default function MensPage() {
  const { addToCart, currency, setQuickViewProduct } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inlineSortOpen, setInlineSortOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(7500);
  const [selectedSort, setSelectedSort] = useState<string>("best-selling");

  // Temporary/Staged states inside Drawer (applied only when clicking "APPLY")
  const [stagedCategories, setStagedCategories] = useState<string[]>([]);
  const [stagedSizes, setStagedSizes] = useState<string[]>([]);
  const [stagedMinPrice, setStagedMinPrice] = useState<number>(0);
  const [stagedMaxPrice, setStagedMaxPrice] = useState<number>(7500);
  const [stagedSort, setStagedSort] = useState<string>("best-selling");

  // Drawer collapsible states
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [sizeExpanded, setSizeExpanded] = useState(true);

  // Other Collections Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const collectionsScrollRef = useRef<HTMLDivElement>(null);

  const inlineSortRef = useRef<HTMLDivElement>(null);
  const inlineSortBtnRef = useRef<HTMLButtonElement>(null);

  // Sync staged state when drawer opens
  useEffect(() => {
    if (drawerOpen) {
      setStagedCategories(selectedCategories);
      setStagedSizes(selectedSizes);
      setStagedMinPrice(minPrice);
      setStagedMaxPrice(maxPrice);
      setStagedSort(selectedSort);
    }
  }, [drawerOpen, selectedCategories, selectedSizes, minPrice, maxPrice, selectedSort]);

  // Click outside listener for inline sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inlineSortRef.current && !inlineSortRef.current.contains(event.target as Node) &&
        inlineSortBtnRef.current && !inlineSortBtnRef.current.contains(event.target as Node)
      ) {
        setInlineSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    setSelectedCategories(stagedCategories);
    setSelectedSizes(stagedSizes);
    setMinPrice(stagedMinPrice);
    setMaxPrice(stagedMaxPrice);
    setSelectedSort(stagedSort);
    setDrawerOpen(false);
  };

  const handleCategoryToggle = (category: string) => {
    if (stagedCategories.includes(category)) {
      setStagedCategories(stagedCategories.filter((c) => c !== category));
    } else {
      setStagedCategories([...stagedCategories, category]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (stagedSizes.includes(size)) {
      setStagedSizes(stagedSizes.filter((s) => s !== size));
    } else {
      setStagedSizes([...stagedSizes, size]);
    }
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Get active products based on filters
  const getFilteredProducts = () => {
    let filtered = [...PRODUCTS];

    // Filter by Category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        p.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    // Filter by Size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((sz) => selectedSizes.includes(sz))
      );
    }

    // Filter by Price
    filtered = filtered.filter((p) => p.priceLKR >= minPrice && p.priceLKR <= maxPrice);

    // Apply Sorting
    switch (selectedSort) {
      case "featured":
      case "most-relevant":
        // Keep initial ordering
        break;
      case "best-selling":
        filtered.sort((a, b) => a.bestSellerOrder - b.bestSellerOrder);
        break;
      case "alphabetical-az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alphabetical-za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.priceLKR - b.priceLKR);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.priceLKR - a.priceLKR);
        break;
      case "date-asc":
        filtered.sort((a, b) => a.dateAdded - b.dateAdded);
        break;
      case "date-desc":
        filtered.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `Rs ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${(price / 300).toFixed(2)}`; // Simple mock conversion
  };

  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === selectedSort)?.label || "Best selling";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <CartDrawer />

      {/* Hero Banner Header - cleared for fixed navbar height */}
      <div className="relative w-full h-[340px] md:h-[440px] overflow-hidden bg-neutral-100 flex flex-col items-center justify-center pt-[120px] pb-6">
        <Image
          src="https://foaclothing.com/cdn/shop/collections/MENS_HEADER.png?v=1762938472"
          alt="Mens Banner"
          fill
          priority
          className="object-cover object-[center_30%] opacity-100 brightness-75 select-none"
        />
        <div className="absolute inset-0 bg-black/15" />

        {/* Lowered Breadcrumbs aligned to top left, offset to clear fixed navbar */}
        <div 
          className="absolute top-[135px] left-0 z-20 flex items-center space-x-1.5"
          style={{
            color: "#fff",
            display: "inline-flex",
            fontFamily: "Prompt, sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            lineHeight: "19.2px",
            padding: "20px 50px",
            textAlign: "left"
          }}
        >
          <Link href="/" className="hover:text-neutral-300 transition-colors">Home</Link>
          <span className="text-white/60">/</span>
          <Link href="/" className="hover:text-neutral-300 transition-colors">Shop</Link>
          <span className="text-white/60">/</span>
          <span className="text-white">Mens</span>
        </div>

        {/* Vertically centered title */}
        <div className="relative z-10 w-full text-center text-white px-4 select-none mt-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white">
            Mens
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full flex-grow">
        {/* Filter bar */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-8">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center space-x-2.5 text-[11px] font-black uppercase tracking-[0.25em] text-neutral-800 hover:text-black transition-colors cursor-pointer group"
          >
            <SlidersHorizontal className="h-4 w-4 stroke-[2.5]" />
            <span>Filter and Sort</span>
          </button>

          <div className="flex items-center space-x-6">
            {/* Sort Dropdown Selector */}
            <div className="relative">
              <button
                ref={inlineSortBtnRef}
                onClick={() => setInlineSortOpen(!inlineSortOpen)}
                className="flex items-center space-x-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-850 hover:text-black transition-colors cursor-pointer"
              >
                <span>{currentSortLabel}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${inlineSortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {inlineSortOpen && (
                  <motion.div
                    ref={inlineSortRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-48 bg-[#4a4a4a]/70 backdrop-blur-md text-white rounded-xl shadow-xl py-2 z-50 border border-white/10 select-none overflow-hidden"
                  >
                    <div className="flex flex-col space-y-0.5">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSelectedSort(opt.value);
                            setInlineSortOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors flex items-center hover:bg-white/10 ${selectedSort === opt.value ? "text-white" : "text-neutral-300"
                            }`}
                        >
                          <span className="w-4 inline-block text-left text-[10px]">
                            {selectedSort === opt.value ? "✓" : ""}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* Bottom chevron indicator */}
                    <div className="w-full flex justify-center pt-1 opacity-60">
                      <ChevronDown className="h-3 w-3 text-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              {filteredProducts.length} Products
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-bold uppercase tracking-wider text-xs">
              No products match your filter options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => {
              const inWishlist = wishlist.includes(product.id);
              return (
                <div key={product.id} className="group flex flex-col space-y-4 relative">
                  <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden shadow-xs">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/70 hover:bg-white text-black hover:text-red-500 rounded-full transition-colors z-20 shadow-xs cursor-pointer"
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`h-4.5 w-4.5 ${inWishlist ? "fill-red-500 text-red-500" : "text-black"}`} />
                    </button>

                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm z-10">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View overlay button - instant hover representation */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 flex items-end p-3">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="w-full bg-black/80 hover:bg-black text-white py-3.5 text-[10px] font-black uppercase tracking-widest cursor-pointer shadow-md select-none rounded-none text-center"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black tracking-wider uppercase text-[#111111]">
                      {product.title}
                    </h4>
                    <p className="text-[11px] font-black text-neutral-800">
                      {formattedPrice(product.priceLKR)}
                    </p>

                    {/* Mintpay installment image details */}
                    <div className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-0.5">
                      <span>3 x Rs {Math.round(product.priceLKR / 3).toLocaleString()} or 4.5% Cashback with</span>
                      <a href="https://mintpay.lk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                        <img
                          src="https://s3.amazonaws.com/bizenglish/wp-content/uploads/2022/10/28174525/Mintpay-Logo.jpg"
                          alt="Mintpay"
                          className="h-3 w-auto object-contain mix-blend-multiply"
                        />
                      </a>
                      <a href="https://mintpay.lk/education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                          alt="Info"
                          className="h-2.5 w-2.5 object-contain"
                        />
                      </a>
                    </div>

                    {/* Koko installment image details */}
                    <div className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider">
                      <span>or pay in 3 x Rs {Math.round(product.priceLKR / 3).toLocaleString()} with</span>
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
                          className="h-2.5 w-2.5 object-contain"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Other Collections Section - exactly 1500px wide, 363px high */}
      <section className="mt-24 pt-10 border-t border-neutral-100 select-none mx-auto w-[1500px] max-w-full h-[363px] flex flex-col justify-between px-4 md:px-8">
        <div>
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[#111111]">
            Other Collections
          </h2>
        </div>

        {/* Slider Container with Navigation Arrow Buttons */}
        <div className="relative group px-1">
          {/* Left navigation arrow key - visible only on hover */}
          <button 
            onClick={() => {
              const el = collectionsScrollRef.current;
              if (el) {
                const itemWidth = 504;
                const currentScroll = el.scrollLeft;
                let targetScroll = (Math.round(currentScroll / itemWidth) - 1) * itemWidth;
                if (targetScroll <= 50) {
                  targetScroll = 0;
                }
                el.scrollTo({ left: targetScroll, behavior: "smooth" });
              }
            }}
            className="absolute left-2 top-[115px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black shadow-lg flex items-center justify-center border border-neutral-100 hover:bg-neutral-50 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer select-none"
            aria-label="Scroll left"
          >
            <span className="text-lg font-bold">←</span>
          </button>

          {/* Scrollable Row */}
          <div 
            ref={collectionsScrollRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const maxScroll = el.scrollWidth - el.clientWidth;
              if (maxScroll > 0) {
                setScrollProgress(el.scrollLeft / maxScroll);
              }
            }}
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {[
              {
                name: "DRESSES",
                images: [
                  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1539008885759-4d69352e46cf?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1618932260643-eee4a2f6c9d6?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "PANTS",
                images: [
                  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "FOOTWEAR",
                images: [
                  "https://images.unsplash.com/photo-1603808033192-082d6f74b30d?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "TOPS",
                images: [
                  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "TEES",
                images: [
                  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "ACCESSORIES",
                images: [
                  "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "SHIRTS",
                images: [
                  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=200&auto=format&fit=crop"
                ]
              },
              {
                name: "HOODIES",
                images: [
                  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1609709295948-17d775c40974?q=80&w=200&auto=format&fit=crop"
                ]
              }
            ].map((col) => (
              <div 
                key={col.name} 
                className="flex-shrink-0 flex flex-col space-y-3 w-[480px] h-[270px]"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Images row spanning full width of the card */}
                <div className="flex space-x-2 h-[230px] w-full">
                  {col.images.map((img, idx) => (
                    <div key={idx} className="relative flex-1 h-full bg-neutral-50 overflow-hidden shadow-xs border border-neutral-100">
                      <Image
                        src={img}
                        alt={`${col.name}-${idx}`}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  ))}
                </div>
                {/* Label and arrow row */}
                <div className="flex items-center justify-between pt-1 border-t border-neutral-50">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#111111]">
                    {col.name}
                  </span>
                  <span className="text-sm font-bold text-[#111111] pr-2">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right navigation arrow key - visible only on hover */}
          <button 
            onClick={() => {
              const el = collectionsScrollRef.current;
              if (el) {
                const itemWidth = 504;
                const currentScroll = el.scrollLeft;
                const maxScroll = el.scrollWidth - el.clientWidth;
                let targetScroll = (Math.round(currentScroll / itemWidth) + 1) * itemWidth;
                if (targetScroll >= maxScroll - 50) {
                  targetScroll = maxScroll;
                }
                el.scrollTo({ left: targetScroll, behavior: "smooth" });
              }
            }}
            className="absolute right-2 top-[115px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black shadow-lg flex items-center justify-center border border-neutral-100 hover:bg-neutral-50 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer select-none"
            aria-label="Scroll right"
          >
            <span className="text-lg font-bold">→</span>
          </button>
        </div>

        {/* Progress Indicator line: exactly 1500px width, 1px height */}
        <div className="flex justify-center items-center w-full select-none pb-2 overflow-x-hidden">
          <div className="relative w-[1500px] max-w-full h-[1px] bg-neutral-200">
            <div 
              className="absolute top-0 left-0 h-full bg-black transition-all duration-75 rounded-full"
              style={{
                width: `${scrollProgress * 100}%`
              }}
            />
            {/* 5 dividers */}
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-1.5 w-[1px] bg-neutral-350 -translate-y-[2.5px]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Slide in Filter Drawer from Left */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Drawer body */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-[360px] bg-white z-50 shadow-2xl flex flex-col h-full text-neutral-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 flex-shrink-0">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111111]">
                    Filter and Sort
                  </h3>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5 block">
                    {filteredProducts.length} Products
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Filter Options */}
              <div className="flex-grow overflow-y-auto px-6 py-4 space-y-8 select-none">

                {/* Categories Accordion */}
                <div className="space-y-4">
                  <button
                    onClick={() => setCategoryExpanded(!categoryExpanded)}
                    className="w-full text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900 pb-2 border-b border-neutral-100 flex items-center space-x-2.5 cursor-pointer"
                  >
                    <span className="text-sm font-semibold w-4 text-center">{categoryExpanded ? "—" : "+"}</span>
                    <span>Product Category</span>
                  </button>

                  {categoryExpanded && (
                    <div className="space-y-3 pt-1">
                      {["Men", "New Collection", "Trending", "Women"].map((cat) => {
                        const count = PRODUCTS.filter((p) => p.categories.includes(cat)).length;
                        const isChecked = stagedCategories.includes(cat);
                        return (
                          <label key={cat} className="flex items-center justify-between text-xs font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCategoryToggle(cat)}
                                className="h-4.5 w-4.5 border-neutral-300 rounded-sm focus:ring-0 accent-black cursor-pointer"
                              />
                              <span className="tracking-wider">{cat}</span>
                            </div>
                            <span className="text-[10px] text-neutral-400">({count})</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Price range Accordion with Double Draggable Slider Handles */}
                <div className="space-y-4">
                  <button
                    onClick={() => setPriceExpanded(!priceExpanded)}
                    className="w-full text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900 pb-2 border-b border-neutral-100 flex items-center space-x-2.5 cursor-pointer"
                  >
                    <span className="text-sm font-semibold w-4 text-center">{priceExpanded ? "—" : "+"}</span>
                    <span>Price</span>
                  </button>

                  {priceExpanded && (
                    <div className="space-y-4 pt-1">
                      <p className="text-[10px] font-semibold text-neutral-500">
                        The highest price is Rs 7,500.00
                      </p>

                      {/* Custom Double Range Slider */}
                      <div className="relative w-full h-6 flex items-center">
                        <div className="absolute left-0 right-0 h-1 bg-neutral-200 rounded-full" />
                        <div
                          className="absolute h-1 bg-black rounded-full"
                          style={{
                            left: `${(stagedMinPrice / 7500) * 100}%`,
                            right: `${100 - (stagedMaxPrice / 7500) * 100}%`,
                          }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="7500"
                          value={stagedMinPrice}
                          onChange={(e) => {
                            const value = Math.min(Number(e.target.value), stagedMaxPrice - 100);
                            setStagedMinPrice(value);
                          }}
                          className="absolute w-full pointer-events-none appearance-none h-1 bg-transparent outline-hidden z-20 accent-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="7500"
                          value={stagedMaxPrice}
                          onChange={(e) => {
                            const value = Math.max(Number(e.target.value), stagedMinPrice + 100);
                            setStagedMaxPrice(value);
                          }}
                          className="absolute w-full pointer-events-none appearance-none h-1 bg-transparent outline-hidden z-20 accent-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer"
                        />
                      </div>

                      {/* Numeric Inputs */}
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex-1 flex items-center border border-neutral-200 rounded-xs px-2.5 py-2">
                          <span className="text-[10px] font-bold text-neutral-400 mr-1.5 uppercase">Rs</span>
                          <input
                            type="number"
                            value={stagedMinPrice}
                            onChange={(e) => setStagedMinPrice(Math.min(stagedMaxPrice, Math.max(0, Number(e.target.value))))}
                            className="w-full text-xs font-semibold text-neutral-700 outline-hidden"
                          />
                        </div>
                        <div className="flex-1 flex items-center border border-neutral-200 rounded-xs px-2.5 py-2">
                          <span className="text-[10px] font-bold text-neutral-400 mr-1.5 uppercase">Rs</span>
                          <input
                            type="number"
                            value={stagedMaxPrice}
                            onChange={(e) => setStagedMaxPrice(Math.min(7500, Math.max(stagedMinPrice, Number(e.target.value))))}
                            className="w-full text-xs font-semibold text-neutral-700 outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sizes Accordion */}
                <div className="space-y-4">
                  <button
                    onClick={() => setSizeExpanded(!sizeExpanded)}
                    className="w-full text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900 pb-2 border-b border-neutral-100 flex items-center space-x-2.5 cursor-pointer"
                  >
                    <span className="text-sm font-semibold w-4 text-center">{sizeExpanded ? "—" : "+"}</span>
                    <span>Size</span>
                  </button>

                  {sizeExpanded && (
                    <div className="space-y-3 pt-1">
                      {["L", "XL", "2XL", "30", "32", "34", "36", "1L", "ONE SIZE"].map((size) => {
                        const count = PRODUCTS.filter((p) => p.sizes.includes(size)).length;
                        const isChecked = stagedSizes.includes(size);
                        return (
                          <label key={size} className="flex items-center justify-between text-xs font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleSizeToggle(size)}
                                className="h-4.5 w-4.5 border-neutral-300 rounded-sm focus:ring-0 accent-black cursor-pointer"
                              />
                              <span className="tracking-wider">{size}</span>
                            </div>
                            <span className="text-[10px] text-neutral-400">({count})</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Sort inside drawer: Title on Left, Dropdown on Right */}
                <div className="flex items-center justify-between py-4 border-b border-neutral-100 select-none">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900">
                    Sort By
                  </span>

                  <div className="relative min-w-[150px]">
                    <select
                      value={stagedSort}
                      onChange={(e) => setStagedSort(e.target.value)}
                      className="w-full border border-neutral-200 rounded-xs pl-3 pr-8 py-2 text-xs font-semibold text-neutral-700 outline-hidden appearance-none bg-white cursor-pointer text-right uppercase tracking-wider"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Apply Footer */}
              <div className="p-6 border-t border-neutral-100 bg-white flex-shrink-0 flex items-center justify-between space-x-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">
                  LKR (Rs)
                </div>
                <button
                  onClick={handleApply}
                  className="flex-1 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full btn-fill-up cursor-pointer flex items-center justify-center"
                >
                  <span className="relative z-10">Apply</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
