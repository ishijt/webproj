const questions = [
    {image: "../img/english/skiing.jpg", word: "skiing"},
    {image: "../img/english/cooking.jpg", word: "cooking"},
    {image: "../img/english/laptop.jpg", word: "laptop"}
]

let currentCuestion = 0
let score = 0

function shuffleWord(word) {
    const letters = word.split("")
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [letters[i], letters[j]] = [letters[j], letters[i]]
    }
    return letters.join("")
}

function loadQuestions() {
    const question = questions[currentCuestion]
    document.getElementById("image").src = question.image
    document.getElementById("scrambledWord").innerText = shuffleWord(question.word)
    document.getElementById("answer").value = ""
    document.getElementById("feedback").innerText = ""
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase()
    const correctAnswer = questions[currentCuestion].word

    const feedback = document.getElementById("feedback")

    if (userAnswer === correctAnswer) {
        feedback.innerText = "Correct!"
        score++
    } else {
        feedback.innerText = `Wrong! The correct answer is "${correctAnswer}".`
        score = Math,max(0, score - 1)
    }

    document.getElementById("score").innerText = score

    currentCuestion++
    if(currentCuestion < questions.length) {
        setTimeout(loadQuestions, 2000)
    } else {
        feedback.innerText += " Game over!"
        document.getElementById("submit").disabled = true
    }
}

document.getElementById("submit").addEventListener("click", checkAnswer)
loadQuestions()
