"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const QuickViewDrawer: React.FC = () => {
  const {
    isQuickViewOpen,
    setQuickViewOpen,
    quickViewProduct,
    setQuickViewProduct,
    currency,
    addToCart,
  } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Available size options to match visual crossed-out spec
  const defaultSizes = ["S", "M", "L", "XL", "2XL"];

  // Available colors/swatches (with default colors to display swatches on the drawer)
  const defaultColors = [
    { name: "LINEAR TEE 01", colorCode: "#ffffff" },
    { name: "LINEAR TEE 02", colorCode: "#e5e5e5" },
    { name: "LINEAR TEE 03", colorCode: "#404040" }
  ];

  // Reset local form values when product changes
  useEffect(() => {
    if (quickViewProduct) {
      const productSizes = quickViewProduct.sizes || defaultSizes;
      // Pre-select first available size
      const availableSize = productSizes.find((s: string) => defaultSizes.includes(s)) || productSizes[0] || "M";
      setSelectedSize(availableSize);
      setSelectedColor(quickViewProduct.color || defaultColors[0].name);
      setQuantity(1);
      setErrorMsg("");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !isQuickViewOpen) return null;

  // Format price
  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `Rs ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  // Compile image list: prioritize multi-images, then hoverImage, then main image
  const productImages: string[] = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : quickViewProduct.hoverImage
      ? [quickViewProduct.image, quickViewProduct.hoverImage]
      : [quickViewProduct.image];

  // Resolve sizes for current product
  const productSizes: string[] = quickViewProduct.sizes && quickViewProduct.sizes.length > 0
    ? quickViewProduct.sizes
    : defaultSizes; // Fallback

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg("Please select a size");
      return;
    }
    setErrorMsg("");

    addToCart({
      id: quickViewProduct.id,
      title: quickViewProduct.title,
      priceLKR: quickViewProduct.priceLKR,
      priceUSD: quickViewProduct.priceUSD || (quickViewProduct.priceLKR / 300), // fallback USD
      image: quickViewProduct.image || productImages[0],
      selectedSize: selectedSize,
    });

    // Close Quick View
    setQuickViewOpen(false);
  };

  // Drawer slide animations
  const imagesPanelVariants = {
    closed: {
      x: "200%",
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.45,
        delay: 0.15,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  } as const;

  const optionsPanelVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.4,
        delay: 0.15,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  } as const;

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs cursor-pointer"
        />
      )}

      {isQuickViewOpen && (
        <div
          className="fixed top-0 bottom-0 right-0 z-55 flex flex-row pointer-events-none overflow-hidden h-full"
        >

          {/* Left Side: Scrollable Product Images Column */}
          <motion.div
            variants={imagesPanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="hidden md:flex w-[480px] bg-neutral-50 border-r border-neutral-200 pointer-events-auto h-full flex-col z-40 shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200"
          >
            <div className="flex flex-col space-y-0 w-full">
              {productImages.map((imgSrc, index) => (
                <div key={index} className="relative aspect-[3/4] w-full bg-neutral-100 flex-shrink-0">
                  <Image
                    src={imgSrc}
                    alt={`${quickViewProduct.title} - view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="480px"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Select Options Panel */}
          <motion.div
            variants={optionsPanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="relative w-[420px] max-w-[95vw] bg-white pointer-events-auto h-full flex-col z-55 shadow-2xl flex overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-[15px] font-medium uppercase tracking-[0.1em] text-[#151515]">
                Select Options
              </h2>
              <button
                onClick={() => setQuickViewOpen(false)}
                className="text-[#111111] hover:opacity-75 p-1 transition-opacity cursor-pointer"
                aria-label="Close options"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable details form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              <div>
                {/* Product Title */}
                <h1 className="text-[28px] font-bold uppercase tracking-[0.05em] text-[#151515] leading-tight mb-2">
                  {quickViewProduct.title}
                </h1>

                {/* Price */}
                <p className="text-[20px] font-semibold text-neutral-900 mb-4">
                  {formattedPrice(currency === "LKR" ? quickViewProduct.priceLKR : (quickViewProduct.priceUSD || (quickViewProduct.priceLKR / 300)))}
                </p>

                {/* Installment details */}
                {currency === "LKR" && (
                  <div className="space-y-1.5 py-3 border-t border-b border-neutral-100 text-[10px] leading-tight text-neutral-500 font-bold uppercase tracking-wider">
                    {/* MintPay row */}
                    <div className="flex items-center flex-wrap gap-1">
                      <span>
                        3 x Rs {((quickViewProduct.priceLKR) / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} or 4.5% Cashback with
                      </span>
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
                    {/* Koko row */}
                    <div className="flex items-center flex-wrap gap-1">
                      <span>
                        or pay in 3 x Rs {((quickViewProduct.priceLKR) / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with
                      </span>
                      <a href="https://paykoko.com/customer-education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                        <img
                          src="https://business360.lk/wp-content/uploads/2025/01/MAINLogo-HD_H.png"
                          alt="Koko"
                          className="h-3.5 w-auto object-contain mix-blend-multiply"
                        />
                      </a>
                      <a href="https://paykoko.com/customer-education" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                          alt="Info"
                          className="h-3 w-3 object-contain"
                        />
                      </a>
                    </div>
                  </div>
                )}

                {/* Shipping calculated at checkout */}
                <div className="mt-3 text-[12px] text-neutral-500 font-medium">
                  <span className="underline cursor-pointer hover:text-black">Shipping</span> calculated at checkout.
                </div>

                {/* Ratings */}
                <div className="flex items-center space-x-1.5 mt-3">
                  <div className="flex text-yellow-500 text-sm">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-[12px] text-neutral-500 font-medium tracking-wide">
                    2 reviews
                  </span>
                </div>
              </div>

              {/* COLOR selector swatch */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#151515] block">
                  COLOR: <span className="font-semibold text-neutral-500 ml-1">{selectedColor}</span>
                </span>
                <div className="flex gap-2">
                  {defaultColors.map((colorObj) => (
                    <button
                      key={colorObj.name}
                      onClick={() => setSelectedColor(colorObj.name)}
                      className={`h-8 w-12 border transition-all ${selectedColor === colorObj.name
                        ? "border-[#151515] ring-1 ring-[#151515]"
                        : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      style={{ backgroundColor: colorObj.colorCode }}
                      title={colorObj.name}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE Selector grid with diagonal crossed-out line for disabled ones */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#151515] block">
                  SIZE: <span className="font-semibold text-neutral-500 ml-1">{selectedSize}</span>
                </span>

                <div className="flex flex-wrap gap-2.5">
                  {defaultSizes.map((sizeOption) => {
                    const isAvailable = productSizes.includes(sizeOption);
                    const isSelected = selectedSize === sizeOption;

                    return (
                      <button
                        key={sizeOption}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(sizeOption)}
                        className={`relative h-10 w-12 flex items-center justify-center text-xs font-semibold tracking-wider transition-all border ${isSelected
                          ? "bg-black text-white border-black font-bold"
                          : isAvailable
                            ? "bg-white text-neutral-800 border-neutral-200 hover:border-black"
                            : "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-40"
                          }`}
                      >
                        <span>{sizeOption}</span>
                        {/* Crossed out slash line inside button if unavailable */}
                        {!isAvailable && (
                          <div
                            className="absolute inset-0 border-t border-neutral-300"
                            style={{
                              transform: "rotate(-45deg)",
                              transformOrigin: "center",
                              top: "50%",
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                {errorMsg && (
                  <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Quantity Pill + Add to Cart block */}
              <div className="flex space-x-3 pt-3 items-center">
                {/* Quantity Controller Pill */}
                <div className="flex items-center border border-neutral-200 rounded-full h-11 px-4 space-x-3 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-neutral-500 hover:text-black font-semibold text-base px-1.5 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-neutral-800 w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-neutral-500 hover:text-black font-semibold text-base px-1.5 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart pill button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-fill-up-shopping h-11 font-semibold uppercase tracking-wider text-sm flex items-center justify-center rounded-full"
                >
                  Add To Cart
                </button>
              </div>

              {/* Google Pay Button & More options */}
              <div className="space-y-3.5 pt-2">
                <button className="w-full bg-black text-white h-11 rounded-full flex items-center justify-center font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer">
                  Buy with <span className="font-extrabold ml-1.5 text-base italic tracking-tight text-white">GPay</span>
                </button>

                <div className="text-center">
                  <button className="text-[12px] text-neutral-600 font-medium underline hover:text-black transition-colors cursor-pointer">
                    More payment options
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewDrawer;
