const { Komik } = require('../models');

// 1. GET ALL
const getAll = async (req, res) => {
  try {
    const komik = await Komik.findAll();
    return res.status(200).json({ status: "success", data: komik });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 2. CREATE (POST)
const create = async (req, res) => {
  try {
    const { judul, sinopsis, tahun_terbit, tahunTerbit, penulis_id, penulisId, genre_id, genreId, harga } = req.body;
    const newKomik = await Komik.create({
      judul,
      sinopsis,
      tahun_terbit: tahun_terbit || tahunTerbit,
      penulis_id: penulis_id || penulisId,
      genre_id: genre_id || genreId,
      harga
    });
    return res.status(201).json({ message: "Komik berhasil ditambahkan", data: newKomik });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 3. UPDATE (PUT)
const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Komik.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Komik berhasil diperbarui" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 4. DELETE
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Komik.destroy({ where: { id } });
    return res.status(200).json({ message: "Komik berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PASTIKAN SEMUA FUNGSI DI-EXPORT DI SINI:
module.exports = {
  getAll,
  create,
  update,
  remove,
  delete: remove
};