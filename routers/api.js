const express = require("express");
const router = express.Router();

// 1. GET ALL USERS
router.get("/users", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Berhasil mengambil semua data users",
    data: []
  });
});

// 2. GET SINGLE USER BY ID
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    status: true,
    message: `Berhasil mengambil data user ID ${id}`,
    data: { id, username: "zaki", email: "zaki@gmail.com" }
  });
});

// 3. CREATE USER (POST)
router.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  res.status(201).json({
    status: true,
    message: "User berhasil dibuat!",
    data: { username, email }
  });
});

// 4. UPDATE USER BY ID (PUT)
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  res.status(200).json({
    status: true,
    message: `User ID ${id} berhasil diperbarui!`,
    data: { id, username, email }
  });
});

// 5. DELETE USER BY ID (DELETE)
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    status: true,
    message: `User ID ${id} berhasil dihapus!`
  });
});

module.exports = router;