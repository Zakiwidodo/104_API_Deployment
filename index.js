const express = require("express");
const cors = require("cors");
const app = express();

// 1. Middleware Global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Route Root / Health Check (Mencegah Vercel Serverless Function Crash)
app.get("/", (req, res) => {
  res.send("API Serverless is running successfully!");
});

// 3. Import Router API (Diarsipkan langsung ke folder ./routers/api)
try {
  const apiRoutes = require("./routers/api");
  app.use("/api", apiRoutes);
} catch (error) {
  console.error("Error loading API routes:", error.message);
}

// 4. Middleware 404 Endpoint Not Found
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Endpoint not found",
  });
});

// 5. Middleware Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// 6. Listener Server Lokal (Development)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

// 7. Export App untuk Vercel Serverless Function
module.exports = app;