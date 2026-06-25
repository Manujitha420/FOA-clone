"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { CartIcon } from "@/components/icons/CartIcon";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchDrawer } from "@/components/layout/SearchDrawer";

const mensColumns = [
  {
    title: "CLOTHING",
    href: "/#men",
    items: [
      { name: "MENS ALL", href: "/#men" },
      { name: "TEES", href: "/#men" },
      { name: "PRINTED TEES", href: "/#men" },
      { name: "TANKS", href: "/#men" },
      { name: "JACKETS", href: "/#men" },
      { name: "SHIRTS", href: "/#men" },
      { name: "HOODIES", href: "/#men" },
      { name: "PANTS", href: "/#men" },
      { name: "SHORTS", href: "/#men" },
      { name: "JOGGERS", href: "/#men" },
      { name: "COMPRESSION", href: "/#men" },
      { name: "BOXERS", href: "/#men" },
      { name: "DENIM", href: "/#men" },
    ]
  },
  {
    title: "FOOTWEAR",
    href: "/#footwear",
    items: [
      { name: "SHOES", href: "/#footwear" },
      { name: "SLIDERS", href: "/#footwear" },
      { name: "FLIP FLOPS", href: "/#footwear" },
    ]
  },
  {
    title: "ACCESSORIES",
    href: "/#accessories",
    items: [
      { name: "BAGS", href: "/#accessories" },
      { name: "HATS", href: "/#accessories" },
      { name: "CAPS", href: "/#accessories" },
      { name: "SOCKS", href: "/#accessories" },
    ]
  },
  {
    title: "TRENDING",
    href: "/#men",
    items: [
      { name: "TEES", href: "/#men" },
      { name: "HOODIES", href: "/#men" },
      { name: "SHOES", href: "/#footwear" },
    ]
  },
  {
    title: "E-VOUCHER",
    href: "/evoucher",
    items: []
  },
  {
    title: "ALL MENS",
    href: "/#men",
    items: []
  }
];

const womensColumns = [
  {
    title: "CLOTHING",
    href: "/#women",
    items: [
      { name: "WOMENS ALL", href: "/#women" },
      { name: "TEES", href: "/#women" },
      { name: "PRINTED TEES", href: "/#women" },
      { name: "JACKETS", href: "/#women" },
      { name: "TOPS", href: "/#women" },
      { name: "TANKS", href: "/#women" },
      { name: "HOODIES", href: "/#women" },
      { name: "DRESSES", href: "/#women" },
      { name: "LEGGINGS", href: "/#women" },
      { name: "SHORTS", href: "/#women" },
      { name: "JEANS", href: "/#women" },
      { name: "SKIRTS", href: "/#women" },
      { name: "PANTS", href: "/#women" },
    ]
  },
  {
    title: "ACCESSORIES",
    href: "/#accessories",
    items: [
      { name: "BAGS", href: "/#accessories" },
      { name: "CAPS", href: "/#accessories" },
      { name: "SOCKS", href: "/#accessories" },
    ]
  },
  {
    title: "FOOTWEAR",
    href: "/#footwear",
    items: [
      { name: "SHOES", href: "/#footwear" },
      { name: "SLIDERS", href: "/#footwear" },
      { name: "FLIP FLOPS", href: "/#footwear" },
    ]
  },
  {
    title: "TRENDING",
    href: "/#women",
    items: [
      { name: "TEES", href: "/#women" },
      { name: "LEGGINGS", href: "/#women" },
      { name: "SHOES", href: "/#footwear" },
    ]
  },
  {
    title: "E-VOUCHER",
    href: "/evoucher",
    items: []
  },
  {
    title: "ALL WOMENS",
    href: "/#women",
    items: []
  }
];

const accessoriesColumns = [
  {
    title: "PRODUCTS",
    href: "/#accessories",
    items: [
      { name: "ACCESSORIES ALL", href: "/#accessories" },
      { name: "BAGS", href: "/#accessories" },
      { name: "CAPS", href: "/#accessories" },
      { name: "HATS", href: "/#accessories" },
      { name: "SOCKS", href: "/#accessories" },
    ]
  },
  {
    title: "E-VOUCHER",
    href: "/evoucher",
    items: []
  },
  {
    title: "ALL ACCESSORIES",
    href: "/#accessories",
    items: []
  }
];

