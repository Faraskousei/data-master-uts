const express = require('express');
const router = express.Router();
const db = require('../config/firebase');
const mahasiswaRef = db.ref('mahasiswa');

// Get semua mahasiswa
router.get('/', async (req, res) => {
    try {
        const snapshot = await mahasiswaRef.once('value');
        const mahasiswa = snapshot.val();
        res.json(mahasiswa || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tambah mahasiswa baru
router.post('/', async (req, res) => {
    try {
        const { npm, nama, kelas } = req.body;
        if (!npm || !nama || !kelas) {
            return res.status(400).json({ error: 'Semua field harus diisi' });
        }
        await mahasiswaRef.child(npm).set({ npm, nama, kelas });
        res.status(201).json({ message: 'Mahasiswa berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update mahasiswa
router.put('/:npm', async (req, res) => {
    try {
        const { nama, kelas } = req.body;
        const { npm } = req.params;
        await mahasiswaRef.child(npm).update({ nama, kelas });
        res.json({ message: 'Data mahasiswa berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Hapus mahasiswa
router.delete('/:npm', async (req, res) => {
    try {
        const { npm } = req.params;
        await mahasiswaRef.child(npm).remove();
        res.json({ message: 'Mahasiswa berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 