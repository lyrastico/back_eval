# Image officielle Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les outils nécessaires (bash, jq, curl et zsh)
RUN apk add --no-cache bash jq curl zsh

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
