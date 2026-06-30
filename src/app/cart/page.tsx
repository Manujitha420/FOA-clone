"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Plus, Minus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const {
    cartItems,
    currency,
    updateQuantity,
    removeFromCart,
    cartTotal,
    addToCart,
  } = useCart();

  const [noteOpen, setNoteOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [agreed, setAgreed] = useState(false);

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `Rs ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  // Recommendations for "You may also like"
  const recommendations = [
    {
      id: "foa-neo-utility-short",
      title: "NEO UTILITY SHORT",
      priceLKR: 4500,
      priceUSD: 15,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "foa-unchained-tee",
      title: "UNCHAINED TEE",
      priceLKR: 5200,
      priceUSD: 17.5,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "foa-flux-jogger",
      title: "FLUX JOGGER",
      priceLKR: 4800,
      priceUSD: 16,
      image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "foa-linear-tee",
      title: "LINEAR TEE",
      priceLKR: 4500,
      priceUSD: 15,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const handleAddRecommendation = (item: typeof recommendations[0]) => {
    addToCart({
      id: item.id,
      title: item.title,
      priceLKR: item.priceLKR,
      priceUSD: item.priceUSD,
      image: item.image,
      selectedSize: "M", // default size
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <CartDrawer />

      <main className="flex-grow max-w-6xl mx-auto px-4 md:px-8 pt-44 pb-20 w-full animate-fade-in">
        <h1 className="text-3xl font-black tracking-wide text-[#111111] mb-10">
          Your cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <span className="text-4xl block">🛒</span>
            <p className="text-neutral-500 font-bold uppercase tracking-wider text-xs">
              Your cart is currently empty.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="btn-fill-up inline-flex items-center justify-center px-8 py-3.5 text-xs font-black uppercase tracking-widest rounded-full"
              >
                <span className="relative z-10">Continue Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Cart Table */}
            <div className="w-full">
              {/* Table Headers */}
              <div className="grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[3fr_1.2fr_1fr] gap-4 pb-4 border-b border-neutral-200 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                <div>Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-neutral-100">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[3fr_1.2fr_1fr] gap-4 py-8 items-center"
                  >
                    {/* Product Details */}
                    <div className="flex items-center space-x-4">
                      <div className="relative h-24 w-18 flex-shrink-0 bg-neutral-50 overflow-hidden border border-neutral-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[10px] uppercase font-semibold text-neutral-400">
                          Color: {item.id.replace("foa-", "").replace(/-/g, " ")} 01
                        </p>
                        <p className="text-[10px] uppercase font-semibold text-neutral-400">
                          Size: {item.selectedSize}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Remove Action */}
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3">
                      <div className="flex items-center border border-neutral-300 rounded-full px-2.5 py-1 bg-white shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-1.5 py-0.5 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#111111] min-w-[14px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right text-xs font-black text-neutral-800">
                      {formattedPrice(
                        (currency === "LKR" ? item.priceLKR : item.priceUSD) * item.quantity
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col md:flex-row justify-between items-start pt-6 gap-8">
              {/* Left Side: Continue Shopping */}
              <div>
                <Link
                  href="/"
                  className="btn-underline-fill text-xs font-black uppercase tracking-[0.2em] text-[#111111] pb-1"
                >
                  Continue shopping
                </Link>
              </div>

              {/* Right Side: Order Notes & Checkout Form */}
              <div className="w-full md:w-[380px] space-y-6">
                {/* Notes Toggle trigger & inline content */}
                <div className="border-b border-neutral-100 pb-3.5">
                  <button
                    onClick={() => setNoteOpen(!noteOpen)}
                    className="flex items-center justify-between w-full text-xs font-bold text-neutral-600 uppercase tracking-widest hover:text-black transition-colors cursor-pointer"
                  >
                    <span>Add notes</span>
                    <span className="text-sm font-semibold">{noteOpen ? "—" : "+"}</span>
                  </button>
                  {noteOpen && (
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Leave a note with your order..."
                      className="w-full mt-3 p-3 border border-neutral-300 rounded-xs text-xs focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 resize-none h-28 placeholder:text-neutral-400 transition-colors"
                    />
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start space-x-3 py-1">
                  <input
                    type="checkbox"
                    id="page-cart-terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 border-neutral-300 rounded-sm focus:ring-0 accent-black cursor-pointer"
                  />
                  <label
                    htmlFor="page-cart-terms"
                    className="text-[10px] font-semibold text-neutral-600 tracking-wider leading-relaxed cursor-pointer"
                  >
                    I agree with the <Link href="/#terms" className="underline hover:text-black">terms and conditions</Link>
                  </label>
                </div>

                {/* Main Checkout Action Buttons */}
                <div className="space-y-4 pt-1">
                  <button
                    onClick={() => {
                      if (!agreed) {
                        alert("Please agree to the terms and conditions to proceed.");
                        return;
                      }
                      alert("Proceeding to checkout...");
                    }}
                    className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-full btn-fill-up cursor-pointer flex items-center justify-center ${!agreed ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
                      }`}
                  >
                    <span className="relative z-10">Checkout · {formattedPrice(cartTotal)}</span>
                  </button>

                  {/* Google Pay Button with custom brand logo SVG */}
                  <button
                    onClick={() => {
                      if (!agreed) {
                        alert("Please agree to the terms and conditions to proceed.");
                        return;
                      }
                      alert("Proceeding to checkout with Google Pay...");
                    }}
                    className={`w-full py-3.5 bg-black text-white hover:bg-neutral-900 rounded-md cursor-pointer flex items-center justify-center space-x-2 transition-colors border border-black ${!agreed ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" viewBox="0 0 41 17">
                      <path d="M19.526 2.635v4.083h2.518q.9 0 1.488-.605.605-.604.605-1.437 0-.816-.605-1.422-.588-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99q1.519 0 2.582 1.012 1.08 1.013 1.08 2.466 0 1.487-1.08 2.482-1.046.997-2.583.996zm7.668 2.287q0 .587.499.98.498.39 1.168.391.949 0 1.692-.701.745-.703.744-1.65-.704-.555-1.962-.555-.916 0-1.528.442-.613.44-.613 1.093m1.946-5.815q1.668 0 2.633.89.964.891.964 2.442v4.932h-1.439v-1.11h-.065q-.933 1.372-2.486 1.372-1.323 0-2.215-.784t-.891-1.96q0-1.242.94-1.976c.94-.734 1.463-.735 2.51-.735q1.34 0 2.206.49v-.344q0-.784-.621-1.33a2.13 2.13 0 0 0-1.455-.547q-1.26 0-1.995 1.062l-1.324-.834q1.095-1.568 3.238-1.568m11.853.262-5.02 11.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387 5.749h.032l2.322-5.75z" fill={"#fff"}></path>
                      <path d="M13.448 7.134q-.001-.71-.116-1.366H6.988v2.588h3.634a3.1 3.1 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944" fill={"#4285f4"}></path>
                      <path d="M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.73 6.73 0 0 0 6.01 3.703" fill={"#34a853"}></path>
                      <path d="M3.212 8.267a4.03 4.03 0 0 1 0-2.572V3.964H.978A6.7 6.7 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017z" fill={"#fbbc05"}></path>
                      <path d="M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.73 6.73 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774" fill={"#ea4335"}></path>
                    </svg>
                  </button>

                  <div className="text-[10px] text-neutral-400 text-center tracking-wide mt-2">
                    Taxes and shipping calculated at checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You may also like recommendations block */}
        <section className="mt-24 pt-16 border-t border-neutral-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-[#111111] mb-2">
              You may also like
            </h2>
            <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
              Describe your featured collection here
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {recommendations.map((item) => (
              <div key={item.id} className="group flex flex-col space-y-4">
                <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden shadow-xs">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="260px"
                  />
                  <button
                    onClick={() => handleAddRecommendation(item)}
                    className="absolute bottom-3 left-3 right-3 bg-white/95 text-black hover:bg-black hover:text-white transition-colors py-2 text-[9px] font-black uppercase tracking-wider shadow-md opacity-0 group-hover:opacity-100 duration-200 cursor-pointer"
                  >
                    Quick Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-black tracking-wider uppercase text-[#111111]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-black text-neutral-800">
                    {formattedPrice(currency === "LKR" ? item.priceLKR : item.priceUSD)}
                  </p>

                  {currency === "LKR" ? (
                    <p className="text-[9px] text-neutral-500 font-semibold tracking-wide leading-relaxed">
                      3 x Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} or 4.5% Cashback with{" "}
                      <span className="font-bold text-sky-600">mintpay</span> or pay in 3 x Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with{" "}
                      <span className="font-bold text-indigo-600">Koko</span>
                    </p>
                  ) : (
                    <p className="text-[9px] text-neutral-500 font-semibold tracking-wide">
                      Installment options available at checkout.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
