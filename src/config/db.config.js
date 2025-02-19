// src/config/db.config.js
const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI

    try {
        console.log(`Connexion à MongoDB via ${MONGO_URI}...`);

        // Connexion
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 60000
        });

        // Vérification/Création de la BDD
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        if (!collections.some(col => col.name === 'testCollection')) {
            console.log('Création de la collection test...');
            await db.createCollection('testCollection');
            await db.collection('testCollection').insertOne({ message: "Bienvenue dans bdd_project 🚀" });
        }

        console.log('Base de données "bdd_project" prête à l\'emploi !');

    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        process.exit(1);
    }
};

module.exports = connectDB;
