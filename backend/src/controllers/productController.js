const Product = require("../models/Product");

// GET /api/products
async function getProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:id
async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// POST /api/products (JWT required)
async function createProduct(req, res, next) {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !description || price === undefined || !category || !imageUrl) {
      return res.status(400).json({
        message: "name, description, price, category and imageUrl are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl,
      stock: stock ?? 0,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

// PUT /api/products/:id (JWT required)
async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/products/:id (JWT required)
async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