const footwearColumns = [
  {
    title: "PRODUCTS",
    href: "/#footwear",
    items: [
      { name: "FOOTWEAR ALL", href: "/#footwear" },
      { name: "FLIP FLOPS", href: "/#footwear" },
      { name: "SHOES", href: "/#footwear" },
      { name: "SLIDERS", href: "/#footwear" },
    ]
  },
  {
    title: "E-VOUCHER",
    href: "/evoucher",
    items: []
  },
  {
    title: "ALL FOOTWEAR",
    href: "/#footwear",
    items: []
  }
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartItems, setCartOpen, currency } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isHeaderActive = isHovered || isScrolled || !!activeDropdown;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "MENS", href: "/#men", hasDropdown: true },
    { name: "WOMENS", href: "/#women", hasDropdown: true },
    { name: "ACCESSORIES", href: "/#accessories", hasDropdown: true },
    { name: "FOOTWEAR", href: "/#footwear", hasDropdown: true },
    { name: "E-VOUCHER", href: "/evoucher", hasDropdown: false }
  ];

  const getDropdownColumns = (menuName: string) => {
    switch (menuName) {
      case "MENS":
        return mensColumns;
      case "WOMENS":
        return womensColumns;
      case "ACCESSORIES":
        return accessoriesColumns;
      case "FOOTWEAR":
        return footwearColumns;
      default:
        return null;
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden select-none flex whitespace-nowrap marquee-container"
        style={{
          backgroundColor: "#151515",
          color: "#fff",
          fontSize: "17px",
          fontWeight: 300,
          lineHeight: "17px",
          padding: "14px 0px"
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .marquee-track {
            display: flex;
            flex-shrink: 0;
            animation: marquee 25s linear infinite;
          }
          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
          }
        `}} />
        <div className="marquee-track">
          {[...Array(4)].map((_, idx) => (
            <React.Fragment key={idx}>
              <span
                style={{
                  alignItems: "center",
                  color: "#fff",
                  display: "flex",
                  fontSize: "13px",
                  letterSpacing: "0.39px",
                  lineHeight: "13px",
                  padding: "0px 20px",
                  textTransform: "uppercase"
                }}
              >
                FREE SHIPPING FOR ORDERS ABOVE Rs.9999.00
              </span>
              <span
                style={{
                  alignItems: "center",
                  color: "#fff",
                  display: "flex",
                  fontSize: "13px",
                  letterSpacing: "0.39px",
                  lineHeight: "13px",
                  padding: "0px 20px",
                  textTransform: "uppercase"
                }}
              >
                ORDERS WILL TAKE 4 TO 6 WORKING DAYS FOR DELIVERY
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-track" aria-hidden="true">
          {[...Array(4)].map((_, idx) => (
            <React.Fragment key={idx}>
              <span
                style={{
                  alignItems: "center",
                  color: "#fff",
                  display: "flex",
                  fontSize: "13px",
                  letterSpacing: "0.39px",
                  lineHeight: "13px",
                  padding: "0px 20px",
                  textTransform: "uppercase"
                }}
              >
                FREE SHIPPING FOR ORDERS ABOVE Rs.9999.00
              </span>
              <span
                style={{
                  alignItems: "center",
                  color: "#fff",
                  display: "flex",
                  fontSize: "13px",
                  letterSpacing: "0.39px",
                  lineHeight: "13px",
                  padding: "0px 20px",
                  textTransform: "uppercase"
                }}
              >
                ORDERS WILL TAKE 4 TO 6 WORKING DAYS FOR DELIVERY
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveDropdown(null);
        }}
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: "45px",
          backgroundColor: "transparent",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        {/* Animated Background Overlay (scales from top to bottom) */}
        <div
          className="absolute top-0 left-0 right-0 bg-white transition-all duration-300 ease-out origin-top -z-10"
          style={{
            height: "100%",
            transform: isHeaderActive ? "scaleY(1)" : "scaleY(0.22)",
            borderBottom: isHeaderActive ? "1px solid #e5e7eb" : "1px solid transparent"
          }}
        />

        <div
          className="relative z-10 mx-auto"
          style={{
            alignItems: "center",
            color: isHeaderActive ? "#151515" : "#ffffff",
            display: "grid",
            flexBasis: "100%",
            fontSize: "17px",
            fontWeight: 500,
            gridTemplateColumns: "612.742px 114.516px 612.742px",
            gridTemplateRows: "88px",
            lineHeight: "27.2px",
            padding: "0px 15px",
            paddingTop: "20px",
            width: "max-content",
            maxWidth: "100%"
          }}
        >

          {/* Left: Nav Menu in 2 rows */}
          <div className="hidden md:flex flex-col justify-self-start space-y-1">
            <nav
              className={`flex items-center space-x-6 transition-colors duration-300 ${isHeaderActive ? "text-[#151515]" : "text-white"}`}
              style={{
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: "24px",
                textAlign: "left"
              }}
            >
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative py-1 cursor-pointer"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(item.name);
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <Link href={item.href} className="flex items-center hover:opacity-75 transition-opacity">
                    {item.name}
                    {item.hasDropdown && <span className="ml-1 text-[8px] font-bold">⌵</span>}
                  </Link>
                </div>
              ))}
            </nav>
            <Link
              href="/#sale"
              className="text-[11px] font-black tracking-[0.2em] text-red-600 hover:text-red-500 transition-colors uppercase self-start"
              onMouseEnter={() => setActiveDropdown(null)}
            >
              SALE
            </Link>
          </div>

          {/* Left (Mobile Toggle) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden justify-self-start p-1 hover:opacity-75 transition-colors duration-300 ${isHeaderActive ? "text-[#151515]" : "text-white"}`}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Center: Typographic Logo */}
          <div
            className="flex justify-self-center"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            <Link
              href="/"
              className="hover:opacity-90 transition-opacity"
              style={{
                color: isHeaderActive ? "#151515" : "#ffffff",
                fontSize: "17px",
                fontWeight: 300,
                lineHeight: "27.2px",
                textAlign: "center"
              }}
            >
              <LogoIcon className="h-[22px] w-auto" invert={!isHeaderActive} />
            </Link>
          </div>

          {/* Right: Actions */}
          <div
            className={`flex items-center justify-self-end space-x-6 text-[11px] font-black tracking-[0.25em] transition-colors duration-300 ${isHeaderActive ? "text-[#151515]" : "text-white"}`}
            onMouseEnter={() => setActiveDropdown(null)}
          >
            <Link href="/account/login" className="hidden md:inline hover:opacity-75 transition-opacity">
              LOG IN
            </Link>

            {pathname.startsWith("/account") ? (
              <Link
                href="/search"
                className="hover:opacity-75 transition-opacity flex items-center"
                aria-label="Search items"
              >
                <Search className="h-4.5 w-4.5 stroke-[2.5]" />
              </Link>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-75 transition-opacity flex items-center cursor-pointer"
                aria-label="Search items"
              >
                <Search className="h-4.5 w-4.5 stroke-[2.5]" />
              </button>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 hover:opacity-75 transition-opacity"
              aria-label="Shopping Cart"
            >
              <CartIcon className={`h-5 w-5 transition-colors duration-300 ${isHeaderActive ? "text-[#151515]" : "text-white"}`} />
              {totalItems > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center transition-colors duration-300 ${isHeaderActive ? "bg-black text-white" : "bg-white text-black"}`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-2xl z-50 text-[#111111]"
            >
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-6 gap-8">
                {getDropdownColumns(activeDropdown)?.map((col, idx) => (
                  <div key={idx} className="space-y-4">
                    {col.items.length > 0 ? (
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111]">
                        {col.title}
                      </h4>
                    ) : (
                      <Link
                        href={col.href}
                        className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111] hover:opacity-75 transition-opacity block"
                      >
                        {col.title}
                      </Link>
                    )}
                    {col.items.length > 0 && (
                      <ul className="space-y-2.5">
                        {col.items.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="text-[10px] font-bold tracking-[0.15em] text-[#444444] hover:text-black transition-colors uppercase block"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


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
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-[#151515] text-white z-55 p-8 flex flex-col shadow-2xl overflow-y-auto"
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
                    {item.hasDropdown && (
                      <div className="pl-4 space-y-4 border-l border-neutral-800">
                        {getDropdownColumns(item.name)?.map((col) => (
                          <div key={col.title} className="space-y-1">
                            {col.items.length > 0 ? (
                              <span className="text-[10px] font-black tracking-widest uppercase text-neutral-500 block">
                                {col.title}
                              </span>
                            ) : (
                              <Link
                                href={col.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[10px] font-black tracking-widest uppercase text-neutral-400 hover:text-white block"
                              >
                                {col.title}
                              </Link>
                            )}
                            {col.items.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 hover:text-white block pl-2"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
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

      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
