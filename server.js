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
})

let db

async function connectDB() {
    await client.connect()
    db = client.db("testdb")
    console.log("Connected to MongoDB")
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

app.get("/", (req, res) => {
    res.send("The server is running 🔊.")
})

app.get("/posts", async (req, res) => {
    const posts = await db.collection("posts").find().toArray()
    res.json(posts)
})