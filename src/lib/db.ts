import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌ Missing MONGODB_URI environment variable");

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // משמרים את הלקוח בין reloadים ב-dev
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDb() {
    const client = await clientPromise;
    return client.db();
}
