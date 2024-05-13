import express from "express";
import AuthHandlers from "../handlers/authHandler.js";
import userVerification from "../middlewares/authMiddleware.js";

const { Signup, Login } = AuthHandlers;

const router = express.Router();

router.post("/", userVerification, (req, res) => {
  if (req.user) {
    res.status(200).json({ status: true, user: req.user.username });
  } else {
    res.status(401).json({ status: false });
  }
});

router.post("/signup", Signup);
router.post("/login", Login);

export default router;
