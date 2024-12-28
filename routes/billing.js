const express = require("express");
const Billing = require("../models/Billing");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Billing Record
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { case_id, client_id, invoice_number, billing_date, total_amount, payment_deadline } = req.body;

        const newBilling = new Billing({
            case_id,
            client_id,
            invoice_number,
            billing_date,
            total_amount,
            payment_deadline,
        });

        const savedBilling = await newBilling.save();

        res.status(201).json({
            message: "Billing record created successfully",
            billing: savedBilling,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Billing Records
router.get("/", authMiddleware, async (req, res) => {
    try {
        const billingRecords = await Billing.find()
            .select("_id invoice_number total_amount status")
            .populate("case_id", "caseTitle")
            .populate("client_id", "first_name last_name");

        res.status(200).json(billingRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Billing Status
router.patch("/:id/status", authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Unpaid", "Partially Paid", "Fully Paid"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedBilling = await Billing.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedBilling) {
            return res.status(404).json({ message: "Billing record not found" });
        }

        res.status(200).json({
            message: "Billing status updated successfully",
            billing: updatedBilling,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
