import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./config/connectdb.js";

import userRoutes from "./routes/userRoute.js";

const server = express();

dotenv.config();
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS POLICY
server.use(cors());

// JSON
server.use(express.json());

// Database connection
// connectDb(DATABASE_URL);

// Load Routes

server.use("/api/user",userRoutes);

connectDb(DATABASE_URL).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
