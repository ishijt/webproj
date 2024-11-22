const questions = [
    {image: "../img/english/skiing.jpg", word: "skiing"},
    {image: "../img/english/cooking.jpg", word: "cooking"},
    {image: "../img/english/laptop.jpg", word: "laptop"},
    {image: "../img/english/airplane.jpg", word: "airplane"},
    {image: "../img/english/elephant.jpg", word: "elephant"},
    {image: "../img/english/apple.jpg", word: "apple"},
    {image: "../img/english/fridge.jpg", word: "fridge"},
    {image: "../img/english/speaker.jpg", word: "speaker"},
    {image: "../img/english/spruce.jpg", word: "spruce"},
    {image: "../img/english/running.jpg", word: "running"}
]

let currentQuestion = 0
let score = 0

function shuffleWord(word) {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
        let j;
        j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
}

function loadQuestions() {
    const question = questions[currentQuestion]
    document.getElementById("submit").disabled = false
    document.getElementById("image").src = question.image
    document.getElementById("scrambledWord").innerText = shuffleWord(question.word)
    document.getElementById("answer").value = ""
    document.getElementById("feedback").innerText = ""
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase()
    const correctAnswer = questions[currentQuestion].word

    document.getElementById("submit").disabled = true

    const feedback = document.getElementById("feedback")

    if (userAnswer === correctAnswer) {
        feedback.innerText = "Correct!"
        score++
    } else {
        feedback.innerText = `Wrong! The correct answer is "${correctAnswer}".`
        score = Math.max(0, score - 1)
    }

    document.getElementById("score").innerText = score

    currentQuestion++
    if(currentQuestion < questions.length) {
        setTimeout(loadQuestions, 2000)
    } else {
        feedback.innerText += " Game over!"
        document.getElementById("submit").disabled = true
        sessionStorage.setItem('score', score.toString())
    }
}

document.getElementById("submit").addEventListener("click", checkAnswer)
loadQuestions()
