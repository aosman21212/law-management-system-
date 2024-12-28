const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
    case_id: { type: String, required: true },
    hearing_date: { type: Date, required: true },
    court_name: { type: String, required: true },
    judge_name: { type: String, required: true },
    hearing_type: { type: String, required: true },
    notes: { type: String },
}, { timestamps: true });

const Hearing = mongoose.model('Hearing', hearingSchema);

module.exports = Hearing;
