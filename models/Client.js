const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    company_name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    client_type: { type: String, enum: ['Individual', 'Corporate'], default: 'Individual' },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
