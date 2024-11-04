const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');

router.get('/', mahasiswaController.getAllMahasiswa);
router.post('/', mahasiswaController.createMahasiswa);
router.put('/:npm', mahasiswaController.updateMahasiswa);
router.delete('/:npm', mahasiswaController.deleteMahasiswa);

module.exports = router; 