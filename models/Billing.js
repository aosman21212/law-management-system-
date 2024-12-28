const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
    case_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true,
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    invoice_number: {
        type: String,
        required: true,
        unique: true,
    },
    billing_date: {
        type: Date,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    payment_deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Unpaid", "Partially Paid", "Fully Paid"],
        default: "Unpaid",
    },
}, { timestamps: true });

module.exports = mongoose.model("Billing", billingSchema);
