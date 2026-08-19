const express = require("express");
const router = express.Router();

// Handler GET /api/users
router.get("/users", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Berhasil mengambil data users!",
    data: []
  });
});

// Handler POST /api/users
router.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  res.status(201).json({
    status: true,
    message: "User berhasil dibuat!",
    data: { username, email }
  });
});

module.exports = router;