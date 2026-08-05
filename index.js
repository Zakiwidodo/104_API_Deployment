const express = require('express');
const connectToDatabase = require('./config/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Diubah dari './routes/api' menjadi './routers/api'
app.use('/api', require('./routers/api'));

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();