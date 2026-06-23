export interface Product {
  id: string;
  title: string;
  priceLKR: number;
  priceUSD: number;
  originalPriceLKR?: number;
  originalPriceUSD?: number;
  description: string;
  category: "men" | "women" | "accessories" | "footwear" | "sale";
  images: string[];
  sizes: string[];
  features: string[];
  kokoInstallmentsLKR: string;
  mintPayInstallmentsLKR: string;
}

export const products: Product[] = [
  {
    id: "foa-oversized-tee-black",
    title: 'FOA "Freedom" Oversized Graphic Tee',
    priceLKR: 4200,
    priceUSD: 14,
    description: "Designed for premium comfort and an effortless urban look, this oversized heavyweight tee features the signature F.O.A branding printed across the back. Crafted from 100% premium Sri Lankan cotton.",
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Heavyweight 240GSM cotton fabric",
      "Drop-shoulder oversized silhouette",
      "Silkscreen signature print",
      "Pre-shrunk for maximum durability"
    ],
    kokoInstallmentsLKR: "1,400.00 x 3 months",
    mintPayInstallmentsLKR: "1,400.00 x 3 months"
  },
  {
    id: "foa-cargo-joggers-carbon",
    title: "FOA Carbon Utility Cargo Pants",
    priceLKR: 7800,
    priceUSD: 26,
    description: "Heavyweight utility cargo pants featuring elastic ankle adjustments, multiple quick-access cargo pockets, and double-stitched seams. Engineered for everyday active and casual street lifestyles.",
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["30", "32", "34", "36"],
    features: [
      "Premium ripstop stretch cotton",
      "Adjustable drawcord at waist and ankle hems",
      "Six-pocket functional setup",
      "Weather-resistant coating"
    ],
    kokoInstallmentsLKR: "2,600.00 x 3 months",
    mintPayInstallmentsLKR: "2,600.00 x 3 months"
  },
  {
    id: "foa-active-crop-sage",
    title: "FOA Women's Training Ribbed Crop",
    priceLKR: 3800,
    priceUSD: 13,
    description: "Engineered with 4-way stretch ribbed material that wicks sweat and supports high-impact training sessions. Feels like a second skin.",
    category: "women",
    images: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Ribbed compressive stretch material",
      "Moisture-wicking, breathable technology",
      "Built-in removable support cups",
      "Elegant scoop neckline"
    ],
    kokoInstallmentsLKR: "1,266.67 x 3 months",
    mintPayInstallmentsLKR: "1,266.67 x 3 months"
  },
  {
    id: "foa-ribbed-leggings-sage",
    title: "FOA Seamless High-Waist Leggings",
    priceLKR: 5900,
    priceUSD: 20,
    description: "High-waisted compression leggings designed to contour and hold shape. Seamlessly knitted with soft moisture-control yarns for absolute comfort during workouts or leisure.",
    category: "women",
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "High-rise compression waistband",
      "Seamless moisture-wicking weave",
      "Squat-proof thick knit",
      "Subtle knitted logo detail"
    ],
    kokoInstallmentsLKR: "1,966.67 x 3 months",
    mintPayInstallmentsLKR: "1,966.67 x 3 months"
  },
  {
    id: "foa-crossbody-bag-black",
    title: "FOA Technical Crossbody Bag",
    priceLKR: 4500,
    priceUSD: 15,
    description: "A compact crossbody bag built from high-tensile water-repellent nylon. Features robust zip compartments, customizable tactical straps, and internal slots for secure everyday carry.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    features: [
      "Waterproof Codura brand nylon",
      "YKK zipper systems",
      "Detachable utility nylon webbed strap",
      "Dual interior phone/key sleeves"
    ],
    kokoInstallmentsLKR: "1,500.00 x 3 months",
    mintPayInstallmentsLKR: "1,500.00 x 3 months"
  },
  {
    id: "foa-signature-cap",
    title: "FOA Distress Vintage Cap",
    priceLKR: 2800,
    priceUSD: 9,
    description: "A vintage-washed cotton cap featuring low-profile crown and distressed strap-back buckle adjustment. Embroidered with the F.O.A coordinates.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    features: [
      "100% brushed cotton twill",
      "Brass buckle sizing slide",
      "Distressed washed fabric effect",
      "Internal sweatband lining"
    ],
    kokoInstallmentsLKR: "933.33 x 3 months",
    mintPayInstallmentsLKR: "933.33 x 3 months"
  },
  {
    id: "foa-sliders-stealth",
    title: "FOA Stealth Comfort Sliders",
    priceLKR: 3200,
    priceUSD: 11,
    description: "Ergonomically contoured rubber sliders with a cushioned strap featuring the debossed FOA emblem. Perfect recovery footwear for post-training comfort.",
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    features: [
      "Contoured anti-slip footbed",
      "Padded water-friendly upper strap",
      "Shock-absorbing EVA midsole",
      "Subtle debossed branding detail"
    ],
    kokoInstallmentsLKR: "1,066.67 x 3 months",
    mintPayInstallmentsLKR: "1,066.67 x 3 months"
  },
  {
    id: "foa-minimal-hoodie-sand-sale",
    title: "FOA French Terry Hoodie (Sand)",
    priceLKR: 7200,
    priceUSD: 24,
    originalPriceLKR: 9200,
    originalPriceUSD: 31,
    description: "A clean, timeless drop-shoulder pullover hoodie with zero branding. Finished with double-lined hoods, ribbed cuffs, and a kangaroo pouch. End-of-season drop.",
    category: "sale",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "400GSM loopback French Terry",
      "Oversized hood without drawstrings",
      "Invisible side pockets",
      "Minimalist tonal design"
    ],
    kokoInstallmentsLKR: "2,400.00 x 3 months",
    mintPayInstallmentsLKR: "2,400.00 x 3 months"
  }
];
export default products;
