"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export const Footer: React.FC = () => {
  // Local states for newsletter email field, subscription success indicator, and currency switcher dropdown state
  const { currency, setCurrency } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [footerEmailFocused, setFooterEmailFocused] = useState(false);

  // Form submit handler that mimics a newsletter subscription and resets after a brief delay
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Helper function to perform a smooth scroll of the viewport window back to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Currencies list configuration with localization labels
  const currencies = [
    { code: "LKR", label: "LKR (රු)" },
    { code: "USD", label: "USD ($)" },
  ];

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-neutral-850 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          {/* Left Column: Logo & Socials (stretched with flex to align socials to the bottom) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <LogoIcon className="h-10 w-auto text-white" />
            </div>

            <div 
              style={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: "24px"
              }}
              className="space-y-3"
            >
              <h4 
                style={{
                  alignItems: "center",
                  color: "#fff",
                  display: "flex",
                  fontSize: "14px",
                  fontWeight: 600,
                  justifyContent: "space-between",
                  letterSpacing: "1.4px",
                  lineHeight: "14px",
                  margin: "0px 0px 20px",
                  textTransform: "uppercase"
                }}
              >
                Follow Us
              </h4>
              <div className="flex space-x-6 text-neutral-400">
                {/* Facebook */}
                <Link href="https://facebook.com" target="_blank" className="hover:text-white transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                {/* Instagram */}
                <Link href="https://instagram.com" target="_blank" className="hover:text-white transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                {/* Youtube */}
                <Link href="https://youtube.com" target="_blank" className="hover:text-white transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                  </svg>
                </Link>
                {/* Tiktok */}
                <Link href="https://tiktok.com" target="_blank" className="hover:text-white transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Newsletter & Navigation Lists (naturally stacked and left-aligned) */}
          <div className="lg:col-span-7 space-y-12">
            {/* Newsletter form */}
            <div 
              style={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: "24px",
                padding: 0
              }}
              className="space-y-4"
            >
              <h4
                style={{
                  alignItems: "center",
                  color: "#fff",
                  display: "flex",
                  fontSize: "14px",
                  fontWeight: 600,
                  justifyContent: "space-between",
                  letterSpacing: "1.4px",
                  lineHeight: "14px",
                  margin: "0px 0px 20px",
                  textTransform: "uppercase"
                }}
              >
                Sign Up for the FOA Newsletter
              </h4>
              <p
                style={{
                  color: "#fff",
                  fontFamily: "Prompt",
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: "24px",
                  margin: "0px 0px 20px"
                }}
              >
                Be the first to know about our new collections and promotions
              </p>
              <form onSubmit={handleSubscribe} className="w-full">
                <div className="relative inline-block text-left w-full h-[48px]" style={{ boxSizing: "border-box" }}>
                  <input
                    type="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFooterEmailFocused(true)}
                    onBlur={() => setFooterEmailFocused(false)}
                    style={{
                      backgroundColor: "transparent",
                      borderColor: footerEmailFocused ? "#0066cc" : "#dedede",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      color: "#fff",
                      fontFamily: "Prompt, sans-serif",
                      fontSize: "12px",
                      lineHeight: "13.8px",
                      padding: "12px 17px",
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      borderRadius: "0px",
                      outline: "none"
                    }}
                    required
                  />
                  <label
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: (footerEmailFocused || email) ? "0" : "50%",
                      transform: "translateY(-50%)",
                      fontSize: (footerEmailFocused || email) ? "10px" : "12px",
                      color: footerEmailFocused ? "#0066cc" : "#999999",
                      backgroundColor: "#111111",
                      padding: "0 6px",
                      fontFamily: "Prompt, sans-serif",
                      transition: "all 0.15s ease-out",
                      pointerEvents: "none",
                      lineHeight: "1"
                    }}
                  >
                    Email
                  </label>
                  <button type="submit" className="absolute right-[17px] top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-widest mt-2">
                    Subscribed successfully!
                  </p>
                )}
              </form>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 gap-8">
              {/* Support */}
              <div className="space-y-4">
                <h4
                  style={{
                    alignItems: "center",
                    color: "#fff",
                    display: "flex",
                    fontSize: "15px",
                    fontWeight: 600,
                    justifyContent: "space-between",
                    letterSpacing: "1.4px",
                    lineHeight: "14px",
                    margin: "0px 0px 20px",
                    textTransform: "uppercase"
                  }}
                >
                  Support
                </h4>
                <ul className="space-y-3" style={{ listStyleType: "none", padding: 0 }}>
                  <li>
                    <Link
                      href="/#terms"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#privacy"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#exchanges"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Return and Exchange Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#shipping"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Shipping Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <h4
                  style={{
                    alignItems: "center",
                    color: "#fff",
                    display: "flex",
                    fontSize: "14px",
                    fontWeight: 600,
                    justifyContent: "space-between",
                    letterSpacing: "1.4px",
                    lineHeight: "14px",
                    margin: "0px 0px 20px",
                    textTransform: "uppercase"
                  }}
                >
                  Info
                </h4>
                <ul className="space-y-3" style={{ listStyleType: "none", padding: 0 }}>
                  <li>
                    <Link
                      href="/#story"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#careers"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#training"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Training Dept
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#strongest"
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px",
                        fontFamily: "Prompt, sans-serif"
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      Strongest in the City
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright, currency switcher & payment badges row */}
        <div className="pt-8 border-t border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bottom Left Column (under logo): Copyright & Currency Switcher */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <p className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-widest">
              &copy; {new Date().getFullYear()} FOA Clothing, All rights reserved. <Link href="https://shopify.com" target="_blank" className="hover:underline">Powered by Shopify</Link>
            </p>
            
            {/* Currency switcher dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center justify-between border border-neutral-700 bg-neutral-950 text-xs font-bold uppercase tracking-wider px-4 py-2.5 w-36 hover:border-neutral-500 transition-colors text-white"
              >
                <span>{currency === "LKR" ? "LKR (රු)" : "USD ($)"}</span>
                <ChevronDown className={`h-3 w-3 ml-2 transition-transform duration-200 ${isCurrencyDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute bottom-full mb-1 left-0 z-30 w-36 bg-[#151515] border border-neutral-700 shadow-2xl">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code as "LKR" | "USD");
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors block text-white"
                    >
                      {curr.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Right Column (under links): Payment Logos & Scroll back to top */}
          <div className="lg:col-span-7 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 w-full">
            {/* Payment badge images row */}
            <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end md:ml-auto">
              {["Amex", "ApplePay", "Diners", "Discover", "GPay", "JCB", "Mastercard", "UnionPay", "Visa"].map((badge) => (
                <span
                  key={badge}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm select-none"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Scroll back to top button */}
            <button
              onClick={scrollToTop}
              className="h-10 w-10 bg-white hover:bg-neutral-200 text-black flex items-center justify-center rounded-full shadow-lg transition-colors focus:outline-none shrink-0"
              aria-label="Scroll back to top of page"
            >
              <ChevronUp className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
