
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  stock: number;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring noise-cancellation technology, comfortable ear cups, and a long-lasting battery.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=1000",
    ],
    category: "Electronics",
    tags: ["headphones", "wireless", "audio", "premium"],
    rating: 4.8,
    stock: 25,
    featured: true,
    trending: true
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Stay connected and track your fitness with our latest smartwatch. Features include heart rate monitoring, GPS, and a bright OLED display.",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000",
    ],
    category: "Electronics",
    tags: ["smartwatch", "fitness", "gadget", "wearable"],
    rating: 4.5,
    stock: 18,
    featured: true
  },
  {
    id: "3",
    name: "Modern Desk Lamp",
    description: "Illuminate your workspace with this elegant desk lamp. Adjustable brightness levels and a sleek, modern design make it perfect for any desk.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000",
    ],
    category: "Home",
    tags: ["lamp", "lighting", "desk", "office"],
    rating: 4.2,
    stock: 30,
    newArrival: true
  },
  {
    id: "4",
    name: "Premium Coffee Maker",
    description: "Brew the perfect cup of coffee every morning with our premium coffee maker. Features programmable settings and a thermal carafe to keep your coffee hot for hours.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1517914309068-f7e1d7b0238f?q=80&w=1000",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000",
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1000",
    ],
    category: "Kitchen",
    tags: ["coffee", "appliance", "kitchen", "brewing"],
    rating: 4.7,
    stock: 15,
    featured: true
  },
  {
    id: "5",
    name: "Ultralight Hiking Backpack",
    description: "Conquer the trails with our ultralight hiking backpack. Multiple compartments, water-resistant material, and ergonomic design make it perfect for any adventure.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c661b4a9c?q=80&w=1000",
      "https://images.unsplash.com/photo-1622560481001-77470831e724?q=80&w=1000",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
    ],
    category: "Outdoors",
    tags: ["backpack", "hiking", "outdoor", "camping"],
    rating: 4.6,
    stock: 22,
    trending: true
  },
  {
    id: "6",
    name: "Wireless Bluetooth Speaker",
    description: "Take your music anywhere with this portable Bluetooth speaker. Waterproof, long battery life, and amazing sound quality in a compact package.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000",
      "https://images.unsplash.com/photo-1558537348-c0f8e733989d?q=80&w=1000",
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?q=80&w=1000",
    ],
    category: "Electronics",
    tags: ["speaker", "bluetooth", "audio", "portable"],
    rating: 4.4,
    stock: 28,
    trending: true
  },
  {
    id: "7",
    name: "Minimalist Leather Wallet",
    description: "Sleek and functional leather wallet with RFID protection. Holds all your essential cards and cash without the bulk.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1559694097-9180d44108d7?q=80&w=1000",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000",
      "https://images.unsplash.com/photo-1570153210610-271b4969d9e4?q=80&w=1000",
    ],
    category: "Accessories",
    tags: ["wallet", "leather", "accessories", "minimalist"],
    rating: 4.3,
    stock: 35,
    newArrival: true
  },
  {
    id: "8",
    name: "Professional Knife Set",
    description: "Elevate your cooking with our professional-grade knife set. Includes chef's knife, paring knife, and santoku knife, all crafted from high-carbon stainless steel.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1000",
      "https://images.unsplash.com/photo-1584961585502-77f14e4f8e60?q=80&w=1000",
      "https://images.unsplash.com/photo-1566454825481-9c73fabc71ad?q=80&w=1000",
    ],
    category: "Kitchen",
    tags: ["knives", "kitchen", "cooking", "professional"],
    rating: 4.9,
    stock: 12,
    trending: true
  },
  {
    id: "9",
    name: "Adjustable Desk Stand",
    description: "Work comfortably with our adjustable desk stand. Convert any desk to a standing desk instantly, with 8 height settings and sturdy construction.",
    price: 119.99,
    images: [
      "https://images.unsplash.com/photo-1602016753527-5228b7c5283f?q=80&w=1000",
      "https://images.unsplash.com/photo-1587212695479-3c8a54a72097?q=80&w=1000",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1000",
    ],
    category: "Office",
    tags: ["desk", "ergonomic", "office", "standing"],
    rating: 4.5,
    stock: 20,
    newArrival: true
  },
  {
    id: "10",
    name: "Organic Cotton T-Shirt",
    description: "The perfect everyday tee made from 100% organic cotton. Soft, breathable, and environmentally friendly.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=1000",
      "https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1000",
    ],
    category: "Clothing",
    tags: ["tshirt", "organic", "cotton", "clothing"],
    rating: 4.2,
    stock: 40,
    featured: true
  },
  {
    id: "11",
    name: "Smart Home Security Camera",
    description: "Keep your home secure with our HD security camera. Features night vision, motion detection, and two-way audio, accessible from your smartphone.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1580983228693-d7e0602ea9f2?q=80&w=1000",
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1000",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
    ],
    category: "Smart Home",
    tags: ["security", "camera", "smart home", "safety"],
    rating: 4.6,
    stock: 18,
    newArrival: true
  },
  {
    id: "12",
    name: "Portable Power Bank",
    description: "Never run out of battery with our high-capacity power bank. Charge multiple devices simultaneously with fast-charging technology.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1609592806964-12a289d64a5e?q=80&w=1000",
      "https://images.unsplash.com/photo-1619779343078-9a4138ae15b9?q=80&w=1000",
      "https://images.unsplash.com/photo-1583863788434-e62bd0645893?q=80&w=1000",
    ],
    category: "Electronics",
    tags: ["power bank", "charging", "portable", "battery"],
    rating: 4.4,
    stock: 25,
    trending: true
  }
];

export const categories = Array.from(new Set(products.map(product => product.category)));

export const getAllTags = () => {
  const allTags = products.flatMap(product => product.tags);
  return Array.from(new Set(allTags));
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: string, limit = 4) => {
  const product = getProductById(id);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== id && (
      p.category === product.category || 
      p.tags.some(tag => product.tags.includes(tag))
    ))
    .slice(0, limit);
};

export const getFeaturedProducts = (limit = 4) => {
  return products
    .filter(product => product.featured)
    .slice(0, limit);
};

export const getTrendingProducts = (limit = 4) => {
  return products
    .filter(product => product.trending)
    .slice(0, limit);
};

export const getNewArrivals = (limit = 4) => {
  return products
    .filter(product => product.newArrival)
    .slice(0, limit);
};
