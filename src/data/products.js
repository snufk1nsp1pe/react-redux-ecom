// Static product catalog for the Bloom & Sole demo store.
// In a real application this would come from an API, but this lab focuses
// on the React/Redux frontend, so the catalog is hard-coded here.
// Images come from LoremFlickr, tagged by subject, with a fixed "lock" value
// so each product keeps the same picture on every reload.
export const products = [
  {
    id: 1,
    name: "Sunny Daisy Bouquet",
    category: "Flowers",
    price: 24.99,
    image: "https://loremflickr.com/500/500/daisy,flowers?lock=1",
    description:
      "A cheerful hand-tied bunch of fresh daisies, perfect for brightening up any room on a dull day.",
  },
  {
    id: 2,
    name: "Vintage Rose Bundle",
    category: "Flowers",
    price: 34.99,
    image: "https://loremflickr.com/500/500/roses,flowers?lock=2",
    description:
      "Deep red garden roses wrapped in kraft paper, for a classic, romantic bouquet with a retro feel.",
  },
  {
    id: 3,
    name: "Wildflower Mix Bunch",
    category: "Flowers",
    price: 19.99,
    image: "https://loremflickr.com/500/500/wildflowers?lock=3",
    description:
      "An untamed, colorful mix of seasonal wildflowers - like a meadow picked straight into a vase.",
  },
  {
    id: 4,
    name: "Potted Marigold Plant",
    category: "Flowers",
    price: 14.99,
    image: "https://loremflickr.com/500/500/marigold,plant?lock=4",
    description:
      "A low-maintenance potted marigold that keeps blooming for weeks, right on your windowsill.",
  },
  {
    id: 5,
    name: "Dried Lavender Bunch",
    category: "Flowers",
    price: 17.99,
    image: "https://loremflickr.com/500/500/lavender?lock=5",
    description:
      "Fragrant dried lavender stems that keep their color and scent for months - no watering required.",
  },
  {
    id: 6,
    name: "Sunflower Stem Trio",
    category: "Flowers",
    price: 22.99,
    image: "https://loremflickr.com/500/500/sunflower?lock=6",
    description:
      "Three tall, golden sunflowers that bring instant 70s-summer energy to any table.",
  },
  {
    id: 7,
    name: "Groovy Stripe Crew Socks",
    category: "Socks",
    price: 9.99,
    image: "https://loremflickr.com/500/500/socks,stripes?lock=101",
    description:
      "Soft cotton crew socks in bold rainbow stripes - because your ankles deserve some groove too.",
  },
  {
    id: 8,
    name: "Retro Argyle Socks",
    category: "Socks",
    price: 11.99,
    image: "https://loremflickr.com/500/500/socks,pattern?lock=102",
    description:
      "A classic argyle pattern reimagined in warm mustard and burnt-orange tones.",
  },
  {
    id: 9,
    name: "Fuzzy Polka Dot Socks",
    category: "Socks",
    price: 12.99,
    image: "https://loremflickr.com/500/500/socks,wool?lock=103",
    description:
      "Extra-fuzzy knit socks covered in cheerful polka dots, for cozy nights on the couch.",
  },
  {
    id: 10,
    name: "Rainbow Terry Socks",
    category: "Socks",
    price: 10.99,
    image: "https://loremflickr.com/500/500/socks,colorful?lock=104",
    description:
      "Thick terry-cloth socks in a full rainbow gradient - comfy, cushioned, and impossible to miss.",
  },
  {
    id: 11,
    name: "Mushroom Pattern Ankle Socks",
    category: "Socks",
    price: 8.99,
    image: "https://loremflickr.com/500/500/socks,cute?lock=105",
    description:
      "Playful ankle socks covered in little mushrooms, for a cottagecore touch to any outfit.",
  },
  {
    id: 12,
    name: "Checkerboard Knee-High Socks",
    category: "Socks",
    price: 13.99,
    image: "https://loremflickr.com/500/500/socks,fashion?lock=106",
    description:
      "Bold black-and-cream checkerboard knee-highs, straight out of a 70s skate park.",
  },
];

// Unique list of categories, used to build the category filter UI.
export const categories = [...new Set(products.map((p) => p.category))];
