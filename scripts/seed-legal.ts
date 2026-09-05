import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import { DEFAULT_LEGAL_PAGES } from "../src/lib/data";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "venkataganapathi";

async function main() {
  console.log("Connecting to DB...");
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
  const db = mongoose.connection.db;
  if (!db) throw new Error("No DB");

  try {
    await db.dropCollection("legalpages");
    console.log("Dropped existing legalpages collection");
  } catch (e) {
    // collection may not exist
  }

  console.log("Seeding legal pages...");
  
  // Convert dates if needed, but DEFAULT_LEGAL_PAGES uses string or just plain objects.
  // We need to map over it to ensure it's saved as raw MongoDB documents
  const docs = DEFAULT_LEGAL_PAGES.map((p) => ({
    ...p,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await db.collection("legalpages").insertMany(docs);
  
  console.log("Legal pages seeded successfully.");
  await mongoose.disconnect();
}

main().catch(console.error);
