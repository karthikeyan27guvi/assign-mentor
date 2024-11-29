import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  // Add dotenv import to load environment variables


dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection function
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

// Define your models here (Mentor, Student)
// Example: 
// const Mentor = mongoose.model('Mentor', new mongoose.Schema({ name: String }));
// const Student = mongoose.model('Student', new mongoose.Schema({ name: String }));

// Start the server
const PORT = 8801; // You can change this to a different port number like 8801
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
});
