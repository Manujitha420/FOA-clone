"use client";

import React, { use, useState } from "react";
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

  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const [registerFirstFocused, setRegisterFirstFocused] = useState(false);
  const [registerFirstValue, setRegisterFirstValue] = useState("");
  const [registerLastFocused, setRegisterLastFocused] = useState(false);
  const [registerLastValue, setRegisterLastValue] = useState("");
  const [registerEmailFocused, setRegisterEmailFocused] = useState(false);
  const [registerEmailValue, setRegisterEmailValue] = useState("");
  const [registerPasswordFocused, setRegisterPasswordFocused] = useState(false);
  const [registerPasswordValue, setRegisterPasswordValue] = useState("");

  // Page Container: Background color, text color, min height, and top padding to clear header
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between pt-32">
      <Navbar />
      <CartDrawer />

      {/* Content Container */}
      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[500px] mx-auto text-center">
          {isLogin ? (
            /* LOGIN VIEW */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                {/* Title */}
                <h1
                  style={{
                    color: "#151515",
                    fontFamily: "Prompt, sans-serif",
                    fontSize: "28px",
                    lineHeight: "36px",
                    margin: "0px 0px 10px",
                    textAlign: "center",
                    textTransform: "uppercase"
                  }}
                  className="font-normal tracking-[0.15em]"
                >
                  Log In
                </h1>
                {/* Description */}
                <p className="text-[12px] text-neutral-500 font-sans tracking-wide">
                  If you have an account with us, please log in.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-4 text-left">
                {/* Email Input */}
                <div className="relative inline-block text-left w-full max-w-[520px]" style={{ margin: "0px 0px 10px" }}>
                  <input
                    type="email"
                    value={emailValue || ""}
                    onChange={(e) => setEmailValue(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    style={{
                      borderColor: emailFocused ? "#0066cc" : "#dedede",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      color: "#151515",
                      display: "inline-block",
                      fontFamily: "Prompt, sans-serif",
                      fontSize: "12px",
                      lineHeight: "13.8px",
                      padding: "12px 17px",
                      width: "100%",
                      height: "48px",
                      boxSizing: "border-box",
                      borderRadius: "0px"
                    }}
                    className="focus:outline-none transition-colors"
                    required
                  />
                  <label
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: (emailFocused || emailValue) ? "0" : "50%",
                      transform: "translateY(-50%)",
                      fontSize: (emailFocused || emailValue) ? "10px" : "12px",
                      color: emailFocused ? "#0066cc" : "#999999",
                      backgroundColor: "#ffffff",
                      padding: "0 6px",
                      fontFamily: "Prompt, sans-serif",
                      transition: "all 0.15s ease-out",
                      pointerEvents: "none",
                      lineHeight: "1"
                    }}
                  >
                    Email address
                  </label>
                </div>
                {/* Password Input */}
                <div className="relative inline-block text-left w-full max-w-[520px]" style={{ margin: "0px 0px 10px" }}>
                  <input
                    type="password"
                    value={passwordValue || ""}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    style={{
                      borderColor: passwordFocused ? "#0066cc" : "#dedede",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      color: "#151515",
                      display: "inline-block",
                      fontFamily: "Prompt, sans-serif",
                      fontSize: "12px",
                      lineHeight: "13.8px",
                      padding: "12px 17px",
                      width: "100%",
                      height: "48px",
                      boxSizing: "border-box",
                      borderRadius: "0px"
                    }}
                    className="focus:outline-none transition-colors"
                    required
                  />
                  <label
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: (passwordFocused || passwordValue) ? "0" : "50%",
                      transform: "translateY(-50%)",
                      fontSize: (passwordFocused || passwordValue) ? "10px" : "12px",
                      color: passwordFocused ? "#0066cc" : "#999999",
                      backgroundColor: "#ffffff",
                      padding: "0 6px",
                      fontFamily: "Prompt, sans-serif",
                      transition: "all 0.15s ease-out",
                      pointerEvents: "none",
                      lineHeight: "1"
                    }}
                  >
                    Password
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-neutral-800 transition-colors duration-200 focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              {/* Links */}
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
            /* REGISTER VIEW */
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                {/* Title */}
                <h1
                  style={{
                    color: "#151515",
                    fontFamily: "Prompt, sans-serif",
                    fontSize: "28px",
                    lineHeight: "36px",
                    margin: "0px 0px 10px",
                    textAlign: "center",
                    textTransform: "uppercase"
                  }}
                  className="font-normal tracking-[0.15em]"
                >
                  Create An Account
                </h1>
                {/* Description */}
                <p className="text-[12px] text-neutral-500 font-sans tracking-wide max-w-[420px] mx-auto leading-relaxed">
                  Enter your information below to proceed. If you already have an account, please log in instead.
                </p>
              </div>

              {/* Register Form */}
              <form className="space-y-4 text-left">
                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-4" style={{ margin: "0px 0px 10px" }}>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={registerFirstValue || ""}
                      onChange={(e) => setRegisterFirstValue(e.target.value)}
                      onFocus={() => setRegisterFirstFocused(true)}
                      onBlur={() => setRegisterFirstFocused(false)}
                      style={{
                        borderColor: registerFirstFocused ? "#0066cc" : "#dedede",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        color: "#151515",
                        display: "inline-block",
                        fontFamily: "Prompt, sans-serif",
                        fontSize: "12px",
                        lineHeight: "13.8px",
                        padding: "12px 17px",
                        width: "100%",
                        height: "48px",
                        boxSizing: "border-box",
                        borderRadius: "0px"
                      }}
                      className="focus:outline-none transition-colors"
                      required
                    />
                    <label
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: (registerFirstFocused || registerFirstValue) ? "0" : "50%",
                        transform: "translateY(-50%)",
                        fontSize: (registerFirstFocused || registerFirstValue) ? "10px" : "12px",
                        color: registerFirstFocused ? "#0066cc" : "#999999",
                        backgroundColor: "#ffffff",
                        padding: "0 6px",
                        fontFamily: "Prompt, sans-serif",
                        transition: "all 0.15s ease-out",
                        pointerEvents: "none",
                        lineHeight: "1"
                      }}
                    >
                      First name
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={registerLastValue || ""}
                      onChange={(e) => setRegisterLastValue(e.target.value)}
                      onFocus={() => setRegisterLastFocused(true)}
                      onBlur={() => setRegisterLastFocused(false)}
                      style={{
                        borderColor: registerLastFocused ? "#0066cc" : "#dedede",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        color: "#151515",
                        display: "inline-block",
                        fontFamily: "Prompt, sans-serif",
                        fontSize: "12px",
                        lineHeight: "13.8px",
                        padding: "12px 17px",
                        width: "100%",
                        height: "48px",
                        boxSizing: "border-box",
                        borderRadius: "0px"
                      }}
                      className="focus:outline-none transition-colors"
                      required
                    />
                    <label
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: (registerLastFocused || registerLastValue) ? "0" : "50%",
                        transform: "translateY(-50%)",
                        fontSize: (registerLastFocused || registerLastValue) ? "10px" : "12px",
                        color: registerLastFocused ? "#0066cc" : "#999999",
                        backgroundColor: "#ffffff",
                        padding: "0 6px",
                        fontFamily: "Prompt, sans-serif",
                        transition: "all 0.15s ease-out",
                        pointerEvents: "none",
                        lineHeight: "1"
                      }}
                    >
                      Last name
                    </label>
                  </div>
                </div>
                {/* Email Input */}
                <div className="relative inline-block text-left w-full max-w-[520px]" style={{ margin: "0px 0px 10px" }}>
                  <input
                    type="email"
                    value={registerEmailValue || ""}
                    onChange={(e) => setRegisterEmailValue(e.target.value)}
                    onFocus={() => setRegisterEmailFocused(true)}
                    onBlur={() => setRegisterEmailFocused(false)}
                    style={{
                      borderColor: registerEmailFocused ? "#0066cc" : "#dedede",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      color: "#151515",
                      display: "inline-block",
                      fontFamily: "Prompt, sans-serif",
                      fontSize: "12px",
                      lineHeight: "13.8px",
                      padding: "12px 17px",
                      width: "100%",
                      height: "48px",
                      boxSizing: "border-box",
                      borderRadius: "0px"
                    }}
                    className="focus:outline-none transition-colors"
                    required
                  />
                  <label
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: (registerEmailFocused || registerEmailValue) ? "0" : "50%",
                      transform: "translateY(-50%)",
                      fontSize: (registerEmailFocused || registerEmailValue) ? "10px" : "12px",
                      color: registerEmailFocused ? "#0066cc" : "#999999",
                      backgroundColor: "#ffffff",
                      padding: "0 6px",
                      fontFamily: "Prompt, sans-serif",
                      transition: "all 0.15s ease-out",
                      pointerEvents: "none",
                      lineHeight: "1"
                    }}
                  >
                    Email address
                  </label>
                </div>
                {/* Password Input */}
                <div className="relative inline-block text-left w-full max-w-[520px]" style={{ margin: "0px 0px 10px" }}>
                  <input
                    type="password"
                    value={registerPasswordValue || ""}
                    onChange={(e) => setRegisterPasswordValue(e.target.value)}
                    onFocus={() => setRegisterPasswordFocused(true)}
                    onBlur={() => setRegisterPasswordFocused(false)}
                    style={{
                      borderColor: registerPasswordFocused ? "#0066cc" : "#dedede",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      color: "#151515",
                      display: "inline-block",
                      fontFamily: "Prompt, sans-serif",
                      fontSize: "12px",
                      lineHeight: "13.8px",
                      padding: "12px 17px",
                      width: "100%",
                      height: "48px",
                      boxSizing: "border-box",
                      borderRadius: "0px"
                    }}
                    className="focus:outline-none transition-colors"
                    required
                  />
                  <label
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: (registerPasswordFocused || registerPasswordValue) ? "0" : "50%",
                      transform: "translateY(-50%)",
                      fontSize: (registerPasswordFocused || registerPasswordValue) ? "10px" : "12px",
                      color: registerPasswordFocused ? "#0066cc" : "#999999",
                      backgroundColor: "#ffffff",
                      padding: "0 6px",
                      fontFamily: "Prompt, sans-serif",
                      transition: "all 0.15s ease-out",
                      pointerEvents: "none",
                      lineHeight: "1"
                    }}
                  >
                    Password
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-neutral-800 transition-colors duration-200 focus:outline-none"
                  >
                    Create An Account
                  </button>
                </div>
              </form>

              {/* Redirect Link */}
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
