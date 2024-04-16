import express from "express";
import UserHandlers from "../handlers/userHandler.js";

const {
  updateProteinGoal,
  getProteinGoal,
  addEntry,
  getTodaysEntries,
  sumTodaysEntries,
} = UserHandlers;

const router = express.Router();

router.post("/updateProteinGoal/:email", updateProteinGoal);
router.get("/getProteinGoal/:email", getProteinGoal);
router.post("/addEntry/:email", addEntry);
router.get("/getTodaysEntries/:email", getTodaysEntries);
router.get("/sumTodaysEntries/:email", sumTodaysEntries);

export default router;
