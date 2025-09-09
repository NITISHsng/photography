// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri);
  (global as any)._mongoClientPromise = client.connect();
}

clientPromise = (global as any)._mongoClientPromise;

export default clientPromise;
