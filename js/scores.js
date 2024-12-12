function getVarFromLocalStorage(varToGet) {
  let varToReturn = null;
  if (localStorage.getItem(varToGet) === null) {
    varToReturn = "No Data";
  } else {
    varToReturn = localStorage.getItem(varToGet);
  }
  return varToReturn;
}

function getScoresFromGame(gameName) {
  if (getVarFromLocalStorage(gameName) === "No Data") {
    return 0;
  } else {
    return getVarFromLocalStorage(gameName);
  }
}

function clearAllScores() {
  // Clear all game scores from localStorage
  localStorage.removeItem("geoFlagsQuizScores");
  localStorage.removeItem("geoCapitalsQuizScores");
  localStorage.removeItem("musicGameScore");
  localStorage.removeItem("englishGameScore");
  localStorage.removeItem("biologyGameScores");
  localStorage.removeItem("mathGame1Scores");

  // Reload the scores display
  loadScores();
}

function loadScores() {
  // retrieve data from localStorage

  // populate data for Geography - Flags, Capitals
  document.getElementById("geo-flags").textContent =
    getVarFromLocalStorage("geoFlagsQuizScores");
  document.getElementById("geo-capitals").textContent = getVarFromLocalStorage(
    "geoCapitalsQuizScores",
  );

  // populate data for Music
  document.getElementById("music-game").textContent =
    getVarFromLocalStorage("musicGameScore");

  // populate data for English
  document.getElementById("english-game1").textContent =
    getVarFromLocalStorage("englishGameScore");

  // populate data for Biology
  document.getElementById("biology-game").textContent =
    getVarFromLocalStorage("biologyGameScores");

  // populate data for Mathematics
  document.getElementById("math-game1").textContent =
    getVarFromLocalStorage("mathGame1Scores");

  let totalScores =
    +getScoresFromGame("geoFlagsQuizScores") +
    +getScoresFromGame("geoCapitalsQuizScores") +
    +getScoresFromGame("musicGameScore") +
    +getScoresFromGame("englishGameScore") +
    +getScoresFromGame("biologyGameScores") +
    +getScoresFromGame("mathGame1Scores");
  document.getElementById("total-scores").textContent =
    `Total scores: ${totalScores}/70`;
}

// Show modal instead of using confirm()
document.getElementById("clear-scores").addEventListener("click", function () {
  document.getElementById("clearScoresModal").style.display = "flex";
});

function closeModal() {
  document.getElementById("clearScoresModal").style.display = "none";
}

function confirmClear() {
  clearAllScores();
  closeModal();
}

// Close modal if clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("clearScoresModal");
  if (event.target === modal) {
    closeModal();
  }
};

window.onload = function () {
  document.getElementById("clearScoresModal").style.display = "none";
  loadScores(); // Keep your existing loadScores call
};

