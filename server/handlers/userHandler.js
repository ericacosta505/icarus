import User from "../models/user.js";

const updateProteinGoal = async (req, res) => {
  const { proteinGoal } = req.body;
  const user = req.user;

  if (!proteinGoal) {
    return res
      .status(400)
      .json({ message: "You must provide a protein goal." });
  }

  try {
    user.proteinGoal = proteinGoal;
    await user.save();
    res.json({ message: "Protein goal updated successfully!", user: user });
  } catch (error) {
    console.error("Error updating protein goal:", error);
    res
      .status(500)
      .json({ message: "Error updating protein goal", error: error });
  }
};

const getProteinGoal = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  res.json({ proteinGoal: user.proteinGoal });
};

const addEntry = async (req, res) => {
  const user = req.user;
  const { mealName, proteinAmount } = req.body;

  if (!mealName || !proteinAmount) {
    return res.status(400).json({ message: "Missing information" });
  }

  try {
    const newEntry = { mealName, proteinAmount, createdAt: Date.now() };
    user.entries.push(newEntry);
    await user.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error adding entry:", error);
    res
      .status(500)
      .json({ message: "Error adding entry", error: error.message });
  }
};

const getTodaysEntries = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todaysEntries = user.entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    return entryDate >= todayStart && entryDate <= todayEnd;
  });

  res.json({ todaysEntries });
};

const sumTodaysEntries = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todaysEntries = user.entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    return entryDate >= todayStart && entryDate <= todayEnd;
  });

  const totalProteinToday = todaysEntries.reduce(
    (sum, entry) => sum + (Number(entry.proteinAmount) || 0),
    0
  );
  res.json({
    message: "Total protein consumed today:",
    totalProteinToday: totalProteinToday,
  });
};

const deleteEntry = async (req, res) => {
  const user = req.user;
  const { entryId } = req.params;

  if (!entryId) {
    return res.status(400).json({ message: "Missing information" });
  }

  try {
    const indexToDelete = user.entries.findIndex(
      (entry) => entry._id.toString() === entryId
    );

    if (indexToDelete === -1) {
      return res.status(404).json({ message: "Entry not found." });
    }

    user.entries.splice(indexToDelete, 1);
    await user.save();
    res.json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res
      .status(500)
      .json({ message: "Error deleting entry", error: error.message });
  }
};

const getAllPastEntries = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const pastEntries = user.entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    return entryDate < todayStart;
  });

  res.json({ pastEntries });
};

export default {
  updateProteinGoal,
  getProteinGoal,
  addEntry,
  getTodaysEntries,
  sumTodaysEntries,
  deleteEntry,
  getAllPastEntries,
};
