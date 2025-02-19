const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true},
    image: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
