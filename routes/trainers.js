const express = require('express');
const router = express.Router();
const { getTrainers, getTrainer, createTrainer, updateTrainer, deleteTrainer } = require('../controllers/trainersController');

router.get('/', getTrainers);
router.get('/:id', getTrainer);
router.post('/', createTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
