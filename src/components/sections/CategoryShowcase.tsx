"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryItem {
  title: string;
  image: string;
  link: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    title: "Mens",
    image: "https://cdn.shopify.com/s/files/1/0750/4415/9772/files/Mens_d3aaeb4d-1ebe-40ad-8dd2-d83c76d303c3.png?v=1759915492",
    link: "#men"
  },
  {
    title: "Womens",
    image: "https://cdn.shopify.com/s/files/1/0750/4415/9772/files/Womens_6fddf6f4-f8a0-44a7-8d6d-b32302d8fac6.png?v=1759915492",
    link: "#women"
  },
  {
    title: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0750/4415/9772/files/Accessories_6ec1c276-7ee6-e046-6e03-2e8e432e96ad.png?v=1759915492",
    link: "#accessories"
  }
];

export const CategoryShowcase: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const el = document.getElementById(selector.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="mx-auto px-6 mb-24 bg-background relative overflow-hidden"
      style={{
        width: "100%",
        maxWidth: "1440px",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        style={{
          minHeight: "487px"
        }}
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.title}
            href={cat.link}
            onClick={(e) => handleScroll(e, cat.link)}
            className="relative w-full h-[350px] md:h-[487px] overflow-hidden group block"
          >
            {/* Zoom Image */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out transform group-hover:scale-105">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Optional slight dark overlay to enhance text visibility */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            {/* Title text on bottom left */}
            <div className="absolute bottom-8 left-8 z-10">
              <h3
                className="text-white text-[24px] font-medium tracking-wide"
                style={{
                  backgroundColor: "#0009",
                  borderRadius: "5px",
                  color: "#fff",
                  fontSize: "19.2px",
                  fontWeight: "300",
                  lineHeight: "30.72px",
                  padding: "8px 16px"
                }}
              >
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
