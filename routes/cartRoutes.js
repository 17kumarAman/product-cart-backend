const express = require("express");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const router = express.Router();

// Get all items in cart
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("cart");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    };

    user.cart.push(cartItem);
    await user.save();

    res.status(201).json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update item in cart
router.patch("/:userId/:cartItemId", async (req, res) => {
  const { userId, cartItemId } = req.params;
  const updatedDetails = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.id(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cartItem.set(updatedDetails);
    await user.save();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete item from cart
router.delete("/:userId/:cartItemId", async (req, res) => {
  const { userId, cartItemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.id(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cartItem.remove();
    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
