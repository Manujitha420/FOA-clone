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
      image: "https://foaclothing.com/cdn/shop/files/00012701A.jpg?v=1778250510&width=960",
    },
    {
      id: "foa-flux-tee",
      title: "FLUX OVERSIZE TEE",
      priceLKR: 4800,
      priceUSD: 16,
      image: "https://foaclothing.com/cdn/shop/files/60014201A.jpg?v=1772541413&width=960",
    },
    {
      id: "foa-neo-utility-short",
      title: "NEO UTILITY SHORT",
      priceLKR: 4500,
      priceUSD: 15,
      image: "https://foaclothing.com/cdn/shop/files/00012601A.jpg?v=1778249513&width=960",
    },
    {
      id: "foa-unchained-tee",
      title: "UNCHAINED TEE",
      priceLKR: 5200,
      priceUSD: 17.5,
      image: "https://foaclothing.com/cdn/shop/files/60000701A_caa37106-5e9b-42c3-9b1a-5119544105b3.jpg?v=1771933146&width=960",
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
                <h2 className="text-[13px] font-semibold uppercase tracking-[0em] text-[#151515] flex items-center justify-center w-full">
                  You May Also Like
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {suggestions.map((item) => (
                  <div key={item.id} className="flex flex-col space-y-2.5 pb-5 border-b border-neutral-200/60 last:border-b-0">
                    <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden shadow-xs">
                      {item.discount && (
                        <div className="absolute top-1 left-0 bg-black text-white text-[7px] font-medium tracking-widest px-2 py-0.5 uppercase z-10 transform -rotate-6 shadow-md">
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
                      <h4 className="text-[13px] font-medium tracking-wide uppercase text-[#151515] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[15px] font-medium text-neutral-800">
                        {item.originalPriceLKR ? (
                          <span className="space-x-1.5">
                            <span className="line-through text-neutral-400 font-medium">
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
                        <div className="space-y-1 mt-1 text-[8px] leading-tight text-neutral-500 font-bold uppercase tracking-wider text-center">
                          {/* MintPay row */}
                          <div className="flex items-center justify-center flex-wrap gap-0.5">
                            <span>
                              3 x Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} or 4.5% Cashback with
                            </span>
                            <a href="https://mintpay.lk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                              <img
                                src="https://s3.amazonaws.com/bizenglish/wp-content/uploads/2022/10/28174525/Mintpay-Logo.jpg"
                                alt="Mintpay"
                                className="h-3 w-auto object-contain mix-blend-multiply"
                              />
                            </a>
                          </div>
                          {/* Koko row */}
                          <div className="flex items-center justify-center flex-wrap gap-0.5">
                            <span>
                              or pay in 3 x Rs {(item.priceLKR / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with
                            </span>
                            <a href="https://paykoko.com/customer-education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                              <img
                                src="https://business360.lk/wp-content/uploads/2025/01/MAINLogo-HD_H.png"
                                alt="Koko"
                                className="h-3 w-auto object-contain mix-blend-multiply"
                              />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[8px] text-neutral-500 font-semibold tracking-wide">
                          Installment options available at checkout.
                        </p>
                      )}

                      <button
                        onClick={() => handleAddSuggestion(item)}
                        className="mt-2 inline-block text-[12px] font-medium tracking-widest uppercase border-b border-[#111111] pb-0.5 hover:opacity-75 transition-opacity cursor-pointer"
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
                  <h2 className="text-[15px] font-medium uppercase tracking-[0.1em] text-[#151515]">
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
                    <span className="w-20 h-20 flex items-center justify-center">
                      <img
                        className="w-20 h-20"
                        src="https://static.vecteezy.com/system/resources/previews/041/325/704/non_2x/trolley-line-icon-vector.jpg"
                        alt="trolley" />
                    </span>
                    <h3 className="font-medium tracking-[0em] text-neutral-600 text-[17px]">
                      Your cart is currently empty
                    </h3>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="btn-fill-up-shopping"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex space-x-4 pb-6 border-b border-neutral-100 last:border-b-0"
                    >
                      {/* Image Container */}
                      <div className="relative flex-shrink-0 bg-neutral-50 overflow-hidden" style={{ width: "96px", height: "144px" }}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-start py-0.5 space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-[15px] font-medium uppercase tracking-[0em] text-[#151515] pr-2 line-clamp-2 leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[15px] font-medium text-neutral-800 whitespace-nowrap">
                            {formattedPrice((currency === "LKR" ? item.priceLKR : item.priceUSD))}
                          </span>
                        </div>
                        <p className="text-[11px] uppercase font-medium tracking-wider text-neutral-400">
                          {item.title}, {item.selectedSize}
                        </p>

                        {/* Quantity and Actions */}
                        <div className="flex items-center space-x-3 pt-2">
                          {/* Capsule Pill shaped Quantity controller */}
                          <div className="flex items-center border border-neutral-300 rounded-full px-1.5 py-0 bg-white shadow-xs h-6">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="px-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <Minus className="h-2.5 w-2.5" strokeWidth={2.5} />
                            </button>
                            <span className="px-1.5 text-[11px] font-bold text-[#111111] min-w-[10px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="px-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <Plus className="h-2.5 w-2.5" strokeWidth={2.5} />
                            </button>
                          </div>

                          {/* Red Trash Icon */}
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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
                      className="flex items-center justify-between w-full text-[14px] font-medium text-neutral-750 tracking-[0em] cursor-pointer"
                    >
                      <span>Add order note</span>
                      <span className="text-3xl font-light">+</span>
                    </button>
                  </div>

                  <div className="text-[12px] text-neutral-750 text-center tracking-[0em]">
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
                    <label htmlFor="cart-terms" className="text-[13px] font-medium text-neutral-750 tracking-[0em] cursor-pointer">
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
                      className={`w-full py-4 text-[14px] font-semibold uppercase tracking-[0em] rounded-full btn-fill-up cursor-pointer flex items-center justify-center ${!agreed ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
                        }`}
                    >
                      <span className="relative z-10">Checkout · {formattedPrice(cartTotal)}</span>
                    </button>

                    <div className="text-center">
                      <Link
                        href="/cart"
                        onClick={() => setCartOpen(false)}
                        className="btn-underline-fill text-[12px] font-medium uppercase tracking-[0em] text-[#151515] pb-0.5"
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
                        <h3 className="text-[12px] font-medium uppercase tracking-[0em] text-[#151515]">
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
