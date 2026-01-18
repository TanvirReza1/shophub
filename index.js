import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Item from "../models/Item.js";

dotenv.config();

const app = express();

/* ✅ CORS */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app", // add later
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ✅ MongoDB Connection (Singleton Pattern) */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB Connected");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

/* 🔹 Routes */
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/items/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

app.post("/items", async (req, res) => {
  if (!req.headers.cookie?.includes("auth_token")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ✅ EXPORT (NO app.listen) */
export default app;
