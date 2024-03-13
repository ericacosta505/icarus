import express from "express";
import updateProteinGoal from "../handlers/userHandler.js";

const router = express.Router();

router.post("/updateProteinGoal/:email", updateProteinGoal);

export default router;
