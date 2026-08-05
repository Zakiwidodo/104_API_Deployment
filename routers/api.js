const express = require("express");
const router = express.Router();

// Import Controllers
const penulisController = require("../controller/penulisController");
const komikController = require("../controller/komikController");
const genreController = require("../controller/genreController");

// Import & Handle Middleware
const rawAuth = require("../middleware/authMiddleware");
const authMiddleware = typeof rawAuth === "function" ? rawAuth : (rawAuth.authMiddleware || rawAuth.authenticate);

// ==========================================
// 1. AUTH / PENULIS ROUTES
// ==========================================
router.post("/register", penulisController.register || penulisController.createPenulis || penulisController.create);
router.post("/login", penulisController.login);

// ==========================================
// 2. GENRE ROUTES
// ==========================================
router.get("/genre", authMiddleware, genreController.getAll || genreController.getAllGenre || genreController.findAll);
router.post("/genre", authMiddleware, genreController.create || genreController.createGenre || genreController.add);
router.put("/genre/:id", authMiddleware, genreController.update || genreController.updateGenre || genreController.edit);
router.delete("/genre/:id", authMiddleware, genreController.remove || genreController.deleteGenre || genreController.destroy || genreController.delete);

// ==========================================
// 3. KOMIK ROUTES
// ==========================================
router.get("/komik", authMiddleware, komikController.getAll || komikController.getAllKomik || komikController.findAll);
router.post("/komik", authMiddleware, komikController.create || komikController.createKomik || komikController.add);
router.put("/komik/:id", authMiddleware, komikController.update || komikController.updateKomik || komikController.edit);
router.delete("/komik/:id", authMiddleware, komikController.remove || komikController.deleteKomik || komikController.destroy || komikController.delete);

module.exports = router;