const API_URL = 'https://restcountries.com/v3.1/all';

async function fetchCountries() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}