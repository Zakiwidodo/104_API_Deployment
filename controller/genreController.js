// controller/genreController.js
const db = require('../models');

async function getAllGenre(req, res) {
    try {
        const genres = await db.Genre.findAll();
        res.status(200).json(genres);
    } catch (err) {
        console.error("Error fetching genres:", err.message);
        res.status(500).json({ error: "Failed to fetch genres" });
    }
}

async function getGenreById(req, res) {
    const { id } = req.params;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        res.status(200).json(genre);
    } catch (err) {
        console.error("Error fetching genre:", err.message);
        res.status(500).json({ error: "Failed to fetch genre" });
    }
}

async function createGenre(req, res) {
    // Hanya menerima 'genre' dari body
    const { genre } = req.body; 
    try {
        const newGenre = await db.Genre.create({ genre });
        res.status(201).json(newGenre);
    } catch (err) {
        console.error("Error creating genre:", err.message);
        res.status(500).json({ error: "Failed to create genre" });
    }
}

async function updateGenre(req, res) {
    const { id } = req.params;
    // Hanya menerima 'genre' dari body
    const { genre } = req.body; 
    try {
        const dataGenre = await db.Genre.findByPk(id);
        if (!dataGenre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        
        // Update field genre
        dataGenre.genre = genre;
        await dataGenre.save();
        
        res.status(200).json(dataGenre);
    } catch (err) {
        console.error("Error updating genre:", err.message);
        res.status(500).json({ error: "Failed to update genre" });
    }
}

async function deleteGenre(req, res) {
    const { id } = req.params;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        await genre.destroy();
        res.status(200).json({ message: "Genre successfully deleted" });
    } catch (err) {
        console.error("Error deleting genre:", err.message);
        res.status(500).json({ error: "Failed to delete genre" });
    }
}

module.exports = {
    getAllGenre,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
};