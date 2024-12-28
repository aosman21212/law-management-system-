const express = require('express');
const Client = require('../models/Client');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Client
router.post('/',authMiddleware, async (req, res) => {
    try {
        const client = new Client(req.body);
        const savedClient = await client.save();
        res.status(201).json({ message: 'Client created successfully', client: savedClient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Clients
router.get('/',authMiddleware, async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Client by ID
router.get('/:id',authMiddleware, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Client
router.put('/:id',authMiddleware, async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a Client
router.delete('/:id',authMiddleware, async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
