import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();

const items = [
  {
    name: "MacBook Pro",
    price: 1800,
    description: "Powerful laptop for professionals",
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    name: "Gaming Laptop",
    price: 1500,
    description: "High performance gaming laptop",
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    name: "Wireless Headphones",
    price: 200,
    description: "Noise cancelling headphones",
    image: "https://via.placeholder.com/300",
    category: "Accessories",
  },
  {
    name: "Smart Watch",
    price: 350,
    description: "Track fitness and notifications",
    image: "https://via.placeholder.com/300",
    category: "Wearables",
  },
  {
    name: "iPhone 15",
    price: 1200,
    description: "Latest Apple smartphone",
    image: "https://via.placeholder.com/300",
    category: "Mobile",
  },
  {
    name: "Office Chair",
    price: 250,
    description: "Comfortable ergonomic chair",
    image: "https://via.placeholder.com/300",
    category: "Furniture",
  },
  {
    name: "Mechanical Keyboard",
    price: 150,
    description: "RGB mechanical keyboard",
    image: "https://via.placeholder.com/300",
    category: "Accessories",
  },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany(); // clean old data
    await Item.insertMany(items);

    console.log("✅ Items seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
