const express = require("express");
const connectDatabase = require("./config/db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- LOGIKA KONEKSI DATABASE DARI LAYAR TV ---
let databaseReady = false;
let databasePromise = null;

app.use(async (req, res, next) => {
  try {
    if (!databaseReady) {
      if (!databasePromise) {
        databasePromise = connectDatabase();
      }

      await databasePromise;
      databaseReady = true;
    }

    next();
  } catch (error) {
    console.error("Database initialization failed:", error.message);

    databasePromise = null;
    next(error); // 👈 Menambahkan penanganan error agar request tidak hanging saat DB error
  }
});
// ---------------------------------------------

// Router milik kamu
app.use("/api", require("./routers/api"));

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});