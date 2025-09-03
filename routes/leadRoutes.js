const express = require('express');
const router = express.Router();

const { createLead , getAllLeads, updateLead, deleteLead } = require('../controllers/lead.controller');

// Routes
router.get('/', getAllLeads);
router.post('/', createLead);
router.patch('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;