const API_URL = 'https://restcountries.com/v3.1/all';

// get DOM elements
const countryNameElement = document.getElementById('country-name');
const questionNumberElement = document.getElementById('question-number');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');
const nextQuestionButton = document.getElementById('next-question');
const mainContainer = document.querySelector('main');

let correctAnswer = null;
let isAnswered = false;
let questionCount = 0;
let correctAnswers = 0;
const maxQuestions = 10;

// start the quiz
async function startQuiz() {
  const countries = await fetchCountries();
  questionCount = 0;
  correctAnswers = 0; 
  generateQuestion(countries);
  localStorage.setItem('geoCapitalsQuizScores', correctAnswers);
}

// fetches all countries data from the REST API
async function fetchCountries() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.filter(country => country.capital); // Filter only countries with capitals
}

// generates a new question
function generateQuestion(countries) {
  if (questionCount >= maxQuestions) {
    showFinalResult();
    return;
  }

  isAnswered = false;
  questionCount++;

  // Update the displayed question number and total questions
  questionNumberElement.textContent = questionCount;
  document.getElementById('total-questions').textContent = maxQuestions;

  // Randomly select a correct country
  const correctCountry = countries[Math.floor(Math.random() * countries.length)];
  correctAnswer = correctCountry.capital[0];
  countryNameElement.textContent = correctCountry.name.common;

  // Select 5 random incorrect options
  const incorrectCountries = countries
    .filter(country => country.capital && country.capital[0] !== correctAnswer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  // Combine correct and incorrect options and shuffle
  const options = [...incorrectCountries.map(c => c.capital[0]), correctAnswer]
    .sort(() => 0.5 - Math.random());

  displayOptions(options);
}

// displays the capital options
function displayOptions(options) {
  optionsContainer.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'col');
    button.textContent = option;
    button.addEventListener('click', () => handleOptionClick(option, button));
    optionsContainer.appendChild(button);
  });
}