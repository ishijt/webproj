function getVarFromLocalStorage(varToGet) {
    let varToReturn = null;
    if (localStorage.getItem(varToGet) === null) { // Check for null, not undefined
        varToReturn = 'No Data';
    } else {
        varToReturn = localStorage.getItem(varToGet); // Use varToGet without quotes
    }
    return varToReturn;
}

function getScoresFromGame(gameName){
    if (getVarFromLocalStorage(gameName) === 'No Data') {
        return 0
    }
    else {
        return getVarFromLocalStorage(gameName)
    }
}

function loadScores() {
    // retrieve data from localStorage
  
    // populate data for Geography - Flags, Capitals, Landmarks
    document.getElementById('geo-flags').textContent = getVarFromLocalStorage('geoFlagsQuizScores');
    document.getElementById('geo-capitals').textContent = getVarFromLocalStorage('geoCapitalsQuizScores');
  
    // // populate data for Music
    document.getElementById('music-game').textContent = getVarFromLocalStorage('musicGameScore');
  
    // populate data for English
    document.getElementById('english-game1').textContent = getVarFromLocalStorage('englishGameScore');
  
    // populate data for Biology
    document.getElementById('biology-game1').textContent = getVarFromLocalStorage('biologyGame1Scores');
    document.getElementById('biology-game2').textContent = getVarFromLocalStorage('biologyGame2Scores');
    document.getElementById('biology-game3').textContent = getVarFromLocalStorage('biologyGame3Scores');
  
    // populate data for Mathematics
    document.getElementById('math-game1').textContent = getVarFromLocalStorage('mathGame1Scores');
    document.getElementById('math-game2').textContent = getVarFromLocalStorage('mathGame2Scores');
    document.getElementById('math-game3').textContent = getVarFromLocalStorage('mathGame3Scores');

    let totalScores = 
    +getScoresFromGame('geoFlagsQuizScores') + 
    +getScoresFromGame('geoCapitalsQuizScores') + 
    +getScoresFromGame('musicGameScore') + 
    +getScoresFromGame('englishGameScore') + 
    +getScoresFromGame('biologyGame1Scores') + 
    +getScoresFromGame('biologyGame2Scores') + 
    +getScoresFromGame('biologyGame3Scores') + 
    +getScoresFromGame('mathGame1Scores') + 
    +getScoresFromGame('mathGame2Scores') + 
    +getScoresFromGame('mathGame3Scores');
    document.getElementById('total-scores').textContent = `Total scores: ${totalScores}/100`;
  }
  
  // call the function when the page loads
  window.onload = loadScores;  