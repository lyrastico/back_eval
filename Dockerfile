# 🌐 Image officielle Node.js
FROM node:18-alpine

# 🏢 Définir le répertoire de travail
WORKDIR /app

# 🔍 Copier les fichiers nécessaires
COPY package*.json ./

# ⚙️ Installer les dépendances
RUN npm install

# 📂 Copier le reste du code
COPY . .

# 🌍 Exposer le port de l'application
EXPOSE 3000

# 🚀 Lancer l'application
CMD ["npm", "start"]
