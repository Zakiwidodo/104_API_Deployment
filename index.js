const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Route Root/Utama (Agar preview Vercel tidak "Serverless Function crashed")
app.get("/", (req, res) => {
  res.send("API Serverless is running!");
});

// 2. Import Route API Utama
app.use("/api", require("./routes/api"));

// 3. Middleware penanganan route yang tidak ditemukan (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Endpoint not found",
  });
});

// 4. Middleware Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Jalankan server jika dijalankan secara lokal
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app untuk Serverless Function Vercel
module.exports = app;