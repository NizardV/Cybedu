const path = require("path");
const { readJson, writeJson } = require("./jsonDb");

const LEADERBOARD_FILE = path.join(__dirname, "..", "db", "leaderboard.json");

async function getLeaderboard() {
  return readJson(LEADERBOARD_FILE, []);
}

async function updateLeaderboardEntry(entry) {
  const leaderboard = await getLeaderboard();

  // Trouver l'utilisateur existant
  const index = leaderboard.findIndex(e => e.userId === entry.userId);

  if (index !== -1) {
    // Mise à jour de l'entrée existante
    leaderboard[index] = {
      ...leaderboard[index],
      ...entry
    };
  } else {
    // Création d'une nouvelle entrée avec les champs corrects
    const newEntry = {
      userId: entry.userId,
      userName: entry.userName || "Unknown",
      score: entry.score || 0,
      isCurrentUser: entry.isCurrentUser ?? false,
      userImage: entry.userImage || null
      // ⚠️ rank sera recalculé, pas stocké !
    };
    leaderboard.push(newEntry);
  }

  // Recalcul du classement (tri par score)
  leaderboard.sort((a, b) => b.score - a.score);

  // Reassign ranks
  leaderboard.forEach((item, i) => {
    item.rank = i + 1;
  });

  await writeJson(LEADERBOARD_FILE, leaderboard);

  return leaderboard;
}

module.exports = {
  getLeaderboard,
  updateLeaderboardEntry,
};
