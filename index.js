const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌟 ROUTE INI YANG Bikin GAMBAR PREVIEW TIDAK CRASH:
app.get("/", (req, res) => {
  res.send("API Serverless is running!");
});

// Import Route API Utama
app.use("/api", require("./routes/api"));

// Export app untuk Vercel
module.exports = app;