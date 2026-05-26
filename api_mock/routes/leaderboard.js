const express = require("express");
const { getLeaderboard, updateLeaderboardEntry } = require("../services/leaderboardService");

const router = express.Router();

// GET - Récupérer le leaderboard complet
router.get("/", async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboard();
    return res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

// POST - Ajouter ou mettre à jour une entrée du leaderboard
router.post("/", async (req, res, next) => {
  try {
    const entry = req.body;

    if (!entry.userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const updated = await updateLeaderboardEntry(entry);
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
