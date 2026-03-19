import { Product } from "../Shop";

export const products: Product[] = [
  // --- PERFUMES (THE HOUSE OF TUTU) ---
  {
    id: "p1",
    name: "Midnight Oud",
    brand: "The House of Tutu",
    category: "perfume",
    price: 185,
    salePrice: 165,
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1000&auto=format&fit=crop", // Dark luxury bottle vibe
    scentProfile: ["Woody", "Smoky", "Spicy"],
    origin: "Abuja, Nigeria",
    history:
      "Inspired by the ancient trade routes of Sahara, capturing the mystique of midnight desert caravans.",
    notes: {
      top: ["Bergamot", "Saffron"],
      heart: ["Oud", "Rose"],
      base: ["Amber", "Musk"],
    },
    sizes: ["50ml", "100ml"],
    isNew: true,
  },
  {
    id: "p2",
    name: "Desert Rose",
    brand: "The House of Tutu",
    category: "perfume",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    scentProfile: ["Floral", "Warm", "Sweet"],
    origin: "Marrakech, Morocco",
    history:
      "A tribute to the roses of the Atlas Mountains, hand-picked at dawn.",
    notes: {
      top: ["Damask Rose", "Raspberry"],
      heart: ["Saffron", "Cinnamon"],
      base: ["Oud", "Vanilla"],
    },
    sizes: ["50ml", "100ml"],
    isNew: false,
  },
  {
    id: "p4",
    name: "Santalum Album",
    brand: "The House of Tutu",
    category: "perfume",
    price: 175,
    image: "/ramatu.jpeg", // High-end wood/oil aesthetic
    scentProfile: ["Creamy", "Woody", "Mild"],
    origin: "Mysore, India",
    history:
      "Pure Mysore sandalwood oil, aged for 10 years for unparalleled depth.",
    notes: {
      top: ["Bergamot", "Violet"],
      heart: ["Sandalwood", "Iris"],
      base: ["Vanilla", "Musk"],
    },
    sizes: ["50ml", "100ml"],
    isNew: false,
  },
  {
    id: "p5",
    name: "Azure Coast",
    brand: "The House of Tutu",
    category: "perfume",
    price: 130,
    image: "/logo4.jpeg", // Stunning blue bottle/ocean vibe
    scentProfile: ["Marine", "Citrus", "Salt"],
    origin: "French Riviera",
    history:
      "Captures the essence of the Mediterranean breeze and sun-drenched cliffs.",
    notes: {
      top: ["Sea Salt", "Lemon"],
      heart: ["Neroli", "Seaweed"],
      base: ["Cedarwood", "Ambergris"],
    },
    sizes: ["50ml", "100ml"],
    isNew: true,
  },

  // --- HOME FRAGRANCE (AROMA 24/7) ---
  {
    id: "c1",
    name: "Silk Road Candle",
    brand: "Aroma24/7",
    category: "candle",
    price: 65,
    image: "/logo3.jpeg",
    origin: "China",
    history: "Hand-poured soy wax with notes of silk flower and white tea.",
    sizes: ["300g", "600g"],
    isNew: true,
  },
  {
    id: "c2",
    name: "Volcanic Ash",
    brand: "Aroma24/7",
    category: "candle",
    price: 70,
    image: "/logo5.jpeg",
    origin: "Iceland",
    history:
      "Intense, earthy scent inspired by the raw power of Nordic nature.",
    sizes: ["300g"],
    isNew: false,
  },

  // --- GEAR & ACCESSORIES (SKY PERFUMES) ---
  {
    id: "g2",
    name: "Travel Case",
    brand: "Sky Perfumes",
    category: "gear",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1000&auto=format&fit=crop", // High-end leather goods vibe
    origin: "Italy",
    history:
      "Luxury pebble-grain leather case that holds three travel-size bottles.",
    sizes: ["Universal"],
    isNew: true,
  },
  {
    id: "g3",
    name: "Golden Funnel Set",
    brand: "Sky Perfumes",
    category: "gear",
    price: 15,
    image: "/logo4.jpeg",
    origin: "Lyon",
    history: "Precision tools for decanting fragrances without losing a drop.",
    sizes: ["One Size"],
    isNew: false,
  },

  // --- BOUTIQUE SELECTIONS ---
  {
    id: "p6",
    name: "Neroli & Mint",
    brand: "Sky Perfumes",
    category: "perfume",
    price: 95,
    image: "/logo3.jpeg",
    scentProfile: ["Fresh", "Herbal", "Citrus"],
    origin: "Tunisia",
    history: "A refreshing burst of Neroli blossoms and cool mint leaves.",
    notes: { top: ["Mint", "Bergamot"], heart: ["Neroli"], base: ["Cedar"] },
    sizes: ["50ml", "100ml"],
    isNew: true,
  },
  {
    id: "p7",
    name: "Oud Royale",
    brand: "Oud Royale",
    category: "perfume",
    price: 250,
    image: "/logo5.jpeg",
    scentProfile: ["Woody", "Animalic", "Complex"],
    origin: "Laos",
    history: "The finest aged Oud, hand-distilled using traditional methods.",
    notes: {
      top: ["Saffron"],
      heart: ["Leather", "Oud"],
      base: ["Sandalwood"],
    },
    sizes: ["300ml"],
    isNew: false,
  },
  // --- CONTINUED: PERFUMES (THE HOUSE OF TUTU) ---
  {
    id: "p3",
    name: "Amber & Vanilla",
    brand: "The House of Tutu",
    category: "perfume",
    price: 120,
    salePrice: 99,
    image: "/logo4.jpeg",
    scentProfile: ["Sweet", "Warm", "Gourmand"],
    origin: "Madagascar",
    history:
      "Rich vanilla absolute blended with golden amber for a comforting embrace.",
    notes: { top: ["Orange", "Cinnamon"], heart: ["Vanilla"], base: ["Amber"] },
    sizes: ["50ml", "100ml"],
    isNew: true,
  },

  // --- CONTINUED: HOME FRAGRANCE (AROMA 24/7) ---
  {
    id: "d1",
    name: "Ultrasonic Diffuser",
    brand: "Aroma24/7",
    category: "diffuser",
    price: 89,
    image: "/logo2.jpeg",
    origin: "Kyoto, Japan",
    history:
      "Precision-engineered for cold-air diffusion, preserving the integrity of essential oils.",
    sizes: ["200ml", "500ml"],
    isNew: true,
  },
  {
    id: "d2",
    name: "Reed Diffuser Set",
    brand: "Aroma24/7",
    category: "diffuser",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?q=80&w=1000&auto=format&fit=crop", // Reed diffuser aesthetic
    origin: "Germany",
    history: "Long-lasting home fragrance with natural rattan reeds.",
    sizes: ["100ml", "250ml"],
    isNew: true,
  },
  {
    id: "d3",
    name: "Nebulizing Master",
    brand: "Aroma24/7",
    category: "diffuser",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop", // Sleek industrial device
    origin: "Tokyo",
    history: "Professional grade scenting for large open luxury spaces.",
    sizes: ["Standard"],
    isNew: false,
  },

  // --- CONTINUED: GEAR (SKY PERFUMES) ---
  {
    id: "g1",
    name: "Glass Atomizer",
    brand: "Sky Perfumes",
    category: "gear",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop", // Minimalist glass vial
    origin: "Paris, France",
    history:
      "Elegant refillable atomizer for carrying your favorite signature scent.",
    sizes: ["5ml", "10ml"],
    isNew: false,
  },

  // --- CONTINUED: BOUTIQUE SELECTIONS ---
  {
    id: "p8",
    name: "White Musk",
    brand: "The House of Tutu",
    category: "perfume",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1595425959632-34f2822322ce?q=80&w=1000&auto=format&fit=crop", // Soft, clean white aesthetic
    scentProfile: ["Powdery", "Clean", "Soft"],
    origin: "Egypt",
    history: "A skin-scent that radiates purity and understated luxury.",
    notes: { top: ["Aldehydes"], heart: ["Lily"], base: ["White Musk"] },
    sizes: ["50ml", "100ml"],
    isNew: true,
  },
  {
    id: "p9",
    name: "Figue Sauvage",
    brand: "Sky Perfumes",
    category: "perfume",
    price: 155,
    image: "/hero.jpeg",
    scentProfile: ["Green", "Fruit", "Earth"],
    origin: "Greece",
    history: "The scent of wild figs ripening under the Mediterranean sun.",
    notes: { top: ["Fig Leaf"], heart: ["Fig Fruit"], base: ["Coconut Milk"] },
    sizes: ["50ml", "100ml"],
    isNew: false,
  },
  {
    id: "p12",
    name: "Golden Myrrh",
    brand: "The House of Tutu",
    category: "perfume",
    price: 210,
    image: "/ramatu.jpeg",
    scentProfile: ["Sweet", "Resinous", "Royal"],
    origin: "Ethiopia",
    history: "A majestic blend of golden myrrh tears and liquid honey.",
    notes: { top: ["Honey"], heart: ["Myrrh"], base: ["Tonka Bean"] },
    sizes: ["50ml", "100ml"],
    isNew: true,
  },
];
