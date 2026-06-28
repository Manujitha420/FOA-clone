"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Ruler, Plus, Star, Upload, Heart } from "lucide-react";
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

interface ColorSwatch {
  name: string;
  hex: string;
}

interface YouMayLikeProduct {
  id: string;
  title: string;
  priceLKR: number;
  originalPriceLKR?: number;
  colors: ColorSwatch[];
  image: string;
  installments: {
    mintpay: string;
    koko: string;
  };
  sale?: boolean;
  discount?: string;
}

const YOU_MAY_ALSO_LIKE_PRODUCTS: YouMayLikeProduct[] = [
  {
    id: "crossbody-bag-2",
    title: "CROSSBODY BAG 2.0",
    priceLKR: 2450,
    originalPriceLKR: 3500,
    colors: [
      { name: "Charcoal", hex: "#4b5563" },
      { name: "Brown", hex: "#8b5a2b" },
      { name: "Navy", hex: "#2b3c5a" }
    ],
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 816.66 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 816.66 with"
    },
    sale: true,
    discount: "30% OFF"
  },
  {
    id: "foa-tote-bag",
    title: "F.O.A TOTE BAG",
    priceLKR: 2500,
    colors: [
      { name: "Black", hex: "#151515" }
    ],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 833.33 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 833.33 with"
    }
  },
  {
    id: "foa-hydrojug-1l",
    title: "F.O.A HYDROJUG 1L",
    priceLKR: 4500,
    colors: [
      { name: "Black", hex: "#191919" }
    ],
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,500.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,500.00 with"
    }
  },
  {
    id: "foa-active-shorts",
    title: "F.O.A ACTIVE SHORTS",
    priceLKR: 3900,
    colors: [
      { name: "Grey", hex: "#6b7280" },
      { name: "Black", hex: "#151515" }
    ],
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    installments: {
      mintpay: "3 X Rs 1,300.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,300.00 with"
    }
  }
];

