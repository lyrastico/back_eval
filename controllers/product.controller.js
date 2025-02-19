// src/controllers/product.controller.js

const Product = require('../models/product.model');

// Récupérer le statut du serveur
exports.getStatus = (req, res) => {
    const uptime = process.uptime();
    res.json({
        status: 'Online',
        uptime: `${Math.floor(uptime)}s`,
        time: new Date().toISOString()
    });
};

// Créer un produit
exports.createProduct = async (req, res) => {
    try {
        const { nom, prix, image } = req.body;
        if (!nom || !prix || !image) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires : nom, prix, image.' });
        }
        const newProduct = new Product({ nom, prix, image });
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: 'Produit créé avec succès !',
            product: savedProduct
        });
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error);
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
        res.status(400).json({ error: 'ID invalide' });
    }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({
            message: 'Produit mis à jour avec succès !',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error);
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        res.status(400).json({ error: error.message });
    }
};
