import mongoose from "mongoose";
import bcrypt from "bcrypt";

const entrySchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true,
  },
  proteinAmount: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  proteinGoal: {
    type: String,
    default: "0",
  },
  entries: [entrySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

export default mongoose.model("User", userSchema);
