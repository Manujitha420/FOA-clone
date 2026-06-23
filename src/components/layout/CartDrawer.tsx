"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    currency,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `LKR ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getKokoSplits = () => {
    const installment = cartTotal / 3;
    return `LKR ${installment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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
            className="fixed inset-0 bg-neutral-900/60 z-50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-white dark:bg-neutral-950 z-55 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black tracking-wider uppercase">Shopping Cart</h2>
                <span className="text-xs font-bold bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-foreground/80 hover:text-foreground p-1"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-4xl">🛒</span>
                  <h3 className="font-bold uppercase tracking-wider text-muted-foreground text-sm">
                    Your cart is empty
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => setCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex space-x-4 pb-6 border-b border-neutral-100 dark:border-neutral-900 last:border-b-0"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-18 flex-shrink-0 bg-neutral-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-xs font-black uppercase tracking-wider line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-muted-foreground hover:text-destructive p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                          Size: {item.selectedSize}
                        </p>
                      </div>

                      {/* Pricing and Action */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity controller */}
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-800">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-1.5 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="p-1.5 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-black tracking-wide">
                          {formattedPrice(
                            (currency === "LKR" ? item.priceLKR : item.priceUSD) * item.quantity
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest font-black text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-lg font-black tracking-wider">{formattedPrice(cartTotal)}</span>
                </div>

                {currency === "LKR" && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-3 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center justify-between">
                      <span>Split into 3 interest-free payments of</span>
                      <span className="font-bold">{getKokoSplits()}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 font-normal">
                      Available with <strong className="text-foreground">Koko</strong> or{" "}
                      <strong className="text-foreground">MintPay</strong>
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <Button variant="primary" size="lg" className="w-full text-xs font-black" onClick={() => alert("Redirecting to secure checkout...")}>
                    Secure Checkout
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-[10px] font-black"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>

                <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest font-semibold mt-4">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
