import express from "express";
import AuthHandlers from "../handlers/authHandler.js";
import userVerification from "../middlewares/authMiddleware.js";

const { Signup, Login } = AuthHandlers;

const router = express.Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

export default router;
