# Étape 1 : Utiliser une image de base
FROM node:14

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de configuration
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers du projet
COPY . .

# Étape 6 : Exposer le port de l'application
EXPOSE 3000

# Étape 7 : Lancer l'application
CMD ["npm", "start"]
