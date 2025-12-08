import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grand-restaurant';
    try {
        await mongoose.connect(uri);
        console.log('DB connected');
    } catch (e) {
        console.error('DB connection error:', e);
        throw e;
    }
};