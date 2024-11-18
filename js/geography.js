const API_URL = 'https://restcountries.com/v3.1/all';

let correctAnswer = null;

async function fetchCountries() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

function generateQuestion(countries) {
  const correctCountry = countries[Math.floor(Math.random() * countries.length)];
  correctAnswer = correctCountry.flags.png; // URL правильного флага
  const options = [correctCountry]; // Добавить правильный ответ
  return options;
}
