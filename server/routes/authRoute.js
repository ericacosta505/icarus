import express from "express";
import AuthHandlers from "../handlers/authHandler.js";

const { Signup, Login } = AuthHandlers;

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;
