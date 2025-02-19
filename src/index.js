const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const orderRoutes = require('./routes/order.routes');
const customerRoutes = require('./routes/customer.routes');
const productRoutes = require('./routes/product.routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

// Middleware
app.use(express.json());

// Routes de l'API avec préfixes
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});
