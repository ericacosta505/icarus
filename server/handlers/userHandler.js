import User from "../models/user.js";

const updateProteinGoal = async (req, res) => {
  const { email } = req.params;
  const { proteinGoal } = req.body;

  if (!proteinGoal) {
    return res
      .status(400)
      .json({ message: "You must provide a protein goal." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: decodeURIComponent(email) },
      { proteinGoal: proteinGoal },
      { new: true }
    );
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

    user.entries.push(newEntry);

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
    // Get today's date at 00:00:00 and 23:59:59 to cover the full day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Filter entries to include only those added today
    const todaysEntries = user.entries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= todayStart && entryDate <= todayEnd;
    });

    res.json({ todaysEntries });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting todays entries", error: error });
  }
};

const sumTodaysEntries = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email: decodeURIComponent(email) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Get today's date at 00:00:00 and 23:59:59 to cover the full day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Filter entries to include only those added today
    const todaysEntries = user.entries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= todayStart && entryDate <= todayEnd;
    });

    // Calculate the sum of proteinAmount for today's entries
    const totalProteinToday = todaysEntries.reduce((sum, entry) => {
      return sum + (Number(entry.proteinAmount) || 0);
    }, 0);

    // Send the total protein amount as response
    return res.json({
      message: "Total protein consumed today:",
      totalProteinToday: totalProteinToday,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error calculating sum of todays entries",
      error: error,
    });
  }
};

const deleteEntry = async (req, res) => {
  const { email, entryId } = req.params;

  if (!email || !entryId) {
    return res.status(400).json({ message: "Missing information" });
  }

  try {
    const user = await User.findOne({ email: decodeURIComponent(email) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the index of the entry to delete
    const indexToDelete = user.entries.findIndex(
      (entry) => entry._id.toString() === entryId
    );

    if (indexToDelete === -1) {
      return res.status(404).json({ message: "Entry not found." });
    }

    // Remove the entry from the user's entries array
    user.entries.splice(indexToDelete, 1);

    await user.save();

    res.json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting entry", error: error.message });
  }
};

export default {
  updateProteinGoal,
  getProteinGoal,
  addEntry,
  getTodaysEntries,
  sumTodaysEntries,
  deleteEntry,
};
