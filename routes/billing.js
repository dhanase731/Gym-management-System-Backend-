const express = require('express');
const router = express.Router();
const { getBills, createBill, updateBill, deleteBill } = require('../controllers/billingController');

router.get('/', getBills);
router.post('/', createBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

module.exports = router;
