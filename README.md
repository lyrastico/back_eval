# Backend API avec MongoDB et Express

## Description
Ce projet fournit un backend d'API utilisant **Express.js** et **MongoDB**, avec un environnement Dockerisé permettant de gérer la base de données et le serveur de manière efficace.

## Fonctionnalités
- **Serveur Express** : Afin de créer une application web.
- **MongoDB** : Base de données NoSQL pour stocker les informations.
- **Docker** : Gestion automatisée des conteneurs pour un déploiement facile.
- **Scripts Bash** : 
  - `run.sh` : Automatisation de la création du réseau et des conteneurs.
  - `test.sh` : Vérification du bon fonctionnement de l'API.

## Installation et Démarrage
### 1. Prérequis
Assurez-vous d'avoir installé :
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [cURL](https://curl.se/) (pour tester l'API en ligne de commande)

### 2. Lancer le projet
Exécutez le script `run.sh` pour démarrer les conteneurs Docker :
```bash
chmod +x run.sh
./run.sh
```
Ce script :
1. Crée un réseau Docker.
2. Lance un conteneur MongoDB.
3. Lance un conteneur avec toutes les bibliothèques nécessaires pour exécuter l'API.

### 3. Tester l'API
Utilisez le script `test.sh` pour vérifier que l'API fonctionne correctement :
```bash
chmod +x test.sh
./test.sh
```
Ou testez manuellement avec `cURL` :
```bash
curl -X GET http://localhost:5000/api/status
```

## Technologies utilisées
- **Node.js** avec **Express.js** pour le serveur backend
- **MongoDB** pour la base de données
- **Docker** pour la gestion des conteneurs
- **docker-compose.yml** pour le  settup du projet
- **test.sh** pour tester les routes

## Structure du projet
```
.
📂 BACK_EVAL
├── 📂 controllers
│   ├── customer.controller.js
│   ├── order.controller.js
│   ├── product.controller.js
│
├── 📂 models
│   ├── customer.model.js
│   ├── order.model.js
│   ├── product.model.js
│
├── 📂 src
│   ├── 📂 config
│   │   ├── db.config.js
│   ├── 📂 routes
│   │   ├── customer.routes.js
│   │   ├── order.routes.js
│   │   ├── product.routes.js
│   ├── index.js
│
├── 📄 .env
├── 📄 .gitattributes
├── 📄 .gitignore
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 📄 package.json
├── 📄 package-lock.json
└── 📄 README.md

```

## Model de données :

**Product (Produit)**

{
  "nom": "Ordinateur",
  "prix": 1200,
  "image": "https://example.com/image.jpg"
}

**Order (Commande)**

{
  "customer": "id_customer",
  "products": [
    { "product": "id_product1", "quantity": 2 },
    { "product": "id_product2", "quantity": 1 }
  ],
  "totalPrice": 2000,
  "status": "En cours"
}

**Customer (Client)**

{
  "nom": "John Doe",
  "email": "johndoe@example.com",
  "commandes": []
}

## API Endpoints

**Produits**

- POST	/api/products	Ajouter un produit
- GET	/api/products	Récupérer tous les produits
- GET	/api/products/:id	Récupérer un produit par ID
- PUT	/api/products/:id	Modifier un produit
- DELETE	/api/products/:id	Supprimer un produit

**Clients**

- POST	/api/customers	Ajouter un client
- GET	/api/customers	Récupérer tous les clients
- GET	/api/customers/:id	Récupérer un client par ID
- PUT	/api/customers/:id	Modifier un client
- DELETE	/api/customers/:id	Supprimer un client

**Commandes**

- POST	/api/orders	Ajouter une commande
- GET	/api/orders	Récupérer toutes les commandes
- GET	/api/orders/:id	Récupérer une commande par ID
- PUT	/api/orders/:id	Modifier une commande
- DELETE	/api/orders/:id	Supprimer une commande


## Arrêter et Nettoyer les Conteneurs
Pour arrêter et supprimer les conteneurs créés, utilisez :
```bash
docker-compose down
```

## Auteur
Projet réalisé par **BARTHES Louis**, **ROCHE Romain** et **PONSSON Mathis**

---
Votre API est maintenant prête à être utilisée et testée !

