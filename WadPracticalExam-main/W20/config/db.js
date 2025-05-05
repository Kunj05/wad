const mongoose = require('mongoose');

// Database connection function
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/employeeDB');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
