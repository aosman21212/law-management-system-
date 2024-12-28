const mongoose = require('mongoose');

// MongoDB Connection Function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
