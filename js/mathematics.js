let calculations = [];
let score = 0;
let gameRunning = false;
let animationId;
let lastTime = 0;

const createCalculation = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const x = Math.random() * (gameScreen.offsetWidth - 100);
  const calculation = {
    id: Date.now(),
    num1,
    num2,
    x,
    y: 0,
    element: document.createElement("div"),
    missed: false,
  };
  calculation.element.className = "calculation";
  calculation.element.textContent = `${num1} × ${num2}`;
  calculation.element.style.left = `${x}px`;
  calculation.element.style.top = "0px";
  gameScreen.appendChild(calculation.element);
  calculations.push(calculation);
};

const updateGame = (timestamp) => {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  if (deltaTime >= 30) {
    calculations.forEach((calculation, index) => {
      calculation.y += 0.5;
      calculation.element.style.top = `${calculation.y}px`;
      if (calculation.y > gameScreen.offsetHeight - 80) {
        if (!calculation.missed) {
          calculation.missed = true;
          score -= 1;
          document.getElementById("score").textContent = `Pisteet: ${score}`;
        }
        calculation.element.remove();
        calculations.splice(index, 1);
      }
    });
    lastTime = timestamp;
  }
  if (gameRunning) {
    animationId = requestAnimationFrame(updateGame);
  }
};

const checkAnswer = (answer) => {
  const correctCalculation = calculations.find(
    (c) => c.num1 * c.num2 === answer,
  );
  if (correctCalculation) {
    score += 1;
    document.getElementById("score").textContent = `Pisteet: ${score}`;
    correctCalculation.element.remove();
    calculations = calculations.filter((c) => c !== correctCalculation);
    return true;
  }
  return false;
};

const startGame = () => {
  calculations.forEach((c) => c.element.remove());
  calculations = [];
  score = 0;
  gameRunning = true;
  document.getElementById("score").textContent = "Pisteet: 0";

  const startScreen = document.getElementById("start-screen");
  if (startScreen) startScreen.remove();

  const answerForm = document.createElement("form");
  answerForm.id = "answer-form";
  answerForm.innerHTML = `
        <input type="number" id="answer-input" placeholder="Vastaus" autofocus>
        <button type="submit">Vastaa</button>
    `;
  answerForm.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("answer-input");
    const answer = parseInt(input.value);
    if (checkAnswer(answer)) {
      input.value = "";
    }
    input.focus();
  };
  gameScreen.appendChild(answerForm);

  lastTime = 0;
  animationId = requestAnimationFrame(updateGame);

  const calculationInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(calculationInterval);
      return;
    }
    if (calculations.length < 4) {
      createCalculation();
    }
  }, 3000);
};

const gameScreen = document.getElementById("game-screen");
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#start-screen button");
  startButton.addEventListener("click", startGame);
});
