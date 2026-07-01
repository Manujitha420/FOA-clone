"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Heart, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ColorSwatch {
  name: string;
  hex: string;
}

interface BestSellerProduct {
  id: string;
  title: string;
  priceLKR: number;
  colors: ColorSwatch[];
  image: string;
  hoverImage?: string;
  category: "TEES" | "DENIM" | "BAGS" | "ACCESSORIES";
  installments: {
    mintpay: string;
    koko: string;
  };
}

const BEST_SELLER_PRODUCTS: BestSellerProduct[] = [
  {
    id: "flux-oversized-tee",
    title: 'FLUX OVERSIZED TEE',
    priceLKR: 4200,
    category: "TEES",
    colors: [
      { name: "Black", hex: "#151515" },
      { name: "White", hex: "#ffffff" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/00012501A.jpg?v=1778247075&width=1440",
    hoverImage: "https://foaclothing.com/cdn/shop/files/00012501B.jpg?v=1778247075&width=1440",
    installments: {
      mintpay: "3 X Rs 1,400.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,400.00 with"
    }
  },
  {
    id: "linear_tee",
    title: "LINEAR  TEE",
    priceLKR: 4800,
    category: "TEES",
    colors: [
      { name: "Navy", hex: "#2b3c5a" },
      { name: "Beige", hex: "#dcd6cd" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/00012301A.jpg?v=1770036513&width=960",
    hoverImage: "https://foaclothing.com/cdn/shop/files/00012302A.jpg?v=1770037194&width=960",
    installments: {
      mintpay: "3 X Rs 1,600.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,600.00 with"
    }
  },
  {
    id: "loose-flared-jeans",
    title: "LOOSE FLARED JEANS",
    priceLKR: 7800,
    category: "DENIM",
    colors: [
      { name: "Carbon", hex: "#374151" },
      { name: "Black", hex: "#151515" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/00011801A.jpg?v=1761150100&width=960",
    hoverImage: "https://foaclothing.com/cdn/shop/files/00011805A.jpg?v=1761214526&width=960",
    installments: {
      mintpay: "3 X Rs 2,600.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 2,600.00 with"
    }
  },
  {
    id: "carpenter-jeans",
    title: "CARPENTER JEANS",
    priceLKR: 4500,
    category: "DENIM",
    colors: [
      { name: "Navy", hex: "#2b3c5a" },
      { name: "Black", hex: "#151515" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/00011501A.jpg?v=1761146073&width=960",
    hoverImage: "https://foaclothing.com/cdn/shop/files/00011503A.jpg?v=1761214447&width=960",
    installments: {
      mintpay: "3 X Rs 1,500.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,500.00 with"
    }
  },
  {
    id: "essential-tote-bag",
    title: "ESSENTIAL TOTE BAG",
    priceLKR: 4500,
    category: "BAGS",
    colors: [
      { name: "Black", hex: "#151515" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/60013801A.jpg?v=1769681924&width=960",
    hoverImage: "https://foaclothing.com/cdn/shop/files/60013801C.jpg?v=1769681924&width=960",
    installments: {
      mintpay: "3 X Rs 1,500.00 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,500.00 with"
    }
  },
  {
    id: "foa-hydrojug",
    title: "F.O.A HYDROJUG 1L",
    priceLKR: 2800,
    category: "ACCESSORIES",
    colors: [
      { name: "Charcoal", hex: "#4b5563" },
      { name: "Red/Stripe", hex: "#b91c1c" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/60011801A.jpg?v=1754042822&width=960",
    hoverImage: "https://foaclothing.com/cdn/shop/files/60011801A.jpg?v=1754042822&width=960",
    installments: {
      mintpay: "3 X Rs 933.33 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 933.33 with"
    }
  },
  {
    id: "crossbody-bag",
    title: "CROSSBODY BAG 2.0",
    priceLKR: 3200,
    category: "ACCESSORIES",
    colors: [
      { name: "Black", hex: "#151515" }
    ],
    image: "https://foaclothing.com/cdn/shop/files/60009300A.jpg?v=1754042961&width=960",
    hoverImage: "https://foaclothing.com/cdn/shop/files/60009302A.jpg?v=1754042962&width=960",
    installments: {
      mintpay: "3 X Rs 1,066.67 or 4.5% Cashback with",
      koko: "or pay in 3 x Rs 1,066.67 with"
    }
  }
];

export const BestSellers: React.FC = () => {
  const { addToCart, currency } = useCart();
  const [activeTab, setActiveTab] = useState<"TEES" | "DENIM" | "BAGS" | "ACCESSORIES">("TEES");
  const [selectedProduct, setSelectedProduct] = useState<BestSellerProduct | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<Record<string, string>>({});

  const filteredProducts = BEST_SELLER_PRODUCTS.filter((p) => p.category === activeTab);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectColor = (productId: string, colorHex: string) => {
    setActiveColors((prev) => ({
      ...prev,
      [productId]: colorHex
    }));
  };

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `Rs ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${(price / 300).toFixed(2)}`;
  };

  return (
    <section
      className="mx-auto px-6 mb-24 bg-background relative flex flex-col justify-between"
      style={{
        width: "100%",
        maxWidth: "1440px",
        minHeight: "1062px"
      }}
    >
      {/* Title & Tabs */}
      <div className="text-left mb-12">
        <h2
          style={{
            color: "#151515",
            display: "inline-block",
            fontFamily: "Prompt, sans-serif",
            fontSize: "40px",
            fontWeight: 600,
            lineHeight: "48px",
            textDecoration: "underline",
            textUnderlineOffset: "8px",
          }}
        >
          BEST SELLERS
        </h2>
        <div className="mt-6">
          <p
            className="mb-6"
            style={{
              color: "#151515",
              fontFamily: "Prompt, sans-serif",
              fontSize: "14px",
              fontWeight: 300,
            }}
          >
            Shop some of our hottest products
          </p>
          <div className="flex items-center space-x-2 text-sm font-medium tracking-wider select-none">
            {(["TEES", "DENIM", "BAGS", "ACCESSORIES"] as const).map((tab, idx, arr) => {
              const isActive = activeTab === tab;
              return (
                <React.Fragment key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`pb-1 transition-all duration-200 uppercase font-normal tracking-normal text-[20px] ${isActive ? "text-[#151515]" : "text-[#a3a3a3] hover:text-[#151515]"
                      }`}
                    style={{
                      borderBottom: isActive ? "2px solid #151515" : "2px solid transparent",
                      fontFamily: "Prompt, sans-serif",
                      fontWeight: 400
                    }}
                  >
                    {tab}
                  </button>
                  {idx < arr.length - 1 && <span className="text-neutral-300">/</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          const selectedColor = activeColors[product.id] || product.colors[0].hex;

          return (
            <div
              key={product.id}
              className="flex-shrink-0 relative group p-3"
              style={{
                width: "403px",
                height: "835px",
                color: "#151515",
                display: "flex",
                flexDirection: "column",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "27.2px",
                textAlign: "left",
                padding: "2px 0px"
              }}
            >
              {/* Image Box */}
              <div
                className="relative w-full bg-neutral-50 overflow-hidden mb-4"
                style={{ height: "537px" }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className={`object-cover transition-all duration-150 ${product.hoverImage ? "opacity-100 group-hover:opacity-0" : "group-hover:scale-105"
                    }`}
                  sizes="403px"
                />
                {product.hoverImage && (
                  <Image
                    src={product.hoverImage}
                    alt={product.title}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    sizes="403px"
                  />
                )}

                {/* Wishlist Button */}
                <div className="absolute top-5 right-5 z-20 group/heart">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="transition-transform duration-150 hover:scale-110 active:scale-95"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`h-7 w-7 stroke-[1.2] transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                        }`}
                    />
                  </button>

                  <div className="absolute right-0 top-full mt-2 hidden group-hover/heart:block bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded whitespace-nowrap shadow-md z-30">
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    <div className="absolute top-[-4px] right-3.5 w-2 h-2 bg-black rotate-45" />
                  </div>
                </div>

                {/* Quick View slide up */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-0 left-0 right-0 bg-[#151515] text-white text-center py-3 text-[11px] font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hover:bg-neutral-800"
                >
                  QUICK VIEW
                </button>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col pt-1 text-left">
                <h3
                  className="text-xs font-black uppercase tracking-wider line-clamp-1"
                  style={{
                    fontFamily: "Prompt",
                    color: "#151515",
                    fontSize: "15px",
                    fontWeight: "500",
                    lineHeight: "22.5px",
                    margin: "0px 0px 5px",
                    textAlign: "left",
                    textTransform: "uppercase"
                  }}
                >
                  {product.title}
                </h3>

                <div className="mt-2 mb-2">
                  <span
                    className="text-sm font-black"
                    style={{
                      color: "#151515",
                      display: "inline",
                      fontSize: "15px",
                      fontWeight: "700",
                      letterSpacing: "0.3px",
                      lineHeight: "15px",
                      textAlign: "left"
                    }}
                  >
                    {formattedPrice(product.priceLKR)}
                  </span>
                </div>

                {/* Mintpay */}
                <div
                  className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-0.5"
                  style={{
                    fontFamily: "Prompt, sans-serif",
                    letterSpacing: "0.3px",
                    lineHeight: "13px",
                    textAlign: "left"
                  }}
                >
                  <span>{product.installments.mintpay}</span>
                  <a href="https://mintpay.lk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <img
                      src="/mintpay-logo.svg"
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
                  className="flex items-center flex-wrap gap-1 text-[9px] leading-tight text-neutral-500 font-bold uppercase tracking-wider mb-3"
                  style={{
                    fontFamily: "Prompt, sans-serif",
                    letterSpacing: "0.3px",
                    lineHeight: "13px",
                    textAlign: "left"
                  }}
                >
                  <span>{product.installments.koko}</span>
                  <a href="https://paykoko.com/customer-education?Amount=100" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <img
                      src="/koko-logo.svg"
                      alt="Koko"
                      className="h-3.5 w-auto object-contain mix-blend-multiply"
                    />
                  </a>
                  <a href="https://paykoko.com/customer-education?Amount=1500.0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-0.5">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwo2P5BH9VbhE7hHG6K8IrDRjlqQx9Zl4GLwhJX8VVw&s=10"
                      alt="Info"
                      className="h-3 w-3 object-contain"
                    />
                  </a>
                </div>

                {/* Swatches */}
                <div className="flex items-center space-x-2.5 mb-4">
                  {product.colors.map((color) => {
                    const isActive = selectedColor === color.hex;
                    const isRedStripe = color.name === "Red/Stripe";
                    return (
                      <button
                        key={color.name}
                        onClick={() => selectColor(product.id, color.hex)}
                        className={`w-7 h-7 flex items-center justify-center border transition-all relative ${isActive ? "border-2 border-black" : "border border-neutral-200 hover:border-neutral-400"
                          }`}
                        aria-label={`Select ${color.name}`}
                        style={{ padding: "3px" }}
                      >
                        <span
                          className="w-full h-full block relative"
                          style={{ backgroundColor: isRedStripe ? "#e5e7eb" : color.hex }}
                        >
                          {isRedStripe && (
                            <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                              <span className="w-[150%] h-[1.5px] bg-[#ef4444] transform rotate-45 origin-center" />
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      priceLKR: product.priceLKR,
                      priceUSD: product.priceLKR / 300,
                      image: product.image,
                      selectedSize: "M",
                    })
                  }
                  className="mt-auto w-fit bg-black text-white hover:bg-neutral-800 transition-all uppercase font-bold text-[13px] py-3 px-8 tracking-wider rounded-[50px] shadow-sm hover:shadow-md"
                  style={{
                    fontFamily: "Prompt, sans-serif",
                    lineHeight: "18px",
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Dialog Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-neutral-900/60 z-50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl bg-white z-55 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[85vh] text-left"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-neutral-800 hover:text-black p-1 z-10"
                aria-label="Close details"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative w-full md:w-1/2 aspect-[3/4] bg-neutral-50 overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-widest text-[#151515] uppercase">
                    Best Seller Item
                  </span>
                  <h3
                    className="text-lg md:text-xl font-black uppercase tracking-wider leading-snug"
                    style={{ fontFamily: "Prompt, sans-serif", color: "#151515" }}
                  >
                    {selectedProduct.title}
                  </h3>

                  <div className="flex items-center space-x-3 text-lg font-black">
                    <span style={{ fontFamily: "Prompt, sans-serif", color: "#151515" }}>
                      {formattedPrice(selectedProduct.priceLKR)}
                    </span>
                  </div>

                  <p
                    className="text-xs text-neutral-500 font-semibold uppercase tracking-wider leading-relaxed"
                    style={{ fontFamily: "Prompt, sans-serif" }}
                  >
                    Experience extreme comfort with this release. Part of our best sellers featuring premium fabrics, double stitched details and comfort aesthetics.
                  </p>

                  <div className="space-y-2 pt-2">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest text-neutral-400"
                      style={{ fontFamily: "Prompt, sans-serif" }}
                    >
                      Sizes Available
                    </span>
                    <div className="flex gap-2">
                      {["S", "M", "L", "XL"].map((size) => (
                        <span
                          key={size}
                          className="border border-neutral-300 px-3 py-1.5 text-xs font-black tracking-widest bg-neutral-50"
                          style={{ fontFamily: "Prompt, sans-serif" }}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 mt-6 space-y-3">
                  <button
                    className="w-full bg-[#151515] text-white hover:bg-neutral-800 transition-colors uppercase font-black text-xs py-3.5 text-center tracking-widest flex items-center justify-center gap-2"
                    style={{ fontFamily: "Prompt, sans-serif" }}
                    onClick={() => {
                      addToCart({
                        id: selectedProduct.id,
                        title: selectedProduct.title,
                        priceLKR: selectedProduct.priceLKR,
                        priceUSD: selectedProduct.priceLKR / 300,
                        image: selectedProduct.image,
                        selectedSize: "M",
                      });
                      setSelectedProduct(null);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add To Shopping Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BestSellers;
