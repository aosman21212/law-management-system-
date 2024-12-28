const express = require('express');
const Hearing = require('../models/Hearing');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Schedule a Hearing
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { case_id, hearing_date, court_name, judge_name, hearing_type, notes } = req.body;

        const hearing = new Hearing({
            case_id,
            hearing_date,
            court_name,
            judge_name,
            hearing_type,
            notes,
        });

        const savedHearing = await hearing.save();
        res.status(201).json({
            message: 'Hearing scheduled successfully',
            hearing: savedHearing,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Hearings for a Case
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { case_id } = req.query;

        const hearings = await Hearing.find({ case_id }).select(
            '_id hearing_date court_name judge_name'
        );

        res.status(200).json(hearings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
