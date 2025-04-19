/* eslint-disable */
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is missing from .env.local");
}

const options = {};

let client: MongoClient;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    console.log("🔌 Connecting to MongoDB...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

const exportedClientPromise = global._mongoClientPromise!;
export default exportedClientPromise;
