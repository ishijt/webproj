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

// fetches all countries data from the REST API
async function fetchCountries() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.filter(country => country.capital); // Filter only countries with capitals
}