const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    case_id: { type: String, required: true },
    document_name: { type: String, required: true },
    document_type: { type: String, required: true },
    file_path: { type: String, required: true }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
