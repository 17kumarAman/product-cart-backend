const express = require("express");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const router = express.Router();

// Get all items in cart
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
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
    const product = await Product.findById(productId);

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
router.patch("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const updatedDetails = req.body;

  try {
    const user = await User.findById(userId);
    const cartItem = user.cart.id(productId);

    if (cartItem) {
      cartItem.set(updatedDetails);
      await user.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete item from cart
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);
    user.cart.id(productId).remove();
    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
