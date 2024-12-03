let calculations = [];
let score = 0;
let gameRunning = false;
let animationId;
let lastTime = 0;
let totalCalculations = 0;
const CALCULATION_LIMIT = 5;

const createCalculation = () => {
  if (totalCalculations >= CALCULATION_LIMIT) {
    endGame();
    return;
  }

  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const x = Math.random() * (gameScreen.offsetWidth - 100);

  totalCalculations++;

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

// Enter to refresh
const handleModalKeydown = (event) => {
  if (event.key === "Enter") {
    location.reload();
  }
};

const showGameOverModal = () => {
  const modal = document.getElementById("game-over-modal");
  const finalScore = modal.querySelector(".modal-score-value");
  finalScore.textContent = score;
  modal.style.display = "flex";

  // Enter to refresh
  document.addEventListener("keydown", handleModalKeydown);
};

const endGame = () => {
  gameRunning = false;
  cancelAnimationFrame(animationId);

  const answerForm = document.getElementById("answer-form");
  if (answerForm) answerForm.remove();

  calculations.forEach((c) => c.element.remove());
  calculations = [];

  showGameOverModal();
};

const updateGame = (timestamp) => {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;

  if (deltaTime >= 20) {
    calculations.forEach((calculation, index) => {
      calculation.y += 0.9;
      calculation.element.style.top = `${calculation.y}px`;
      if (calculation.y > gameScreen.offsetHeight - 135) {
        if (!calculation.missed) {
          calculation.missed = true;
          score -= 1;
          document.getElementById("score").textContent = `Score: ${score}`;
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
    document.getElementById("score").textContent = `Score: ${score}`;
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
  totalCalculations = 0;
  gameRunning = true;

  document.getElementById("score").textContent = "Score: 0";

  const startScreen = document.getElementById("start-screen");
  if (startScreen) startScreen.remove();

  const modal = document.getElementById("game-over-modal");
  if (modal) modal.style.display = "none";

  const answerForm = document.createElement("form");
  answerForm.id = "answer-form";
  answerForm.innerHTML = `
    <input type="number" id="answer-input" autofocus>
    <button type="submit" id="answer-button">Answer</button>
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

  // Enter to refresh
  document.removeEventListener("keydown", handleModalKeydown);
};

const gameScreen = document.getElementById("game-screen");

document.addEventListener("DOMContentLoaded", () => {
  const modalHTML = `
    <div id="game-over-modal" class="modal">
      <div class="modal-content">
        <h2 class="modal-title">Game Over!</h2>
        <p class="modal-score">Final Score: <span class="modal-score-value">0</span>/20</p>
        <button onclick="location.reload()" class="modal-button">Return</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const startButton = document.querySelector("#start-screen button");
  startButton.addEventListener("click", startGame);
});
