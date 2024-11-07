require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.query("SELECT 1", (err, results) => {
  if (err) {
    console.error(
      "Erreur lors de la connexion de test à la base de données :",
      err
    );
  } else {
    console.log("Test de connexion réussi !");
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log("Tentative d'inscription pour :", email);

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Erreur lors de la requête SELECT :", err);
          return res.status(500).json({ message: "Erreur de serveur." });
        }
        if (results.length > 0) {
          console.log("Email déjà utilisé :", email);
          return res.status(400).json({ message: "Email déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Mot de passe haché créé :", hashedPassword);

        db.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error(
                "Erreur lors de l'insertion dans la base de données :",
                err
              );
              return res
                .status(500)
                .json({ message: "Erreur lors de l'inscription." });
            }
            console.log("Inscription réussie pour :", email);
            res.status(201).json({ message: "Inscription réussie !" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Erreur de serveur :", err);
    res.status(500).json({ message: "Erreur de serveur." });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
}

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Tentative de connexion pour :", email);

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Erreur lors de la requête SELECT :", err);
          return res.status(500).json({ message: "Erreur de serveur." });
        }
        if (results.length === 0) {
          return res
            .status(401)
            .json({ message: "Email ou mot de passe incorrect." });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Email ou mot de passe incorrect." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({ token, email: user.email, message: "Connexion réussie !" });
      }
    );
  } catch (err) {
    console.error("Erreur de serveur :", err);
    res.status(500).json({ message: "Erreur de serveur." });
  }
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des tâches : ", err);
      return res.status(500).json({ message: "Erreur de serveur." });
    }
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { title, body, user_id, status } = req.body;
  db.query(
    "INSERT INTO posts (title, body, user_id, status, created_at) VALUES (?, ?, ?, ?, NOW())",
    [title, body, user_id, status],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de l'ajout de la tâche : ", err);
        return res
          .status(500)
          .json({ message: "Erreur lors de l'ajout de la tâche." });
      }
      res.status(201).json({ message: "Tâche ajoutée avec succès." });
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    "UPDATE posts SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la tâche : ", err);
        return res
          .status(500)
          .json({ message: "Erreur lors de la mise à jour de la tâche." });
      }
      res.json({ message: "Tâche mise à jour avec succès." });
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de la tâche : ", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la tâche." });
    }
    res.json({ message: "Tâche supprimée avec succès." });
  });
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Vous avez accédé à une route protégée",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
