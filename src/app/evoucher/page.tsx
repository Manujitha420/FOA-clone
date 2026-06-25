"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Ruler, Plus, Star, Upload } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const DENOMINATIONS_LKR = [1000, 5000, 10000, 15000, 20000];
const DENOMINATIONS_USD = [3.33, 16.67, 33.33, 50, 66.67];

const DESCRIPTION_TEXT = [
  "This E-Gift Card is valid for use only on the foaclothing.com website only and is not allowed to be used at any of the FOA physical in-store locations.",
  "E-Gift Cards must be paid upfront through Credit or Debit Cards. Cash on Delivery is not available for E-Gift Cards. Your E-Gift Card will be e mailed to you as soon as we receive confirmation of payment.",
  "We do not allow cash refunds for any Online Gift Cards sold. They must be utilized through the website only.",
];

const FAQ_ITEMS = [
  {
    q: "WHAT PAYMENT METHODS CAN I USE?",
    a: "We accept Visa, Mastercard, Amex credit and debit cards. You can also pay via MintPay or Koko installments for eligible orders."
  },
  {
    q: "CAN I PURCHASE ITEMS WITH ANOTHER CURRENCY?",
    a: "Yes! Our website automatically detects your location and displays prices in LKR for local customers and USD for international customers."
  },
  {
    q: "CAN I MAKE CHANGES TO MY ORDER AFTER IT HAS BEEN PLACED?",
    a: "Unfortunately we are unable to make changes to an order once it has been placed. Please double check your order before completing your purchase."
  },
  {
    q: "DO YOU OFFER E-GIFT CARDS FOR INTERNATIONAL CUSTOMERS?",
    a: "Yes, E-Gift Cards are available for international customers. The value will be displayed in USD based on your location."
  },
  {
    q: "HOW DO I SET UP A SUBSCRIPTION ORDER?",
    a: "Subscription orders are not currently available. Stay tuned for updates on our website and social media channels."
  },
  {
    q: "HOW DO I RETURN MY ITEMS?",
    a: "We offer a 7-day exchange window from the date of delivery. Items must be unworn, unwashed, and in original packaging. Please contact our support team to initiate an exchange."
  },
];

