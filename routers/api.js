const express = require("express");
const router = express.Router();

// Route POST untuk testing /api/users
router.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  
  res.status(201).json({
    status: true,
    message: "User berhasil dibuat!",
    data: { username, email }
  });
});

module.exports = router;