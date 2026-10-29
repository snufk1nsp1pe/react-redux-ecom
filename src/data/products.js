// Static product catalog for the Bloom & Sole demo store.
// In a real application this would come from an API, but this lab focuses
// on the React/Redux frontend, so the catalog is hard-coded here.
//
// Image sources (see README for full credits):
// - Flowers: real Minecraft item texture renders via blockrender.dev
// - Socks: real photos from Pexels (free to use under the Pexels License)
export const products = [
  {
    id: 1,
    name: "Poppy",
    category: "Flowers",
    price: 6.99,
    image: "https://blockrender.dev/render/item/poppy.png?size=512",
    description:
      "A single, unmistakably red pixel-perfect poppy. A classic pick for any blocky garden or flower pot.",
  },
  {
    id: 2,
    name: "Dandelion",
    category: "Flowers",
    price: 4.99,
    image: "https://blockrender.dev/render/item/dandelion.png?size=512",
    description:
      "A cheerful little yellow dandelion. Simple, sunny, and always the first to pop up in spring.",
  },
  {
    id: 3,
    name: "Cornflower",
    category: "Flowers",
    price: 5.99,
    image: "https://blockrender.dev/render/item/cornflower.png?size=512",
    description:
      "A cool blue bloom with a dark little center. Pairs perfectly with a poppy for some color contrast.",
  },
  {
    id: 4,
    name: "Allium",
    category: "Flowers",
    price: 8.99,
    image: "https://blockrender.dev/render/item/allium.png?size=512",
    description:
      "A tall, round, purple pom-pom of a flower. The showiest bloom in the whole patch.",
  },
  {
    id: 5,
    name: "Azure Bluet",
    category: "Flowers",
    price: 4.49,
    image: "https://blockrender.dev/render/item/azure_bluet.png?size=512",
    description:
      "A tiny white flower with a bright yellow center. Small, delicate, and easy to tuck in anywhere.",
  },
  {
    id: 6,
    name: "Oxeye Daisy",
    category: "Flowers",
    price: 5.49,
    image: "https://blockrender.dev/render/item/oxeye_daisy.png?size=512",
    description:
      "A big, friendly white daisy with a warm golden center. The one everyone plucks petals from.",
  },
  {
    id: 7,
    name: "Rubber Duck Socks",
    category: "Socks",
    price: 10.99,
    image:
      "https://images.pexels.com/photos/18880821/pexels-photo-18880821.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A classic yellow rubber duck print marching across black socks. Squeaky clean style, no bathtub required.",
  },
  {
    id: 8,
    name: "Joker Face Socks",
    category: "Socks",
    price: 11.49,
    image:
      "https://images.pexels.com/photos/14037324/pexels-photo-14037324.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Bold brown-and-yellow socks with a cheeky joker-card design. A playful pair for anyone who likes to clown around.",
  },
  {
    id: 9,
    name: "Candy Rain Socks",
    category: "Socks",
    price: 9.99,
    image:
      "https://images.pexels.com/photos/15195444/pexels-photo-15195444.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A sweet shower of candy-colored patterns. As close to eating a rainbow as your feet will ever get.",
  },
  {
    id: 10,
    name: "Wild Pattern Socks",
    category: "Socks",
    price: 12.49,
    image:
      "https://images.pexels.com/photos/15195384/pexels-photo-15195384.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A clashing mix of bold, playful patterns in one pair. Matching is overrated anyway.",
  },
  {
    id: 11,
    name: "Rainbow Stripe Socks",
    category: "Socks",
    price: 10.49,
    image:
      "https://images.pexels.com/photos/9050050/pexels-photo-9050050.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Wide, vivid rainbow stripes from toe to cuff. Impossible to lose in the laundry, impossible not to smile at.",
  },
  {
    id: 12,
    name: "Surprise Gift Socks",
    category: "Socks",
    price: 13.49,
    image:
      "https://images.pexels.com/photos/6832965/pexels-photo-6832965.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A cozy, colorful pair that looks just as good gift-wrapped as it does on your feet.",
  },
];

// Unique list of categories, used to build the category filter UI.
export const categories = [...new Set(products.map((p) => p.category))];
