const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation de l'API pour la gestion des tâches et des utilisateurs",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./index.js"], // Chemin vers ton fichier contenant les routes
};

module.exports = swaggerJSDoc(options);
