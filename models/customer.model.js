const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    nom: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, 'Adresse email invalide']
    },
    commandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
