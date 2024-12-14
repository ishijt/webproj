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

function showModal() {
  const modal = document.getElementById("clearScoresModal");
  modal.style.display = "flex";
  modal.style.visibility = "visible";
}

function closeModal() {
  const modal = document.getElementById("clearScoresModal");
  modal.style.display = "none";
  modal.style.visibility = "hidden";
}

function confirmClear() {
  clearAllScores();
  closeModal();
}

document.addEventListener("DOMContentLoaded", function () {
  loadScores();

  const clearButton = document.getElementById("clear-scores");
  if (clearButton) {
    clearButton.addEventListener("click", showModal);
  }

  const modal = document.getElementById("clearScoresModal");
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  closeModal();
});
