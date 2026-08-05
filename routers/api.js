const express = require("express");
const router = express.Router();

const penulisController = require("../controller/penulisController");
const komikController = require("../controller/komikController");
const genreController = require("../controller/genreController");
const authMiddleware = require("../middleware/authMiddleware");

// Helper untuk memilih fungsi controller yang valid
const getHandler = (controller, ...methods) => {
  for (const m of methods) {
    if (typeof controller[m] === "function") return controller[m];
  }
  return (req, res) => res.status(500).json({ message: "Handler tidak ditemukan" });
};

// ==========================================
// 1. AUTH / PENULIS ROUTES
// ==========================================
router.post("/register", getHandler(penulisController, "register", "createPenulis", "create"));
router.post("/login", getHandler(penulisController, "login"));

// ==========================================
// 2. GENRE ROUTES (Dukungan singular & plural)
// ==========================================
const genreGetAll = getHandler(genreController, "getAll", "getAllGenre", "findAll", "index");
const genreCreate = getHandler(genreController, "create", "createGenre", "add");
const genreUpdate = getHandler(genreController, "update", "updateGenre", "edit");
const genreDelete = getHandler(genreController, "remove", "deleteGenre", "destroy", "delete");

router.get(["/genre", "/genres"], authMiddleware, genreGetAll);
router.post(["/genre", "/genres"], authMiddleware, genreCreate);
router.put(["/genre/:id", "/genres/:id"], authMiddleware, genreUpdate);
router.delete(["/genre/:id", "/genres/:id"], authMiddleware, genreDelete);

// ==========================================
// 3. KOMIK ROUTES (Dukungan singular & plural)
// ==========================================
const komikGetAll = getHandler(komikController, "getAll", "getAllKomik", "findAll", "index");
const komikCreate = getHandler(komikController, "create", "createKomik", "add");
const komikUpdate = getHandler(komikController, "update", "updateKomik", "edit");
const komikDelete = getHandler(komikController, "remove", "deleteKomik", "destroy", "delete");

router.get(["/komik", "/komiks"], authMiddleware, komikGetAll);
router.post(["/komik", "/komiks"], authMiddleware, komikCreate);
router.put(["/komik/:id", "/komiks/:id"], authMiddleware, komikUpdate);
router.delete(["/komik/:id", "/komiks/:id"], authMiddleware, komikDelete);

module.exports = router;