export default function EVoucherPage() {
  const { currency } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sendAsGift, setSendAsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [youMayLikeWishlist, setYouMayLikeWishlist] = useState<string[]>([]);
  const [youMayLikeActiveColors, setYouMayLikeActiveColors] = useState<Record<string, string>>({});

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
      <main className="flex-1 pt-44 pb-20">
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
            <div className="relative w-full max-w-[710px] mx-auto aspect-square overflow-hidden bg-neutral-50">
              <Image
                src="https://foaclothing.com/cdn/shop/files/FOA-E-Voucher_29df68fa-be21-4088-976a-524745103013.jpg?v=1754043382&width=540"
                alt="FOA E-Voucher"
                fill
                className="object-contain"
                sizes="(max-width: 710px) 100vw, 710px"
              />
            </div>
          </div>

          {/* Right Column: Pricing & Options */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-black uppercase tracking-[0.15em] text-[#111]"
              style={{
                color: "#151515",
                fontFamily: "Prompt",
                fontSize: "28px",
                fontWeight: 500,
                lineHeight: "34px",
                margin: "0px 0px 25px",
                textTransform: "uppercase"
              }}
            >
              E – VOUCHER
            </h1>

            {/* Price Section */}
            <div
              style={{
                width: "480px",
                height: "151px",
                maxWidth: "100%",
                color: "#151515",
                fontFamily: "Prompt, sans-serif",
                fontSize: "17px",
                fontWeight: 300,
                lineHeight: "27.2px"
              }}
            >
              <div className="mb-1">
                <span
                  style={{
                    color: "#151515",
                    display: "inline-block",
                    fontSize: "22.4px",
                    fontWeight: 550,
                    letterSpacing: "0.448px",
                    lineHeight: "35.84px",
                    width: "auto",
                    minWidth: "127px",
                    height: "25px",
                    whiteSpace: "nowrap"
                  }}
                >
                  {formatPrice(selectedValue)}
                </span>
              </div>

              {currency === "LKR" && (
                <div className="mt-3 space-y-1.5">
                  {/* Mintpay */}
                  <div
                    className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider"
                    style={{
                      fontFamily: "Prompt, sans-serif",
                      letterSpacing: "0.3px",
                      lineHeight: "13px",
                      textAlign: "left"
                    }}
                  >
                    <span>3 X {getKokoSplit()} or 4.5% Cashback with</span>
                    <a href="https://mintpay.lk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      <img
                        src="https://s3.amazonaws.com/bizenglish/wp-content/uploads/2022/10/28174525/Mintpay-Logo.jpg"
                        alt="Mintpay"
                        className="h-3.5 w-auto object-contain mix-blend-multiply"
                      />
                    </a>
                    <a href="https://mintpay.lk/education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                        alt="Info"
                        className="h-3 w-3 object-contain"
                      />
                    </a>
                  </div>

                  {/* Koko */}
                  <div
                    className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider"
                    style={{
                      fontFamily: "Prompt, sans-serif",
                      letterSpacing: "0.3px",
                      lineHeight: "13px",
                      textAlign: "left"
                    }}
                  >
                    <span>or pay in 3 x {getKokoSplit()} with</span>
                    <a href="https://paykoko.com/customer-education?Amount=100" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      <img
                        src="https://qa-merchant.paykoko.com/assets/images/logo.png"
                        alt="Koko"
                        className="h-3.5 w-auto object-contain mix-blend-multiply"
                      />
                    </a>
                    <a href="https://paykoko.com/customer-education?Amount=100" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                        alt="Info"
                        className="h-3 w-3 object-contain"
                      />
                    </a>
                  </div>
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
                    className={`px-4 py-2 border text-xs tracking-wider uppercase transition-colors font-medium ${selectedIdx === idx
                      ? "border-[#111] bg-[#111] text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-[#111] hover:text-black"
                      }`}
                    style={{
                      borderRadius: "300px"
                    }}
                  >
                    {formatPrice(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Block */}
            <div className="border-t border-b border-neutral-200">
              {/* Size Chart Link */}
              <button
                className="w-full py-4 flex items-center space-x-2 text-[11px] font-black tracking-widest text-[#111] uppercase hover:opacity-70 transition-opacity border-b border-neutral-200"
              >
                <Ruler className="h-4 w-4 text-[#111] stroke-[1.5]" />
                <span
                  style={{
                    color: "#151515",
                    display: "inline",
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "14px",
                    textAlign: "center"

                  }}>
                  SIZE CHART
                </span>
              </button>

              {/* Description Accordion */}
              <button
                onClick={() => setDescriptionOpen(!descriptionOpen)}
                className="w-full py-4 flex items-center justify-between text-[11px] font-black tracking-widest text-[#111] uppercase hover:opacity-70 transition-opacity"
              >
                <span
                  style={{
                    color: "#151515",
                    display: "inline",
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "14px",
                    textAlign: "center"

                  }}
                >Description</span>
                {descriptionOpen ? (
                  <span className="text-base font-light">−</span>
                ) : (
                  <Plus className="h-4 w-4 flex-shrink-0" />
                )}
              </button>
              {descriptionOpen && (
                <div className="px-4 pb-4 border-t border-neutral-100">
                  <div className="pt-3 space-y-1">
                    {DESCRIPTION_TEXT.map((line, i) => (
                      <p
                        key={i}
                        style={{
                          color: "#151515",
                          fontFamily: "Prompt, sans-serif",
                          fontSize: "15px",
                          fontWeight: 300,
                          lineHeight: "24px"
                        }}
                      >
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
                <span
                  style={{
                    color: "#151515",
                    display: "inline",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "20.8px"
                  }}
                >
                  I want to send this as a gift
                </span>
              </label>

              {sendAsGift && (
                <div className="space-y-4 pt-2">
                  {/* Recipient email */}
                  <div className="relative">
                    <input
                      type="email"
                      id="recipient-email"
                      placeholder=" "
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="peer w-full border border-neutral-300 px-4 py-3.5 text-[13px] text-neutral-700 focus:outline-none focus:border-[#2563eb] transition-colors bg-white"
                    />
                    <label
                      htmlFor="recipient-email"
                      className="absolute left-4 top-0 -translate-y-1/2 text-[11px] text-neutral-400 pointer-events-none transition-all duration-200 bg-white px-1.5
                                 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:translate-y-0
                                 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-focus:text-[#2563eb]"
                    >
                      Recipient email
                    </label>
                  </div>

                  {/* Recipient name */}
                  <div className="relative">
                    <input
                      type="text"
                      id="recipient-name"
                      placeholder=" "
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="peer w-full border border-neutral-300 px-4 py-3.5 text-[13px] text-neutral-700 focus:outline-none focus:border-[#2563eb] transition-colors bg-white"
                    />
                    <label
                      htmlFor="recipient-name"
                      className="absolute left-4 top-0 -translate-y-1/2 text-[11px] text-neutral-400 pointer-events-none transition-all duration-200 bg-white px-1.5
                                 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:translate-y-0
                                 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-focus:text-[#2563eb]"
                    >
                      Recipient name (optional)
                    </label>
                  </div>

                  {/* Message textarea */}
                  <div className="relative space-y-1">
                    <textarea
                      id="gift-message"
                      placeholder=" "
                      maxLength={200}
                      rows={6}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      value={giftMessage}
                      className="peer w-full border border-neutral-300 px-4 py-3.5 text-[13px] text-neutral-700 focus:outline-none focus:border-[#2563eb] transition-colors resize-y bg-white"
                    />
                    <label
                      htmlFor="gift-message"
                      className="absolute left-4 top-0 -translate-y-1/2 text-[11px] text-neutral-400 pointer-events-none transition-all duration-200 bg-white px-1.5
                                 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:translate-y-0
                                 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-focus:text-[#2563eb]"
                    >
                      Message (optional)
                    </label>
                    <p className="text-[12px] font-semibold text-neutral-600">
                      {giftMessage.length}/200 characters max
                    </p>
                  </div>

                  {/* Send on date */}
                  <div className="relative border border-neutral-300 px-4 pb-3 pt-2 bg-white">
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
              <div className="flex items-center border border-neutral-300 h-11 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 h-full text-lg font-light hover:bg-neutral-100 "
                >
                  −
                </button>
                <span className="px-4 text-[13px] font-bold text-[#111] min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 h-full text-lg font-light hover:bg-neutral-100 "
                >
                  +
                </button>
              </div>

              {/* Add To Cart */}
              <button
                className="flex-1 h-11 border border-[#151515] bg-[#151515] text-white hover:bg-transparent hover:text-[#151515] transition-all duration-300 rounded-full"
                style={{
                  fontFamily: "Prompt, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.28px",
                  lineHeight: "14px",
                  textAlign: "center",
                  textTransform: "uppercase"
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              className="w-full h-11 border border-[#151515] bg-[#151515] text-white hover:bg-transparent hover:text-[#151515] transition-all duration-300 rounded-full"
              style={{
                fontFamily: "Prompt, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.28px",
                lineHeight: "14px",
                textAlign: "center",
                textTransform: "uppercase"
              }}
            >
              Add to Wishlist
            </button>

            {/* Shipping Tag */}
            <div className="flex items-center space-x-3 py-3 border-t border-neutral-100">
              <div className="text-[11px] text-neutral-500 font-semibold flex items-center space-x-2">
                <Image src="https://cdn.shopify.com/s/files/1/0750/4415/9772/files/free_delivery.png?v=1761649926" alt="Free Delivery" width={20} height={20} className="object-contain" />
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
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 text-neutral-300" />
                ))}
              </div>
              <p className="text-[12px] text-neutral-500 font-medium">Be the first to write a review</p>
            </div>
            <button
              onClick={() => setReviewOpen((v) => !v)}
              className={`px-8 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-200 ${reviewOpen
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
                <p
                  style={{
                    color: "#151515",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "18.2px",
                    margin: "0px 0px 8px",
                    textAlign: "center"
                  }}
                >Rating</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setReviewHover(s)}
                      onMouseLeave={() => setReviewHover(0)}
                      onClick={() => setReviewRating(s)}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${s <= (reviewHover || reviewRating)
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
                <label
                  style={{
                    color: "#151515",
                    display: "block",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "18.2px",
                    margin: "0px 0px 8px",
                    textAlign: "center"
                  }}>
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
                <label
                  style={{
                    color: "#151515",
                    display: "block",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "18.2px",
                    margin: "0px 0px 8px",
                    textAlign: "center"
                  }}>
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
                <label
                  style={{
                    color: "#151515",
                    display: "block",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "18.2px",
                    margin: "0px 0px 8px",
                    textAlign: "center"
                  }}>
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
                <label
                  style={{
                    color: "#151515",
                    display: "block",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "18.2px",
                    margin: "0px 0px 8px",
                    textAlign: "center"
                  }}>
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
                <label
                  style={{
                    color: "#151515",
                    display: "block",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    letterSpacing: "0.26px",
                    lineHeight: "18.2px",
                    margin: "0px 0px 8px",
                    textAlign: "center"
                  }}>
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
              <div className="flex items-center justify-center gap-4 w-full mt-6">
                <button
                  onClick={() => setReviewOpen(false)}
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#000",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    display: "inline-block",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    lineHeight: "16px",
                    padding: "10px 20px",
                    textAlign: "center",
                    width: "151px",
                    height: "40px",
                    color: "#000",
                    fontSize: "12px"
                  }}
                >
                  Cancel review
                </button>
                <button
                  style={{
                    alignItems: "center",
                    backgroundColor: "#000",
                    borderColor: "#000",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    color: "#fff",
                    display: "inline-flex",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    justifyContent: "center",
                    letterSpacing: "0.32px",
                    lineHeight: "16px",
                    padding: "10px 20px",
                    textAlign: "center",
                    textTransform: "uppercase",
                    width: "177px",
                    height: "48px",
                    fontSize: "12px"
                  }}
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
          <p
            style={{
              color: "#151515",
              fontFamily: "Arial, sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: "27.2px",
              textAlign: "center"
            }}
            className="mb-12"
          >
            Heres what our customers usually ask us while shopping
          </p>

          <div className="divide-y divide-neutral-200">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span
                    style={{
                      color: "#151515",
                      display: "inline-block",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.32px",
                      lineHeight: "16px",
                      padding: "18px 40px 18px 0px",
                      textTransform: "uppercase"
                    }}
                    className="group-hover:opacity-70 transition-opacity"
                  >
                    {item.q}
                  </span>
                  <Plus
                    className={`h-4 w-4 flex-shrink-0 ml-4 text-[#111] transition-transform duration-200 ${openFaq === idx ? "rotate-45" : ""
                      }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="pb-5 pr-8">
                    <p
                      style={{
                        color: "#151515",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "15px",
                        fontWeight: 300,
                        lineHeight: "24px"
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── You May Also Like ── */}
      <section className="border-t border-neutral-200 py-20 px-6 bg-white w-full">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-left mb-12">
            <h2
              style={{
                color: "#151515",
                display: "inline-block",
                fontFamily: "Prompt, sans-serif",
                fontSize: "40px",
                fontWeight: 600,
                lineHeight: "48px",
                textTransform: "uppercase"
              }}
            >
              YOU MAY ALSO LIKE
            </h2>
            <p
              style={{
                color: "#151515",
                fontFamily: "Prompt, sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: "22px",
                marginTop: "6px"
              }}
            >
              Combine your style with these products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {YOU_MAY_ALSO_LIKE_PRODUCTS.map((product) => {
              const isWishlisted = youMayLikeWishlist.includes(product.id);
              const selectedColor = youMayLikeActiveColors[product.id] || product.colors[0].hex;

              return (
                <div
                  key={product.id}
                  className="flex flex-col text-left group"
                  style={{
                    color: "#151515",
                    fontSize: "14px",
                    fontFamily: "Prompt, sans-serif"
                  }}
                >
                  {/* Image Box */}
                  <div className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Sale and Discount Badges */}
                    {product.sale && (
                      <>
                        <div className="absolute top-0 left-0 bg-black text-white text-[9px] font-bold px-2.5 py-1 z-10 uppercase tracking-wider">
                          {product.discount}
                        </div>
                        <div className="absolute top-4 right-14 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10 uppercase tracking-widest scale-90">
                          SALE
                        </div>
                      </>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => {
                        setYouMayLikeWishlist((prev) =>
                          prev.includes(product.id)
                            ? prev.filter((id) => id !== product.id)
                            : [...prev, product.id]
                        );
                      }}
                      className="absolute top-4 right-4 z-20 transition-transform duration-200 hover:scale-110 active:scale-95"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`h-6 w-6 stroke-[1.2] transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-[#151515] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                          }`}
                      />
                    </button>

                    {/* Quick View slide-up overlay */}
                    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <button className="w-full bg-[#151515] text-white py-3 text-[11px] font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors">
                        QUICK VIEW
                      </button>
                    </div>
                  </div>

                  {/* Details Wrapper */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      {/* Title & Info */}
                      <h3 className="font-semibold text-[13px] tracking-wide text-neutral-800 uppercase mb-1">
                        {product.title}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-1.5">
                        {product.originalPriceLKR && (
                          <span className="text-[12px] text-neutral-400 line-through font-light">
                            Rs {product.originalPriceLKR.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                        <span className="text-[13px] font-bold text-[#151515]">
                          Rs {product.priceLKR.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>

                      {/* Mintpay Row */}
                      {currency === "LKR" && (
                        <div
                          className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-0.5"
                          style={{
                            fontFamily: "Prompt, sans-serif",
                            letterSpacing: "0.3px",
                            lineHeight: "13px"
                          }}
                        >
                          <span>3 X Rs {(product.priceLKR / 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} or 4.5% Cashback with</span>
                          <a href="https://mintpay.lk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                            <img
                              src="https://s3.amazonaws.com/bizenglish/wp-content/uploads/2022/10/28174525/Mintpay-Logo.jpg"
                              alt="Mintpay"
                              className="h-3 w-auto object-contain mix-blend-multiply"
                            />
                          </a>
                          <a href="https://mintpay.lk/education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                              alt="Info"
                              className="h-2.5 w-2.5 object-contain"
                            />
                          </a>
                        </div>
                      )}

                      {/* Koko Row */}
                      {currency === "LKR" && (
                        <div
                          className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-3"
                          style={{
                            fontFamily: "Prompt, sans-serif",
                            letterSpacing: "0.3px",
                            lineHeight: "13px"
                          }}
                        >
                          <span>or pay in 3 x Rs {(product.priceLKR / 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with</span>
                          <a href="https://paykoko.com/customer-education?Amount=100" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                            <img
                              src="https://qa-merchant.paykoko.com/assets/images/logo.png"
                              alt="Koko"
                              className="h-3 w-auto object-contain mix-blend-multiply"
                            />
                          </a>
                          <a href="https://paykoko.com/customer-education?Amount=100" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                              alt="Info"
                              className="h-2.5 w-2.5 object-contain"
                            />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Color Swatches */}
                    {product.colors.length > 1 && (
                      <div className="flex items-center gap-1.5 pt-2 mb-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.hex}
                            onClick={() => {
                              setYouMayLikeActiveColors((prev) => ({
                                ...prev,
                                [product.id]: color.hex
                              }));
                            }}
                            className={`w-5 h-5 border p-[1.5px] transition-all ${selectedColor === color.hex ? "border-black" : "border-neutral-200"
                              }`}
                          >
                            <div className="w-full h-full" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ADD TO CART Button */}
                  <button
                    className="mt-4 w-fit px-8 h-11 flex items-center justify-center border border-[#151515] bg-[#151515] text-white rounded-full"
                    style={{
                      fontFamily: "Prompt, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.28px",
                      lineHeight: "14px",
                      textTransform: "uppercase"
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Linen Collection Banner ── */}
      <section
        className="w-full relative overflow-hidden flex flex-col justify-center items-center"
        style={{
          height: "650px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('https://foaclothing.com/cdn/shop/files/img.png?v=1777363868')`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <span
            style={{
              color: "#fff",
              fontFamily: "Prompt, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "6px",
              lineHeight: "24px",
              textTransform: "uppercase",
              marginBottom: "12px"
            }}
          >
            LATEST DROP
          </span>
          <h2
            style={{
              color: "#fff",
              fontFamily: "Prompt, sans-serif",
              fontSize: "52px",
              fontWeight: 600,
              lineHeight: "60px",
              textTransform: "uppercase",
              marginBottom: "24px"
            }}
          >
            LINEN COLLECTION
          </h2>
          <button
            className="bg-white text-black border hover:bg-black hover:text-white transition-colors duration-300"
            style={{
              borderRadius: "50px",
              fontFamily: "Prompt, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.28px",
              lineHeight: "22px",
              padding: "10px 32px",
              textTransform: "uppercase"
            }}
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* ── Marquee Ticker Banner ── */}
      <div
        className="w-full overflow-hidden select-none flex whitespace-nowrap marquee-container py-8 bg-[#1b1c24] border-b border-neutral-900"
      >
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes tickerMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .ticker-track {
            display: flex;
            flex-shrink: 0;
            animation: tickerMarquee 100s linear infinite;
          }
        `}} />
        <div className="ticker-track">
          {[...Array(8)].map((_, idx) => (
            <span
              key={idx}
              className="text-[#ecebe6] font-bold flex items-center"
              style={{
                fontFamily: "Prompt, sans-serif",
                fontSize: "44px",
                fontWeight: 700,
                letterSpacing: "4px",
                padding: "0px 30px",
                textTransform: "uppercase"
              }}
            >
              FREEDOM OVER ANYTHING <span className="inline-block ml-8 text-[36px]">✪</span>
            </span>
          ))}
        </div>
        <div className="ticker-track" aria-hidden="true">
          {[...Array(8)].map((_, idx) => (
            <span
              key={idx}
              className="text-[#ecebe6] font-bold flex items-center"
              style={{
                fontFamily: "Prompt, sans-serif",
                fontSize: "44px",
                fontWeight: 700,
                letterSpacing: "4px",
                padding: "0px 30px",
                textTransform: "uppercase"
              }}
            >
              FREEDOM OVER ANYTHING <span className="inline-block ml-8 text-[36px]">✪</span>
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
