 import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing - .env.local e set koro");
}

let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

 export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        console.error("MongoDB Connection Error:", err.message);
        cached.promise = null; // কানেকশন ফেইল করলে ক্যাশ ক্লিয়ার করুন
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}