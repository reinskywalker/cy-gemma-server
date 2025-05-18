import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

export async function connect() {
    try {
      await mongoose.connect(uri as string, {
        serverSelectionTimeoutMS: 10000,
        ssl: true,
      });
  
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection failed:', err);
    }
  }
  