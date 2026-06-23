"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export const Footer: React.FC = () => {
  const { currency, setCurrency } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currencies = [
    { code: "LKR", label: "LKR (රු)" },
    { code: "USD", label: "USD ($)" },
  ];

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-neutral-850 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          {/* Left Column: Logo & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <LogoIcon className="h-6 w-auto text-white" />
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
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

          {/* Right Column: Newsletter & Navigation Lists */}
          <div className="lg:col-span-7 space-y-12">
            {/* Newsletter form */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em]">
                Sign Up for the FOA Newsletter
              </h4>
              <p className="text-xs text-neutral-400 font-semibold tracking-wider">
                Be the first to know about our new collections and promotions
              </p>
              <form onSubmit={handleSubscribe} className="max-w-md">
                <div className="flex border-b border-neutral-700 py-2 relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs uppercase tracking-wider outline-none placeholder-neutral-500 pr-8"
                    required
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
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

            {/* Links Columns & Payment logos */}
            <div className="grid grid-cols-2 gap-8">
              {/* Support */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">
                  Support
                </h4>
                <ul className="space-y-3 text-xs font-semibold uppercase tracking-widest text-neutral-200">
                  <li><Link href="/#terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
                  <li><Link href="/#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/#exchanges" className="hover:text-white transition-colors">Return and Exchange Policy</Link></li>
                  <li><Link href="/#shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                </ul>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">
                  Info
                </h4>
                <ul className="space-y-3 text-xs font-semibold uppercase tracking-widest text-neutral-200">
                  <li><Link href="/#story" className="hover:text-white transition-colors">Our Story</Link></li>
                  <li><Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/#careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/#training" className="hover:text-white transition-colors">Training Dept</Link></li>
                  <li><Link href="/#strongest" className="hover:text-white transition-colors">Strongest in the City</Link></li>
                </ul>
              </div>
            </div>

            {/* Payment badge images row */}
            <div className="pt-4 flex flex-wrap gap-2 items-center justify-start lg:justify-end">
              {/* Render dynamic payment badges as clean inline images matching payment logos */}
              {["Amex", "ApplePay", "Diners", "Discover", "GPay", "JCB", "Mastercard", "UnionPay", "Visa"].map((badge) => (
                <span
                  key={badge}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm select-none"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & actions row */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Bottom Left: Copyright + Currency Selector */}
          <div className="space-y-4 flex flex-col items-start w-full md:w-auto">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} FOA Clothing, All rights reserved. Powered by Shopify
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

          {/* Bottom Right: Scroll to top arrow */}
          <div className="flex items-center justify-end w-full md:w-auto">
            <button
              onClick={scrollToTop}
              className="h-10 w-10 bg-white hover:bg-neutral-200 text-black flex items-center justify-center rounded-full shadow-lg transition-colors focus:outline-none"
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
