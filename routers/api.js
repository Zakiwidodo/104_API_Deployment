const express = require("express");
const router = express.Router();

const genreController = require("../controller/genreController");
const komikController = require("../controller/komikController");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/komik", komikController.getAllKomik);
router.get("/komik/:id", komikController.getKomikById);

router.post("/komik", authMiddleware, komikController.createKomik);
router.put("/komik/:id", authMiddleware, komikController.updateKomik);
router.delete("/komik/:id", authMiddleware, komikController.deleteKomik);

router.get("/genre", authMiddleware, genreController.getAllGenre);
router.get("/genre/:id", authMiddleware, genreController.getGenreById);
router.post("/genre", authMiddleware, genreController.createGenre);
router.put("/genre/:id", authMiddleware, genreController.updateGenre);
router.delete("/genre/:id", authMiddleware, genreController.deleteGenre);

module.exports = router;