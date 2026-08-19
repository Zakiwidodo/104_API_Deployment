const express = require("express");
const router = express.Router();

// Import controller (sesuaikan nama file controller di folder controller kamu)
// Contoh jika ada controller komik, genre, atau penulis:
// const komikController = require("../controller/komik");

// 1. Contoh Route GET
router.get("/", (req, res) => {
  res.json({ message: "API Router terhubung!" });
});

// 2. Contoh Route POST (sesuaikan dengan modul kamu)
router.post("/users", (req, res) => {
  const data = req.body;
  res.status(201).json({
    status: true,
    message: "Data berhasil dikirim!",
    data: data
  });
});

module.exports = router;