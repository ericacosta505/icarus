import express from "express";
import UserHandlers from "../handlers/userHandler.js";
import userVerification from "../middlewares/authMiddleware.js";

const {
  updateProteinGoal,
  getProteinGoal,
  addEntry,
  getTodaysEntries,
  sumTodaysEntries,
  deleteEntry,
} = UserHandlers;

const router = express.Router();

router.use(userVerification)

router.post("/updateProteinGoal", updateProteinGoal);
router.get("/getProteinGoal", getProteinGoal);
router.post("/addEntry", addEntry);
router.get("/getTodaysEntries", getTodaysEntries);
router.get("/sumTodaysEntries", sumTodaysEntries);
router.delete("/deleteEntry/:entryId", deleteEntry);

export default router;
