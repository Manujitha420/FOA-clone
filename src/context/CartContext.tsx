"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  priceLKR: number;
  priceUSD: number;
  originalPriceLKR?: number;
  originalPriceUSD?: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, selectedSize: string) => void;
  updateQuantity: (id: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  currency: "LKR" | "USD";
  setCurrency: (currency: "LKR" | "USD") => void;
  toggleCurrency: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState<"LKR" | "USD">("LKR");

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("foa_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    const savedCurrency = localStorage.getItem("foa_currency");
    if (savedCurrency === "LKR" || savedCurrency === "USD") {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("foa_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("foa_currency", currency);
  }, [currency]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id && item.selectedSize === newItem.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    // setCartOpen(true); // Auto open cart drawer on add (disabled as per request)
  };

  const removeFromCart = (id: string, selectedSize: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    );
  };

  const updateQuantity = (id: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "LKR" ? "USD" : "LKR"));
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = currency === "LKR" ? item.priceLKR : item.priceUSD;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
        currency,
        setCurrency,
        toggleCurrency,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
