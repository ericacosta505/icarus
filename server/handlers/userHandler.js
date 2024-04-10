import User from "../models/user.js";

const updateProteinGoal = async (req, res) => {
  const { email } = req.params;
  const { proteinGoal } = req.body;

  if (!proteinGoal) {
    return res
      .status(400)
      .json({ message: "You must provide a protein goal." });
  }

  // console.log("Updating protein goal for email:", email);
  try {
    const user = await User.findOneAndUpdate(
      { email: decodeURIComponent(email) },
      { proteinGoal: proteinGoal },
      { new: true },
    );
    // console.log("Updated user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "Protein goal updated successfully!", user: user });
  } catch (error) {
    console.error("Error updating protein goal:", error);
    res
      .status(500)
      .json({ message: "Error updating protein goal", error: error });
  }
};

const getProteinGoal = async (req, res) => {
  const { email } = req.params;

  // console.log("Getting protein goal for email", email);

  try {
    const user = await User.findOne({ email: decodeURIComponent(email) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ proteinGoal: user.proteinGoal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting protein goal", error: error });
  }
};

const addEntry = async (req, res) => {
  const { email } = req.params;

  const { mealName, proteinAmount } = req.body;

  if (!email || !mealName || !proteinAmount) {
    return res.status(400).json({ message: "Missing information" });
  }

  try {
    const user = await User.findOne({ email: decodeURIComponent(email) });

    const newEntry = { mealName, proteinAmount, createdAt: Date.now() };

    console.log("About to push", newEntry);

    user.entries.push(newEntry);

    console.log("Finished pushing");

    await user.save();

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error); // For debugging only
    res
      .status(500)
      .json({ message: "Error adding entry", error: error.message });
  }
};

const getTodaysEntries = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email: decodeURIComponent(email) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ todaysEntries: user.entries });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting todays entries", error: error });
  }
};

export default {
  updateProteinGoal,
  getProteinGoal,
  addEntry,
  getTodaysEntries,
};
