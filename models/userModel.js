const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
