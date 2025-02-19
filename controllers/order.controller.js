const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const Product = require('../models/product.model');

// Créer une commande
exports.createOrder = async (req, res) => {
    try {
        const { customerId, products } = req.body;

        // Vérifier si le client existe
        const customer = await Customer.findById( );
        if (!customer) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }

        // Vérifier si les produits existent et calculer le prix total
        let totalPrice = 0;
        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: `Produit avec l'ID ${item.product} non trouvé` });
            }
            totalPrice += product.prix * item.quantity;
        }

        // Création de la commande
        const newOrder = new Order({
            customer: customerId,
            products,
            totalPrice
        });

        const savedOrder = await newOrder.save();

        // Ajouter la commande à la liste des commandes du client
        customer.commandes.push(savedOrder._id);
        await customer.save();

        res.status(201).json({
            message: 'Commande créée avec succès !',
            order: savedOrder
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'nom email') // Inclut les infos du client
            .populate('products.product', 'nom prix'); // Inclut les infos des produits
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une commande par ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customer', 'nom email')
            .populate('products.product', 'nom prix');
        if (!order) return res.status(404).json({ error: 'Commande non trouvée' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: 'ID invalide' });
    }
};

// Mettre à jour une commande (changer le statut)
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedOrder) return res.status(404).json({ error: 'Commande non trouvée' });
        res.status(200).json({
            message: 'Commande mise à jour avec succès !',
            order: updatedOrder
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ error: 'Commande non trouvée' });
        res.status(200).json({ message: 'Commande supprimée avec succès !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
