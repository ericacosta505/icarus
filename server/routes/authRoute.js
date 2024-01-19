import Signup from "../handlers/authHandler.js";
import express from "express";

const router = express.Router();

router.post("/signup", Signup);

export default router;
