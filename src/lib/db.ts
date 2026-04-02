import mongoose from "mongoose";

// Helper to safely get env variables
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}

const MONGODB_URI = getEnv("MONGODB_URI");

// Cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend globalThis
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize cache
const cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

global.mongoose = cached;

export async function connectDB() {
  try {
    // Already connected
    if (cached.conn) {
      console.log("🟢 MongoDB already connected");
      return cached.conn;
    }

    // Create connection
    if (!cached.promise) {
      console.log("🟡 Connecting to MongoDB...");

      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: "smart-expense-manager",
      });
    }

    cached.conn = await cached.promise;

    console.log("✅ MongoDB connected successfully");

    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}