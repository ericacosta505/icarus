import express from "express";
import UserHandlers from "../handlers/userHandler.js";

const { updateProteinGoal, getProteinGoal } = UserHandlers;

const router = express.Router();

router.post("/updateProteinGoal/:email", updateProteinGoal);
router.get("/getProteinGoal/:email", getProteinGoal);

export default router;
