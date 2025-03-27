import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import carouselRoutes from "./routes/carouselRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/carousel", carouselRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
