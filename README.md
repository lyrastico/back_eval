# Backend API avec MongoDB et Express

## Description
Ce projet fournit un backend d'API utilisant **Express.js** et **MongoDB**, avec un environnement Dockerisé permettant de gérer la base de données et le serveur de manière efficace.

## Fonctionnalités
- **Serveur Express** : Afin de créer une application web.
- **MongoDB** : Base de données NoSQL pour stocker les informations.
- **Docker** : Gestion automatisée des conteneurs pour un déploiement facile.
- **docker-compose.yml** : lance tout le projet, créé la bddsi elle n'existe pas, et exécute les comandes qu'il faut pour son bon fonctionnement

## Installation et Démarrage
### 1. Prérequis
Assurez-vous d'avoir installé :
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [cURL](https://curl.se/) (pour tester l'API en ligne de commande)

### 2. Lancer le projet
Exécutez la comande "docker-compose up --build" pour démarrer les conteneurs Docker :

cette commande :
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
curl -X GET http://localhost:5000/time
```

## Technologies utilisées
- **Node.js** avec **Express.js** pour le serveur backend
- **MongoDB** pour la base de données
- **Docker** pour la gestion des conteneurs
- **Shell Scripting** (`run.sh` et `test.sh`) pour automatiser les tâches

## Structure du projet
```
.
├── controllers/     # Contrôleurs Express
├── models/         # Modèles Mongoose
├── routes/         # Routes Express
├── server.js       # Point d'entrée du serveur
├── Dockerfile      # Configuration du conteneur backend
├── docker-compose.yml  # Gestion des services Docker
├── README.md       # Documentation
├── run.sh
├── test.sh
```

## Arrêter et Nettoyer les Conteneurs
Pour arrêter et supprimer les conteneurs créés, utilisez :
```bash
docker-compose down
```

## Auteur
Projet réalisé par **BARTHES Louis**, **ROCHE Romain** et **PONSSON Mathis**

---
Votre API est maintenant prête à être utilisée et testée !

