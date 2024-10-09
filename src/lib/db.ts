// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"
import mongoose from "mongoose"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient
 
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client



//add mongoose db connection 
let isConnected: boolean = false;

async function dbConnect() {
  if (isConnected) {
    console.log("Mongoose is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(uri);
    isConnected = !!db.connections[0].readyState;
    console.log("Mongoose connection established");
  } catch (error) {
    console.error("Error connecting to Mongoose", error);
    throw new Error("Failed to connect to MongoDB with Mongoose");
  }
}


export {dbConnect}