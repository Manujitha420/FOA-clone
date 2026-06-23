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
              className="hidden md:flex w-[320px] bg-white border-r border-neutral-100 pointer-events-auto h-full flex-col z-40"
            >
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#111111]">
                  You May Also Like
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {suggestions.map((item) => (
                  <div key={item.id} className="flex flex-col space-y-3 pb-6 border-b border-neutral-100 last:border-b-0">
                    <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="280px"
                      />
                    </div>
                    <div className="text-center space-y-1.5 px-2">
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

                      <button
                        onClick={() => handleAddSuggestion(item)}
                        className="mt-3 inline-block text-[10px] font-black tracking-widest uppercase border-b border-[#111111] pb-0.5 hover:opacity-75 transition-opacity"
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
              className="w-[420px] max-w-[95vw] bg-white pointer-events-auto h-full flex-col z-55 shadow-2xl flex"
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
                  className="text-[#111111] hover:opacity-75 p-1 transition-opacity"
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
                      className="text-[10px] font-black uppercase tracking-widest border border-neutral-300 px-6 py-2.5 hover:border-black transition-colors"
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
                      {/* Image */}
                      <div className="relative h-24 w-18 flex-shrink-0 bg-neutral-50 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#111111] pr-2 line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-[11px] font-black text-neutral-800 whitespace-nowrap">
                              {formattedPrice((currency === "LKR" ? item.priceLKR : item.priceUSD))}
                            </span>
                          </div>
                          <p className="text-[9px] uppercase font-semibold tracking-wider text-neutral-400 mt-1">
                            {item.title.toLowerCase()}, {item.selectedSize}
                          </p>
                        </div>

                        {/* Pricing and Action */}
                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity controller */}
                          <div className="flex items-center border border-neutral-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-1 text-neutral-500 hover:text-black transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#111111]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-1 text-neutral-500 hover:text-black transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
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
                <div className="p-6 border-t border-neutral-100 space-y-4">
                  
                  {/* Add order note toggle */}
                  <div className="border-b border-neutral-100 pb-3">
                    <button
                      onClick={() => setNoteOpen(!noteOpen)}
                      className="flex items-center justify-between w-full text-[11px] font-bold text-neutral-600 uppercase tracking-widest hover:text-black transition-colors"
                    >
                      <span>Add order note</span>
                      <span className="text-xs">{noteOpen ? "−" : "+"}</span>
                    </button>
                    {noteOpen && (
                      <textarea
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder="Leave a note with your order..."
                        className="w-full mt-2 p-2.5 border border-neutral-200 text-xs focus:outline-none focus:border-neutral-500 resize-none h-20 placeholder:text-neutral-400"
                      />
                    )}
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
                  <div className="space-y-3.5 pt-1">
                    <button
                      onClick={() => {
                        if (!agreed) {
                          alert("Please agree to the terms and conditions to proceed.");
                          return;
                        }
                        alert("Proceeding to checkout...");
                      }}
                      className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200 ${
                        agreed
                          ? "bg-[#111111] text-white hover:bg-neutral-800 cursor-pointer"
                          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      }`}
                    >
                      Checkout · {formattedPrice(cartTotal)}
                    </button>
                    
                    <div className="text-center">
                      <Link
                        href="/cart"
                        onClick={() => setCartOpen(false)}
                        className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] hover:opacity-75 border-b-2 border-[#111111] pb-0.5"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
