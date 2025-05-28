const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  inStock: { type: Boolean, default: true }
});


const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  variants: [variantSchema],
  features: [{ type: String }],
  availableQuantity: { type: Number, required: true, default: 0},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
