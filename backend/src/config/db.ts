import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    throw new Error("MONGO_URL is not defined in environment variables.");
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`DB Connected Successfully}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
