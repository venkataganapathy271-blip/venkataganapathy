import mongoose from "mongoose";

const MONGODB_DB = process.env.MONGODB_DB || "venkataganapathi";

function getUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }
  return uri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/* Global cache to prevent multiple connections in dev (hot reloads) */
const globalWithMongoose = globalThis as unknown as { mongoose: MongooseCache };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    const baseUri = getUri();
    const uri = baseUri.includes("mongodb+srv://")
      ? `${baseUri}${baseUri.endsWith("/") ? "" : "/"}${MONGODB_DB}`
      : baseUri;

    globalWithMongoose.mongoose.promise = mongoose.connect(uri, {
      dbName: MONGODB_DB,
      bufferCommands: false,
    });
  }

  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  } catch (err) {
    globalWithMongoose.mongoose.promise = null;
    throw err;
  }

  return globalWithMongoose.mongoose.conn;
}

export default connectDB;
