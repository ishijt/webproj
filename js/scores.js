function loadScores() {
    // retrieve data from localStorage
  
    // populate data for Geography - Flags, Capitals, Landmarks
    document.getElementById('geo-flags').textContent = localStorage.getItem('geoFlagsQuizScores') || 'No Data';
    document.getElementById('geo-capitals').textContent = localStorage.getItem('geoCapitalsQuizScores') || 'No Data';
    document.getElementById('geo-landmarks').textContent = localStorage.getItem('geoLandmarksQuizScores') || 'No Data';
  
    // populate data for Music
    document.getElementById('music-score').textContent = localStorage.getItem('musicQuizScores') || 'No Data';
  
    // populate data for English
    document.getElementById('english-score').textContent = localStorage.getItem('englishQuizScores') || 'No Data';
  
    // populate data for Biology
    document.getElementById('biology-score').textContent = localStorage.getItem('biologyQuizScores') || 'No Data';
  
    // populate data for Mathematics
    document.getElementById('math-score').textContent = localStorage.getItem('mathQuizScores') || 'No Data';
  }
  
  // call the function when the page loads
  window.onload = loadScores;  