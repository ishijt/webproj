const API_URL = 'https://restcountries.com/v3.1/all';
const flagsContainer = document.getElementById('flags-container');

let correctAnswer = null;

async function fetchCountries() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

function generateQuestion(countries) {
  const correctCountry = countries[Math.floor(Math.random() * countries.length)];
  correctAnswer = correctCountry.flags.png;
  const options = [correctCountry];
  return options;
}

function displayFlags(countries) {
  flagsContainer.innerHTML = '';
  countries.forEach((country) => {
    const button = document.createElement('button');
    button.innerHTML = `<img src="${country.flags.png}" alt="Flag">`;
    flagsContainer.appendChild(button);
  });
}

function displayFlags(countries) {
  flagsContainer.innerHTML = '';
  countries.forEach(country => {
    const flagButton = document.createElement('button');
    flagButton.classList.add('flag-button');
    flagButton.innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}">`;
    flagButton.addEventListener('click', () => handleFlagClick(country.flags.png, flagButton));
    flagsContainer.appendChild(flagButton);
  });
}