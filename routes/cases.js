// routes/cases.js
const express = require('express');
const Case = require('../models/Case');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a Case
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { clientId, caseTitle, caseDescription, caseStatus, assignedTo } = req.body;
        
        // Create a new case
        const newCase = new Case({
            clientId,
            caseTitle,
            caseDescription,
            caseStatus,
            // assignedTo
        });
        
        // Save the case to the database
        const savedCase = await newCase.save();
        res.status(201).json({ message: 'Case created successfully', case: savedCase });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Cases
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cases = await Case.find().populate('clientId', 'first_name last_name email').populate('assignedTo', 'first_name last_name role');
        res.status(200).json(cases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a Case by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const caseDetails = await Case.findById(req.params.id).populate('clientId', 'first_name last_name email').populate('assignedTo', 'first_name last_name role');
        if (!caseDetails) {
            return res.status(404).json({ message: 'Case not found' });
        }
        res.status(200).json(caseDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Case
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { caseTitle, caseDescription, caseStatus, assignedTo } = req.body;
        
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, {
            caseTitle,
            caseDescription,
            caseStatus,
            // assignedTo,
            updatedAt: Date.now()
        }, { new: true });

        if (!updatedCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        res.status(200).json({ message: 'Case updated successfully', case: updatedCase });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a Case
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedCase = await Case.findByIdAndDelete(req.params.id);
        if (!deletedCase) {
            return res.status(404).json({ message: 'Case not found' });
        }
        res.status(200).json({ message: 'Case deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
