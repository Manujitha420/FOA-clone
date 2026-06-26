"use client";
import React from "react";
import Link from "next/link";

export const CampaignCollections: React.FC = () => {
  const collections = [
    { name: "Embroidery Collection", link: "#men" },
    { name: "Linen Collection", link: "#women" },
    { name: "Core 24/7 collection", link: "#men" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const el = document.getElementById(selector.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="mx-auto px-6 mb-24 relative overflow-hidden flex flex-col justify-center items-center"
      style={{
        width: "100%",
        maxWidth: "1440px",
        height: "650px",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=1440&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {collections.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            onClick={(e) => handleScroll(e, item.link)}
            className="campaign-link block transition-all duration-300 cursor-pointer"
            style={{
              fontSize: "72px",
              lineHeight: "80px",
              margin: "14.4px 28.8px",
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "Prompt, sans-serif",
              fontWeight: 800,
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .campaign-link {
          color: transparent;
          -webkit-text-stroke: 1.5px #ffffff;
          transform: skewX(0deg);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease, -webkit-text-stroke 0.4s ease;
        }
        .campaign-link:hover {
          color: #ffffff;
          transform: skewX(-12deg);
          -webkit-text-stroke: 0px transparent;
        }
      `}} />
    </section>
  );
};

export default CampaignCollections;
