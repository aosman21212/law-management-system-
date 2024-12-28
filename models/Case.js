// models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    caseTitle: {
        type: String,
        required: true
    },
    caseDescription: {
        type: String,
        required: true
    },
    caseStatus: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open'
    },
    // assignedTo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;
