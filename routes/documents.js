const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Upload Document
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const { case_id, document_name, document_type } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const document = new Document({
            case_id,
            document_name,
            document_type,
            file_path: `/uploads/${req.file.filename}`
        });

        const savedDocument = await document.save();
        res.status(201).json({
            message: 'Document uploaded successfully',
            document: savedDocument
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Documents for a Case
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { case_id } = req.query;
        const documents = await Document.find({ case_id });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
