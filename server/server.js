import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://acostaeric505:9MVKfJa3D6Q6BcnX@icarus.lkxp6pr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use(cookieParser());

app.use("/", authRoute);

const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
