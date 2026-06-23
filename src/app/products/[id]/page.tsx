"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { addToCart, currency } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-6">
          <h2 className="text-xl font-black uppercase tracking-wider text-muted-foreground">
            Product Not Found
          </h2>
          <Link href="/" className="mt-4">
            <Button variant="outline" size="sm">
              Back To Storefront
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedPrice = (price: number) => {
    if (currency === "LKR") {
      return `LKR ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getKokoSplits = (price: number) => {
    const split = price / 3;
    return `LKR ${split.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg("Please select a size");
      return;
    }
    setErrorMsg("");
    addToCart({
      id: product.id,
      title: product.title,
      priceLKR: product.priceLKR,
      priceUSD: product.priceUSD,
      originalPriceLKR: product.originalPriceLKR,
      originalPriceUSD: product.originalPriceUSD,
      image: product.images[0],
      selectedSize: selectedSize,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between pt-32">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to drops
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery Carousel */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col order-2 md:order-1 gap-3 overflow-x-auto md:overflow-x-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative h-20 w-16 bg-neutral-100 flex-shrink-0 border-2 overflow-hidden transition-colors ${
                    selectedImageIdx === idx ? "border-accent" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 order-1 md:order-2 relative aspect-[3/4] bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
              <motion.div
                key={selectedImageIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[selectedImageIdx]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Purchase Block */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-widest text-accent uppercase">
                {product.category}'s collections
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wider leading-tight">
                {product.title}
              </h1>

              {/* Price details */}
              <div className="flex items-center space-x-3 pt-1">
                <span className="text-xl md:text-2xl font-black">
                  {formattedPrice(currency === "LKR" ? product.priceLKR : product.priceUSD)}
                </span>
                {product.originalPriceLKR && product.originalPriceUSD && (
                  <span className="text-base text-muted-foreground line-through font-medium">
                    {formattedPrice(
                      currency === "LKR" ? product.originalPriceLKR : product.originalPriceUSD
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Koko Installment Banner */}
            {currency === "LKR" && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span>Pay 3 installments of</span>
                  <span className="text-sm font-black">{getKokoSplits(product.priceLKR)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-normal">
                  Split your purchase interest-free with <strong className="text-foreground">Koko</strong> or <strong className="text-foreground">MintPay</strong> at checkouts.
                </p>
              </div>
            )}

            {/* Short description */}
            <div className="border-t border-b border-neutral-100 dark:border-neutral-900 py-6">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sizing selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Select Size
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent cursor-pointer hover:underline">
                  Size Guide
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMsg("");
                    }}
                    className={`h-11 px-4 text-xs font-black tracking-widest uppercase border transition-colors ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent border-neutral-300 dark:border-neutral-700 text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errorMsg && (
                <p className="text-xs font-bold uppercase tracking-widest text-destructive">
                  {errorMsg}
                </p>
              )}
            </div>

            {/* Purchase action */}
            <div className="space-y-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full text-xs font-black flex items-center justify-center gap-3 py-4"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4" /> Add To Shopping Bag
              </Button>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <Truck className="h-4 w-4 mr-2 text-foreground" /> Fast Island-wide Delivery
                </div>
                <div className="flex items-center text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <RotateCcw className="h-4 w-4 mr-2 text-foreground" /> 7-Day Exchange Window
                </div>
                <div className="flex items-center text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 mr-2 text-foreground" /> 100% Quality Inspected
                </div>
                <div className="flex items-center text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <CreditCard className="h-4 w-4 mr-2 text-foreground" /> Secure payment lines
                </div>
              </div>
            </div>

            {/* Fabric Details & Care instructions */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
                Technical details
              </h3>
              <ul className="list-disc list-inside text-xs font-semibold uppercase tracking-wider text-muted-foreground space-y-1">
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
