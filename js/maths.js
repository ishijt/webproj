// Muuttujat
let problems = [];
let score = 0;
let gameRunning = false;

const createProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  // Arvo x-koordinaatti ruudulla (reunoille marginaalia)
  const x = Math.random() * (gameScreen.offsetWidth - 100);

  // Luo laskuobjekti
  const problem = {
    id: Date.now(),
    num1: num1,
    num2: num2,
    x: x,
    y: 0,
    element: document.createElement("div"),
  };

  // Aseta laskuelementin ominaisuudet
  problem.element.className = "problem";
  problem.element.textContent = `${num1} × ${num2}`;
  problem.element.style.left = `${x}px`;
  problem.element.style.top = "0px";

  // Lisää lasku näytölle ja taulukkoon
  gameScreen.appendChild(problem.element);
  problems.push(problem);
};

const checkAnswer = (answer) => {
  const correctProblem = problems.find((p) => p.num1 * p.num2 === answer);

  if (correctProblem) {
    score += 10;
    document.getElementById("score").textContent = `Score: ${score}`;
    correctProblem.element.remove();
    problems = problems.filter((p) => p !== correctProblem);
    return true;
  }
  return false;
};

const startGame = () => {
  problems.forEach((p) => p.element.remove());
  problems = [];
  score = 0;
  gameRunning = true;
  document.getElementById("score").textContent = "Score: 0";

  const startScreen = document.getElementById("start-screen");
  if (startScreen) startScreen.remove();

  // Vastauslomake
  const answerForm = document.createElement("form");
  answerForm.id = "answer-form";
  answerForm.innerHTML = `
        <input type="number" id="answer-input" placeholder="???" autofocus>
        <button type="submit">Vastaa</button>
    `;

  // Vastauksen lähettäminen
  answerForm.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("answer-input");
    const answer = parseInt(input.value);
    if (checkAnswer(answer)) {
      input.value = ""; // Tyhjennä kenttä oikean vastauksen jälkeen
    }
    input.focus();
  };

  // Lisää lomake pelialueelle
  gameScreen.appendChild(answerForm);

  // Luo ensimmäinen lasku
  createProblem();
};

const startButton = document.querySelector("#start-screen button");
startButton.addEventListener("click", startGame);

// Hae pelialue HTML:stä
const gameScreen = document.getElementById("game-screen");
