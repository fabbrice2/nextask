# Utilisation d'une image de base officielle de Node.js version 14
# Cela permet de démarrer avec une version stable de Node.js pour éviter de gérer manuellement l'installation de Node et npm
FROM node:14

# Définition du répertoire de travail dans le conteneur
# Cela signifie que toutes les commandes suivantes (comme COPY ou RUN) se dérouleront dans ce répertoire
WORKDIR /app

# Copie des fichiers de configuration du projet dans le répertoire de travail du conteneur
# Ici, on copie package.json et package-lock.json pour permettre l'installation des dépendances
COPY package*.json ./

# Installation des dépendances nécessaires à l'exécution de l'application
# Cela télécharge et installe toutes les dépendances spécifiées dans le fichier package.json
RUN npm install

# Copie de tous les fichiers restants du projet dans le conteneur
# Cette étape permet de récupérer l'ensemble des fichiers du projet (comme les fichiers source) dans l'environnement du conteneur
COPY . .

# Exposition du port 3000 pour permettre l'accès à l'application à partir de l'extérieur du conteneur
# Cela permet à l'application de communiquer avec le monde extérieur via ce port
EXPOSE 3000

# Lancement de l'application à l'intérieur du conteneur
# La commande `npm start` démarre l'application Node.js définie dans le fichier package.json
CMD ["npm", "start"]
