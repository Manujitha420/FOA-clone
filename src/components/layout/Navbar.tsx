"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { CartIcon } from "@/components/icons/CartIcon";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { cartItems, setCartOpen, currency } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "MENS",
      href: "/#men",
      dropdownItems: [
        { name: "TEES", href: "/#men-tees" },
        { name: "HOODIES & SWEATSHIRTS", href: "/#men-hoodies" },
        { name: "PANTS", href: "/#men-pants" },
        { name: "SHORTS", href: "/#men-shorts" },
        { name: "SHIRTS", href: "/#men-shirts" },
      ]
    },
    {
      name: "WOMENS",
      href: "/#women",
      dropdownItems: [
        { name: "TEES", href: "/#women-tees" },
        { name: "HOODIES & SWEATSHIRTS", href: "/#women-hoodies" },
        { name: "PANTS", href: "/#women-pants" },
        { name: "SHORTS", href: "/#women-shorts" },
        { name: "TOPS", href: "/#women-tops" },
      ]
    },
    {
      name: "ACCESSORIES",
      href: "/#accessories",
      dropdownItems: [
        { name: "SOCKS", href: "/#accessories-socks" },
        { name: "CAPS & BEANIES", href: "/#accessories-caps" },
        { name: "BAGS", href: "/#accessories-bags" },
      ]
    },
    {
      name: "FOOTWEAR",
      href: "/#footwear",
      dropdownItems: [
        { name: "SLIDES", href: "/#footwear-slides" },
        { name: "SNEAKERS", href: "/#footwear-sneakers" },
      ]
    },
    {
      name: "E-VOUCHER",
      href: "/#evoucher",
      dropdownItems: []
    }
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#151515] text-white text-[10px] font-bold uppercase tracking-[0.25em] text-center py-2.5">
        {currency === "LKR"
          ? "Free Island-Wide Delivery on Orders Above LKR 12,000"
          : "Free Worldwide Shipping on Orders Above $100"}
      </div>

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#151515]/95 backdrop-blur-md border-b border-neutral-900 py-3 shadow-md"
            : "bg-gradient-to-b from-[#111111]/80 to-transparent py-5"
        }`}
        style={{ top: "35px" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 items-center">
          
          {/* Left: Nav Menu in 2 rows */}
          <div className="col-span-5 hidden md:flex flex-col space-y-1">
            <nav className="flex items-center space-x-6 text-[11px] font-black tracking-[0.2em] text-white">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative py-1 cursor-pointer"
                  onMouseEnter={() => item.dropdownItems.length > 0 && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.href} className="flex items-center hover:opacity-75 transition-opacity">
                    {item.name}
                    {item.dropdownItems.length > 0 && <span className="ml-1 text-[8px] font-bold">⌵</span>}
                  </Link>

                  {/* Dropdown panel */}
                  {activeDropdown === item.name && item.dropdownItems.length > 0 && (
                    <div className="absolute left-0 top-full pt-2 z-50">
                      <div className="bg-[#151515] border border-neutral-800 py-3 w-56 shadow-2xl">
                        {item.dropdownItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-5 py-2 text-[10px] font-bold tracking-widest text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors uppercase"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <Link
              href="/#sale"
              className="text-[11px] font-black tracking-[0.2em] text-red-600 hover:text-red-500 transition-colors uppercase self-start"
            >
              SALE
            </Link>
          </div>

          {/* Left (Mobile Toggle) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden col-span-4 justify-self-start text-white p-1 hover:opacity-75"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Center: Typographic Logo */}
          <div className="col-span-4 md:col-span-2 flex justify-center">
            <Link href="/" className="text-white hover:opacity-90 transition-opacity">
              <LogoIcon className="h-[22px] w-auto" />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="col-span-8 md:col-span-5 flex items-center justify-end space-x-6 text-[11px] font-black tracking-[0.25em] text-white">
            <Link href="/#login" className="hidden md:inline hover:opacity-75 transition-opacity">
              LOG IN
            </Link>
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:opacity-75 transition-opacity"
              aria-label="Search items"
            >
              <Search className="h-4.5 w-4.5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 hover:opacity-75 transition-opacity"
              aria-label="Shopping Cart"
            >
              <CartIcon className="h-5 w-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Interactive Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 z-50 bg-[#151515] border-b border-neutral-800 px-6 py-8 flex flex-col items-center"
          >
            <div className="w-full max-w-2xl flex items-center justify-between border-b border-neutral-700 py-3">
              <input
                type="text"
                placeholder="SEARCH PRODUCTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 tracking-widest outline-none uppercase font-bold"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-neutral-400 hover:text-white p-1 ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {searchQuery && (
              <p className="text-[10px] text-neutral-400 mt-4 tracking-widest uppercase font-semibold">
                Press Enter to search for "{searchQuery}"
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Slide-out Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-[#151515] text-white z-55 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <LogoIcon className="h-5 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:opacity-75"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-black tracking-widest uppercase text-white hover:opacity-70 block"
                    >
                      {item.name}
                    </Link>
                    {item.dropdownItems.length > 0 && (
                      <div className="pl-4 space-y-2 border-l border-neutral-800">
                        {item.dropdownItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 hover:text-white block"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/#sale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-black tracking-widest uppercase text-red-600 hover:opacity-70 block"
                >
                  SALE
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
