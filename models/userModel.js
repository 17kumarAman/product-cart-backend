const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartItem = require('./cartModel')

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: [CartItem]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
