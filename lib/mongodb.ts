import { MongoClient } from 'mongodb';

if (!process.env.ATLAS_URI) {
  console.error('❌ Error: Missing ATLAS_URI. Make sure it is set at the root .env or .env.local (not just database/config.env).');
  throw new Error('Invalid/Missing environment variable: "ATLAS_URI"');
}

const uri = process.env.ATLAS_URI;
console.log('[MongoDB] Using ATLAS_URI:', uri?.slice(0, 40) + '...');
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
