import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri);
const db = client.db("black-coffee-store");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user:{
       additionalFields: {
          phone: {
              type: "string",
              input: true
            } 
        }
    },
  database: mongodbAdapter(db, {
    client,
  }),
});
