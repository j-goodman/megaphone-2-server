const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGO_URI
const express = require("express")

const app = express()
app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function startServer() {
    try {
        await connectDB().catch(console.dir)
        app.listen(3000, () => {
            console.log("Server running on port 3000")
        })
    } catch (error) {
        console.log("Failed to connect.", error)
    }
}

startServer()