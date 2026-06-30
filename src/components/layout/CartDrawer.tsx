"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
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

  // Curated items for "YOU MAY ALSO LIKE"
  const suggestions = [
    {
      id: "foa-crossbody-bag-2",
      title: "CROSSBODY BAG 2.0",
      priceLKR: 2450,
      priceUSD: 8.5,
      originalPriceLKR: 3500,
      originalPriceUSD: 12,
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "foa-flux-tee",
      title: "FLUX OVERSIZE TEE",
      priceLKR: 4800,
      priceUSD: 16,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    },
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
    }
  ];

  const handleAddSuggestion = (item: typeof suggestions[0]) => {
    addToCart({
      id: item.id,
      title: item.title,
      priceLKR: item.priceLKR,
      priceUSD: item.priceUSD,
      image: item.image,
      selectedSize: "M", // default size
    });
  };

  const suggestionsVariants = {
    closed: {
      x: "250%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeIn",
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.15,
        ease: "easeOut",
      },
    },
  } as const;

  const cartVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.15,
        ease: "easeIn",
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
          />

          {/* Dual Drawer Container */}
          <div className="fixed top-0 bottom-0 right-0 z-55 flex flex-row pointer-events-none overflow-hidden h-full">
            
            {/* Suggestions Panel ("YOU MAY ALSO LIKE") */}
            <motion.div
              variants={suggestionsVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="hidden md:flex w-[230px] bg-neutral-100/90 border-r border-neutral-200 pointer-events-auto h-full flex-col z-40 shadow-xl"
            >
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-white">
                <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#111111]">
                  You May Also Like
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {suggestions.map((item) => (
                  <div key={item.id} className="flex flex-col space-y-2.5 pb-5 border-b border-neutral-200/60 last:border-b-0">
                    <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden shadow-xs">
                      {item.discount && (
                        <div className="absolute top-1 left-0 bg-black text-white text-[7px] font-black tracking-widest px-2 py-0.5 uppercase z-10 transform -rotate-6 shadow-md">
                          {item.discount}
                        </div>
                      )}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="200px"
                      />
                    </div>
                    <div className="text-center space-y-1 px-1">
                      <h4 className="text-[9px] font-black tracking-wide uppercase text-[#111111] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-bold text-neutral-800">
                        {item.originalPriceLKR ? (
                          <span className="space-x-1.5">
                            <span className="line-through text-neutral-400 font-semibold">
                              {formattedPrice(currency === "LKR" ? item.originalPriceLKR : item.originalPriceUSD)}
                            </span>
                            <span className="text-black font-black">
                              {formattedPrice(currency === "LKR" ? item.priceLKR : item.priceUSD)}
                            </span>
                          </span>
                        ) : (
                          formattedPrice(currency === "LKR" ? item.priceLKR : item.priceUSD)
                        )}
                      </p>
                      
                      {currency === "LKR" ? (
                        <p className="text-[8px] text-neutral-500 font-semibold tracking-wide leading-relaxed">
                          3 x Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} or 4.5% Cashback with{" "}
                          <span className="font-bold text-sky-600">mintpay</span> or pay in 3 x Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with{" "}
                          <span className="font-bold text-indigo-600">Koko</span>
                        </p>
                      ) : (
                        <p className="text-[8px] text-neutral-500 font-semibold tracking-wide">
                          Installment options available at checkout.
                        </p>
                      )}

                      <button
                        onClick={() => handleAddSuggestion(item)}
                        className="mt-2 inline-block text-[9px] font-black tracking-widest uppercase border-b border-[#111111] pb-0.5 hover:opacity-75 transition-opacity cursor-pointer"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>


            {/* Cart Panel */}
            <motion.div
              variants={cartVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative w-[420px] max-w-[95vw] bg-white pointer-events-auto h-full flex-col z-55 shadow-2xl flex overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <h2 className="text-xs font-black uppercase tracking-[0.25em] text-[#111111]">
                    Cart
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-[#111111] hover:opacity-75 p-1 transition-opacity cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-3xl">🛒</span>
                    <h3 className="font-bold uppercase tracking-wider text-neutral-400 text-[11px]">
                      Your cart is empty
                    </h3>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="text-[10px] font-black uppercase tracking-widest border border-neutral-300 px-6 py-2.5 hover:border-black transition-colors cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex space-x-4 pb-6 border-b border-neutral-100 last:border-b-0"
                    >
                      {/* Image Container with Wishlist Heart overlay */}
                      <div className="relative h-24 w-18 flex-shrink-0 bg-neutral-50 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                        <button className="absolute top-1.5 right-1.5 text-neutral-400 hover:text-red-500 transition-colors bg-white/90 p-1 rounded-full shadow-xs cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start">
                          <h4 className="text-[11px] font-black uppercase tracking-wider text-[#111111] pr-2 line-clamp-2 leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-black text-neutral-800 whitespace-nowrap">
                            {formattedPrice((currency === "LKR" ? item.priceLKR : item.priceUSD))}
                          </span>
                        </div>
                        <p className="text-[9px] uppercase font-semibold tracking-wider text-neutral-400 mt-1">
                          {item.id.replace("foa-", "").replace(/-/g, " ")}, {item.selectedSize}
                        </p>

                        {/* Quantity and Actions */}
                        <div className="flex items-center space-x-3 mt-3">
                          {/* Capsule Pill shaped Quantity controller */}
                          <div className="flex items-center border border-neutral-300 rounded-full px-2 py-0.5 bg-white shadow-xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="px-1.5 py-0.5 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#111111] min-w-[12px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="px-1.5 py-0.5 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Red Trash Icon */}
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-neutral-100 space-y-4 bg-white z-10">
                  
                  {/* Add order note toggle */}
                  <div className="border-b border-neutral-100 pb-3.5">
                    <button
                      onClick={() => setNoteOpen(true)}
                      className="flex items-center justify-between w-full text-[11px] font-bold text-neutral-600 uppercase tracking-widest hover:text-black transition-colors cursor-pointer"
                    >
                      <span>Add order note</span>
                      <span className="text-xs">+</span>
                    </button>
                  </div>

                  <div className="text-[10px] text-neutral-500 text-center tracking-wide">
                    Taxes and shipping calculated at checkout
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-center space-x-2.5 py-1 justify-center">
                    <input
                      type="checkbox"
                      id="cart-terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="h-3.5 w-3.5 border-neutral-300 rounded-sm focus:ring-0 accent-black cursor-pointer"
                    />
                    <label htmlFor="cart-terms" className="text-[10px] font-semibold text-neutral-600 tracking-wider cursor-pointer">
                      I agree with the <Link href="/#terms" className="underline hover:text-black">terms and conditions</Link>
                    </label>
                  </div>

                  {/* Checkout Button */}
                  <div className="space-y-4 pt-1">
                    <button
                      onClick={() => {
                        if (!agreed) {
                          alert("Please agree to the terms and conditions to proceed.");
                          return;
                        }
                        alert("Proceeding to checkout...");
                      }}
                      className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-full btn-fill-up cursor-pointer flex items-center justify-center ${
                        !agreed ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
                      }`}
                    >
                      <span className="relative z-10">Checkout · {formattedPrice(cartTotal)}</span>
                    </button>
                    
                    <div className="text-center">
                      <Link
                        href="/cart"
                        onClick={() => setCartOpen(false)}
                        className="btn-underline-fill text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] pb-0.5"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Note Popup Drawer */}
              <AnimatePresence>
                {noteOpen && (
                  <>
                    {/* Semi-transparent Backdrop for Popup */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setNoteOpen(false)}
                      className="absolute inset-0 bg-black z-40"
                    />
                    
                    {/* The Popup Container */}
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-6 z-50 shadow-2xl flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#111111]">
                          Add Order Note
                        </h3>
                        <button 
                          onClick={() => setNoteOpen(false)} 
                          className="text-neutral-400 hover:text-black transition-colors cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <textarea
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder="Leave a note with your order..."
                        className="w-full p-3 border border-neutral-300 rounded-xs text-xs focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 resize-none h-28 placeholder:text-neutral-400 transition-colors"
                      />
                      <button
                        onClick={() => setNoteOpen(false)}
                        className="w-full mt-4 py-3.5 text-xs font-black uppercase tracking-[0.2em] rounded-full btn-fill-up cursor-pointer flex items-center justify-center"
                      >
                        <span className="relative z-10">Save</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
