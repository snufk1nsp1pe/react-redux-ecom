require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

// Exact catalog from the React frontend (src/data/products.js).
// Frontend field `image` maps to backend `imageUrl`.
const sampleProducts = [
  {
    name: "Poppy",
    description:
      "A single, unmistakably red pixel-perfect poppy. A classic pick for any blocky garden or flower pot.",
    price: 6.99,
    category: "Flowers",
    imageUrl: "https://blockrender.dev/render/item/poppy.png?size=512",
    stock: 50,
  },
  {
    name: "Dandelion",
    description:
      "A cheerful little yellow dandelion. Simple, sunny, and always the first to pop up in spring.",
    price: 4.99,
    category: "Flowers",
    imageUrl: "https://blockrender.dev/render/item/dandelion.png?size=512",
    stock: 60,
  },
  {
    name: "Cornflower",
    description:
      "A cool blue bloom with a dark little center. Pairs perfectly with a poppy for some color contrast.",
    price: 5.99,
    category: "Flowers",
    imageUrl: "https://blockrender.dev/render/item/cornflower.png?size=512",
    stock: 45,
  },
  {
    name: "Allium",
    description:
      "A tall, round, purple pom-pom of a flower. The showiest bloom in the whole patch.",
    price: 8.99,
    category: "Flowers",
    imageUrl: "https://blockrender.dev/render/item/allium.png?size=512",
    stock: 30,
  },
  {
    name: "Azure Bluet",
    description:
      "A tiny white flower with a bright yellow center. Small, delicate, and easy to tuck in anywhere.",
    price: 4.49,
    category: "Flowers",
    imageUrl: "https://blockrender.dev/render/item/azure_bluet.png?size=512",
    stock: 55,
  },
  {
    name: "Oxeye Daisy",
    description:
      "A big, friendly white daisy with a warm golden center. The one everyone plucks petals from.",
    price: 5.49,
    category: "Flowers",
    imageUrl: "https://blockrender.dev/render/item/oxeye_daisy.png?size=512",
    stock: 40,
  },
  {
    name: "Rubber Duck Socks",
    description:
      "A classic yellow rubber duck print marching across black socks. Squeaky clean style, no bathtub required.",
    price: 10.99,
    category: "Socks",
    imageUrl:
      "https://images.pexels.com/photos/18880821/pexels-photo-18880821.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 25,
  },
  {
    name: "Joker Face Socks",
    description:
      "Bold brown-and-yellow socks with a cheeky joker-card design. A playful pair for anyone who likes to clown around.",
    price: 11.49,
    category: "Socks",
    imageUrl:
      "https://images.pexels.com/photos/14037324/pexels-photo-14037324.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 20,
  },
  {
    name: "Candy Rain Socks",
    description:
      "A sweet shower of candy-colored patterns. As close to eating a rainbow as your feet will ever get.",
    price: 9.99,
    category: "Socks",
    imageUrl:
      "https://images.pexels.com/photos/15195444/pexels-photo-15195444.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 35,
  },
  {
    name: "Wild Pattern Socks",
    description:
      "A clashing mix of bold, playful patterns in one pair. Matching is overrated anyway.",
    price: 12.49,
    category: "Socks",
    imageUrl:
      "https://images.pexels.com/photos/15195384/pexels-photo-15195384.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 18,
  },
  {
    name: "Rainbow Stripe Socks",
    description:
      "Wide, vivid rainbow stripes from toe to cuff. Impossible to lose in the laundry, impossible not to smile at.",
    price: 10.49,
    category: "Socks",
    imageUrl:
      "https://images.pexels.com/photos/9050050/pexels-photo-9050050.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 28,
  },
  {
    name: "Surprise Gift Socks",
    description:
      "A cozy, colorful pair that looks just as good gift-wrapped as it does on your feet.",
    price: 13.49,
    category: "Socks",
    imageUrl:
      "https://images.pexels.com/photos/6832965/pexels-photo-6832965.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 15,
  },
];

async function seed() {
  try {
    await connectDB();
    await Product.deleteMany();
    const created = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${created.length} products.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
