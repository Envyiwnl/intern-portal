import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import internRouter from "./routes/intern.js";
import authRouter from "./routes/auth.js";
import auth from "./middleware/auth.js";

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://intern-portal-ten.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin for: such as mobile apps, curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
}));

app.use(express.json());

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRouter);
app.use("/api/intern", auth, internRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
