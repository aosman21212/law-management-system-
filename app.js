const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors middleware
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const clientRoutes = require('./routes/clients');
const caseRoutes = require('./routes/cases'); // Import your case routes file
const billingRoutes = require("./routes/billing"); // Import Billing routes
const hearingRoutes = require('./routes/hearings');
const documentRoutes = require('./routes/documents');  // Import the new document routes

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Enable CORS for frontend (e.g., React running on localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000', // Update this with your frontend URL
    credentials: true // Include credentials like cookies or tokens if needed
}));

// Parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/cases', caseRoutes);
app.use("/api/billing", billingRoutes); // Use Billing routes
app.use('/api/documents', documentRoutes);  // Register the new routes
app.use('/api/hearings', hearingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