export default function EVoucherPage() {
  const { currency } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sendAsGift, setSendAsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  // Review state
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewMedia, setReviewMedia] = useState<File | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const denominations = currency === "LKR" ? DENOMINATIONS_LKR : DENOMINATIONS_USD;
  const selectedValue = denominations[selectedIdx];

  const formatPrice = (val: number) => {
    if (currency === "LKR") {
      return `Rs ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${val.toFixed(2)}`;
  };

  const getKokoSplit = () => {
    const lkrVal = DENOMINATIONS_LKR[selectedIdx];
    const split = lkrVal / 3;
    return `Rs ${split.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <CartDrawer />

      {/* Content Container */}
      <main className="flex-1 pt-36 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <nav className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black">E - VOUCHER</span>
          </nav>
        </div>

        {/* Purchase Workspace */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="relative w-full max-w-[580px] mx-auto">
              {/* Card Face */}
              <div className="bg-black flex flex-col items-center justify-center py-20 px-12">
                {/* Logo */}
                <div className="flex items-center space-x-4 mb-10">
                  <span className="text-white text-5xl font-black tracking-[-0.02em]">F</span>
                  <span className="text-white text-3xl font-light">·</span>
                  <span className="text-white text-5xl font-black tracking-[-0.02em]">O</span>
                  <span className="text-white text-3xl font-light">·</span>
                  <span className="text-white text-5xl font-black tracking-[-0.02em]">A</span>
                </div>
                <p className="text-white text-xl font-light tracking-[0.3em] uppercase">E - GIFT CARD</p>
              </div>
              {/* Card Footer */}
              <div className="bg-neutral-200 py-4 text-center">
                <p className="text-[13px] font-medium text-neutral-600 tracking-wide">
                  Valid for use on the FOACLOTHING.COM website only
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Options */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-black uppercase tracking-[0.15em] text-[#111]">
              E – VOUCHER
            </h1>

            {/* Price */}
            <div>
              <p className="text-2xl font-black text-[#111]">
                {formatPrice(selectedValue)}
              </p>
              {currency === "LKR" && (
                <div className="mt-2 space-y-0.5">
                  <p className="text-[11px] text-neutral-500 font-semibold">
                    3 X {getKokoSplit()} or 4.5% Cashback with{" "}
                    <span className="bg-[#1b2240] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-widest">
                      mintpay
                    </span>
                    {" "}ⓘ
                  </p>
                  <p className="text-[11px] text-neutral-500 font-semibold">
                    or pay in 3 x {getKokoSplit()} with{" "}
                    <span className="bg-[#f4c900] text-black text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest">
                      koko
                    </span>
                    {" "}ⓘ
                  </p>
                </div>
              )}
            </div>

            {/* Denomination Selector */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold tracking-widest text-[#111] uppercase">
                Denomination
              </label>
              <div className="flex flex-wrap gap-2">
                {denominations.map((val, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-4 py-2 border text-xs tracking-wider uppercase transition-colors font-medium ${
                      selectedIdx === idx
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-[#111] hover:text-black"
                    }`}
                  >
                    {formatPrice(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Block */}
            <div className="border-t border-b border-neutral-200">
              <button
                onClick={() => setDescriptionOpen(!descriptionOpen)}
                className="w-full py-4 flex items-center justify-between text-[11px] font-black tracking-widest text-[#111] uppercase hover:opacity-70 transition-opacity"
              >
                <span>Description</span>
                {descriptionOpen ? (
                  <span className="text-base font-light">−</span>
                ) : (
                  <Plus className="h-4 w-4 flex-shrink-0" />
                )}
              </button>
              {descriptionOpen && (
                <div className="px-4 pb-4 border-t border-neutral-100">
                  <div className="pt-3 space-y-2">
                    {DESCRIPTION_TEXT.map((line, i) => (
                      <p key={i} className="text-[12px] text-neutral-700 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gift Options */}
            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer w-fit group">
                <input
                  type="checkbox"
                  checked={sendAsGift}
                  onChange={(e) => setSendAsGift(e.target.checked)}
                  className="h-4 w-4 border border-neutral-400 rounded-sm cursor-pointer accent-[#2563eb]"
                />
                <span className="text-[12px] font-medium text-neutral-600 group-hover:text-black transition-colors">
                  I want to send this as a gift
                </span>
              </label>

              {sendAsGift && (
                <div className="space-y-3">
                  {/* Recipient email */}
                  <input
                    type="email"
                    placeholder="Recipient email"
                    className="w-full border border-neutral-300 px-4 py-3.5 text-[13px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:border-[#2563eb] transition-colors"
                  />

                  {/* Recipient name */}
                  <input
                    type="text"
                    placeholder="Recipient name (optional)"
                    className="w-full border border-neutral-300 px-4 py-3.5 text-[13px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:border-[#2563eb] transition-colors"
                  />

                  {/* Message textarea */}
                  <div className="space-y-1">
                    <textarea
                      placeholder="Message (optional)"
                      maxLength={200}
                      rows={6}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      value={giftMessage}
                      className="w-full border border-neutral-300 px-4 py-3.5 text-[13px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:border-[#2563eb] transition-colors resize-y"
                    />
                    <p className="text-[12px] font-semibold text-neutral-600">
                      {giftMessage.length}/200 characters max
                    </p>
                  </div>

                  {/* Send on date */}
                  <div className="relative border border-neutral-300 px-4 pb-3 pt-2">
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Send on (optional)
                    </label>
                    <input
                      type="date"
                      className="w-full text-[13px] text-neutral-700 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Cart Controls */}
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-neutral-300 h-11">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 h-full text-lg font-light hover:bg-neutral-100 transition-colors"
                >
                  −
                </button>
                <span className="px-4 text-[13px] font-bold text-[#111] min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 h-full text-lg font-light hover:bg-neutral-100 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add To Cart */}
              <button className="flex-1 h-11 bg-white text-[#111] text-[11px] font-black tracking-[0.2em] uppercase border border-[#111] hover:bg-[#111] hover:text-white transition-all duration-200 rounded-full">
                Add to Cart
              </button>
            </div>

            {/* Wishlist Button */}
            <button className="w-full h-11 bg-white text-[#111] text-[11px] font-black tracking-[0.2em] uppercase border border-[#111] hover:bg-[#111] hover:text-white transition-all duration-200 rounded-full">
              Add to Wishlist
            </button>

            {/* Shipping Tag */}
            <div className="flex items-center space-x-3 py-3 border-t border-neutral-100">
              <div className="text-[11px] text-neutral-500 font-semibold flex items-center space-x-2">
                <span>🚚</span>
                <span>Free shipping for orders above Rs.9999.00</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Customer Reviews ── */}
      <section className="border-t border-neutral-200 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[22px] font-semibold tracking-wide text-[#111] mb-8">
            Customer Reviews
          </h2>

          {/* Average rating row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-5 w-5 text-neutral-300" />
                ))}
              </div>
              <p className="text-[12px] text-neutral-500 font-medium">Be the first to write a review</p>
            </div>
            <button
              onClick={() => setReviewOpen((v) => !v)}
              className={`px-8 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-200 ${
                reviewOpen
                  ? "bg-white text-[#111] border border-[#111]"
                  : "bg-[#111] text-white hover:bg-neutral-800"
              }`}
            >
              {reviewOpen ? "Cancel review" : "Write a review"}
            </button>
          </div>

          {/* Write a Review form */}
          {reviewOpen && (
            <div className="mt-10 max-w-xl mx-auto">
              <h3 className="text-center text-[20px] font-semibold tracking-wide text-[#111] mb-8">Write a review</h3>

              {/* Star rating picker */}
              <div className="flex flex-col items-center mb-6">
                <p className="text-[12px] font-semibold text-neutral-500 mb-2">Rating</p>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setReviewHover(s)}
                      onMouseLeave={() => setReviewHover(0)}
                      onClick={() => setReviewRating(s)}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          s <= (reviewHover || reviewRating)
                            ? "fill-[#111] text-[#111]"
                            : "text-neutral-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div className="mb-4">
                <label className="block text-center text-[11px] font-semibold text-neutral-500 mb-2">
                  Review Title (100)
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full border border-neutral-300 px-3 py-2.5 text-[13px] text-[#111] focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>

              {/* Review content */}
              <div className="mb-4">
                <label className="block text-center text-[11px] font-semibold text-neutral-500 mb-2">
                  Review content
                </label>
                <textarea
                  rows={5}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full border border-neutral-300 px-3 py-2.5 text-[13px] text-[#111] focus:outline-none focus:border-[#111] transition-colors resize-y"
                />
              </div>

              {/* Picture/Video upload */}
              <div className="mb-4">
                <label className="block text-center text-[11px] font-semibold text-neutral-500 mb-2">
                  Picture/Video (optional)
                </label>
                <div
                  onClick={() => mediaInputRef.current?.click()}
                  className="flex items-center justify-center border border-neutral-300 py-6 cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex flex-col items-center gap-1 text-neutral-400">
                    <Upload className="h-8 w-8" />
                    {reviewMedia && (
                      <p className="text-[11px] text-neutral-600 font-medium mt-1">{reviewMedia.name}</p>
                    )}
                  </div>
                </div>
                <input
                  ref={mediaInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => setReviewMedia(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Display name */}
              <div className="mb-4">
                <label className="block text-center text-[11px] font-semibold text-neutral-500 mb-2">
                  Display name (displayed publicly like John Smith ∨)
                </label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border border-neutral-300 px-3 py-2.5 text-[13px] text-[#111] focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="mb-8">
                <label className="block text-center text-[11px] font-semibold text-neutral-500 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  className="w-full border border-neutral-300 px-3 py-2.5 text-[13px] text-[#111] focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setReviewOpen(false)}
                  className="flex-1 py-3 text-[11px] font-black tracking-[0.2em] uppercase border border-[#111] text-[#111] hover:bg-neutral-100 transition-colors"
                >
                  Cancel review
                </button>
                <button
                  className="flex-1 py-3 text-[11px] font-black tracking-[0.2em] uppercase bg-[#111] text-white hover:bg-neutral-800 transition-colors"
                >
                  Submit review
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-neutral-200 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[28px] font-semibold tracking-[0.05em] text-[#111] mb-2">
            F.A.Q.
          </h2>
          <p className="text-center text-[13px] text-neutral-500 font-medium mb-12">
            Heres what our customers usually ask us while shopping
          </p>

          <div className="divide-y divide-neutral-200">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-[11px] font-black tracking-[0.18em] uppercase text-[#111] group-hover:opacity-70 transition-opacity">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-4 w-4 flex-shrink-0 ml-4 text-[#111] transition-transform duration-200 ${
                      openFaq === idx ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="pb-5 pr-8">
                    <p className="text-[13px] text-neutral-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
