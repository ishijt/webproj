const API_URL = 'https://restcountries.com/v3.1/all';

// get DOM elements
const countryNameElement = document.getElementById('country-name');
const questionNumberElement = document.getElementById('question-number');
const flagsContainer = document.getElementById('flags-container');
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
  generateQuestion(countries);
}

// fetches all countries data from the REST API
async function fetchCountries() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

// generates a new question
function generateQuestion(countries) {
  if (questionCount >= maxQuestions) {
    showFinalResult();
    return;
  }

  isAnswered = false;
  questionCount++;
  questionNumberElement.textContent=questionCount

  // randomly select a correct country
  const correctCountry = countries[Math.floor(Math.random() * countries.length)];
  correctAnswer = correctCountry.flags.png;
  countryNameElement.textContent = correctCountry.name.common;

  // select 5 random incorrect options
  const incorrectCountries = countries
    .filter(country => country.flags.png !== correctAnswer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  // combine correct and incorrect options and shuffle
  const options = [...incorrectCountries, correctCountry]
    .sort(() => 0.5 - Math.random());

  displayFlags(options);
}

// displays the flags as answer options
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

// handles the click on a flag option
function handleFlagClick(selectedFlag, button) {
  if (isAnswered) {
    resultMessage.textContent = 'You have already answered. Please click "Next Question" to continue.';
    resultMessage.style.color = 'orange';
    return;
  }
  isAnswered = true;

  // check if the selected flag is correct
  if (selectedFlag === correctAnswer) {
    resultMessage.textContent = 'Correct! Click "Next Question" to continue.';
    resultMessage.style.color = 'green';
    correctAnswers++;
  } else {
    resultMessage.textContent = 'Wrong! Click "Next Question" to continue.';
    resultMessage.style.color = 'red';
    button.style.borderColor = 'red';
  }
  
  resultContainer.classList.remove('hidden');

  // disable all flag buttons after an answer is selected
  const allButtons = document.querySelectorAll('.flag-button');
  allButtons.forEach(btn => {
    btn.disabled = true;
  });
}