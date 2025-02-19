const Customer = require('../models/customer.model');

// Créer un client
exports.createCustomer = async (req, res) => {
    try {
        const { nom, email } = req.body;
        if (!nom || !email) {
            return res.status(400).json({ error: 'Le nom et l\'email sont obligatoires.' });
        }
        const newCustomer = new Customer({ nom, email });
        const savedCustomer = await newCustomer.save();
        res.status(201).json({
            message: 'Client créé avec succès !',
            customer: savedCustomer
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer tous les clients
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('commandes');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un client par ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('commandes');
        if (!customer) return res.status(404).json({ error: 'Client non trouvé' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ error: 'ID invalide' });
    }
};

// Mettre à jour un client
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCustomer) return res.status(404).json({ error: 'Client non trouvé' });
        res.status(200).json({
            message: 'Client mis à jour avec succès !',
            customer: updatedCustomer
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un client
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ error: 'Client non trouvé' });
        res.status(200).json({ message: 'Client supprimé avec succès !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
