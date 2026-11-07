const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Maps a MongoDB product document to the shape the React UI already uses
// (`id` + `image` instead of `_id` + `imageUrl`).
export function mapProduct(doc) {
  return {
    id: doc._id,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    image: doc.imageUrl,
    stock: doc.stock,
  };
}

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  const data = await res.json();
  return data.map(mapProduct);
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to load product");
  }
  const data = await res.json();
  return mapProduct(data);
}
