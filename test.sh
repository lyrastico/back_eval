#!/bin/bash

# Temp file to store API responses
a=$(mktemp)

# 🛒 1️⃣ Créer deux produits
echo "➡️ Création du premier produit..."
if ! curl -s --json '{ "nom": "Ordinateur", "prix": 1200, "image": "https://example.com/pc.jpg" }' localhost:5000/api/products > "$a";
then echo "POST request failed"; kill -INT $$; fi
idP1="$(jq < "$a" | grep _id | cut -f 2 -d ':' | grep -E '[^" ]+' -o | head -n 1)"

echo "➡️ Création du deuxième produit..."
if ! curl -s --json '{ "nom": "Souris", "prix": 40, "image": "https://example.com/mouse.jpg" }' localhost:5000/api/products > "$a";
then echo "POST request failed"; kill -INT $$; fi
idP2="$(jq < "$a" | grep _id | cut -f 2 -d ':' | grep -E '[^" ]+' -o | head -n 1)"

# 🛒 2️⃣ Récupérer tous les produits
echo "➡️ Récupération des produits..."
if ! curl -s localhost:5000/api/products | jq '.' > "$a";
then echo "GET request failed"; kill -INT $$; fi
cat "$a"

# 👤 3️⃣ Créer un utilisateur
echo "➡️ Création d'un utilisateur..."
if ! curl -s --json '{ "nom": "Alice", "email": "alice@example.com" }' localhost:5000/api/customers > "$a";
then echo "POST request failed"; kill -INT $$; fi
idC="$(jq < "$a" | grep _id | cut -f 2 -d ':' | grep -E '[^" ]+' -o | head -n 1)"

# 👤 4️⃣ Récupérer l'utilisateur
echo "➡️ Récupération de l'utilisateur..."
if ! curl -s localhost:5000/api/customers/"$idC" | jq '.' > "$a";
then echo "GET request failed"; kill -INT $$; fi
cat "$a"

# 📦 5️⃣ Créer une commande associée à cet utilisateur
echo "➡️ Création d'une commande..."
if ! curl -s --json "{ \"customer\": \"$idC\", \"products\": [{ \"product\": \"$idP1\", \"quantity\": 1 }, { \"product\": \"$idP2\", \"quantity\": 2 }], \"totalPrice\": 1280, \"status\": \"En cours\" }" localhost:5000/api/orders > "$a";
then echo "POST request failed"; kill -INT $$; fi
idO="$(jq < "$a" | grep _id | cut -f 2 -d ':' | grep -E '[^" ]+' -o | head -n 1)"

# 📦 6️⃣ Récupérer la commande
echo "➡️ Récupération de la commande..."
if ! curl -s localhost:5000/api/orders/"$idO" | jq '.' > "$a";
then echo "GET request failed"; kill -INT $$; fi
cat "$a"

# 👤 7️⃣ Vérifier l'utilisateur après création de la commande
echo "➡️ Vérification de l'utilisateur (commande associée)..."
if ! curl -s localhost:5000/api/customers/"$idC" | jq '.' > "$a";
then echo "GET request failed"; kill -INT $$; fi
cat "$a"

echo "✅ Test CRUD terminé avec succès !"
