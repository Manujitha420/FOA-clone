"use client";

import React, { use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

interface AccountPageProps {
  params: Promise<{ mode: string }>;
}

export default function AccountPage({ params }: AccountPageProps) {
  const { mode } = use(params);
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between pt-32">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[500px] mx-auto text-center">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h1 className="text-2xl font-normal tracking-[0.15em] uppercase font-sans">
                  Log In
                </h1>
                <p className="text-[12px] text-neutral-500 font-sans tracking-wide">
                  If you have an account with us, please log in.
                </p>
              </div>

              <form className="space-y-4 text-left">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-neutral-800 transition-colors duration-200 focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-2 text-[12px] font-sans tracking-wide">
                <div>
                  <span className="text-neutral-500">Don't have an account? </span>
                  <Link
                    href="/account/register"
                    className="underline hover:text-neutral-600 transition-colors"
                  >
                    Create an account
                  </Link>
                </div>
                <div>
                  <Link
                    href="#"
                    className="underline text-neutral-500 hover:text-[#111111] transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h1 className="text-2xl font-normal tracking-[0.15em] uppercase font-sans">
                  Create An Account
                </h1>
                <p className="text-[12px] text-neutral-500 font-sans tracking-wide max-w-[420px] mx-auto leading-relaxed">
                  Enter your information below to proceed. If you already have an account, please log in instead.
                </p>
              </div>

              <form className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400 font-sans"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-neutral-800 transition-colors duration-200 focus:outline-none"
                  >
                    Create An Account
                  </button>
                </div>
              </form>

              <div className="pt-2 text-[12px] font-sans tracking-wide">
                <span className="text-neutral-500">Already have an account? </span>
                <Link
                  href="/account/login"
                  className="underline hover:text-neutral-600 transition-colors"
                >
                  Log in
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
