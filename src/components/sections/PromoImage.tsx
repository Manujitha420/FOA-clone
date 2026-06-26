"use client";
import React from "react";
import Image from "next/image";

export const PromoImage: React.FC = () => {
  return (
    <section 
      className="mx-auto px-6 mb-24 bg-background relative overflow-hidden"
      style={{
        width: "100%",
        maxWidth: "1440px",
      }}
    >
      <div 
        className="relative w-full overflow-hidden"
        style={{
          height: "810px"
        }}
      >
        <Image
          src="https://foaclothing.com/cdn/shop/files/img.png?v=1777363868"
          alt="Brand Showcase"
          fill
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />
      </div>
    </section>
  );
};

export default PromoImage;
