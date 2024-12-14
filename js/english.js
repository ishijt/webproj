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
    {image: "../img/english/running.jpg", word: "running"},
    {image: "../img/english/bicycle.jpg", word: "bicycle"},
    {image: "../img/english/bridge.jpg", word: "bridge"},
    {image: "../img/english/candle.jpg", word: "candle"},
    {image: "../img/english/clouds.jpg", word: "clouds"},
    {image: "../img/english/dishwasher.jpg", word: "dishwasher"},
    {image: "../img/english/football.jpg", word: "football"},
    {image: "../img/english/igloo.jpg", word: "igloo"},
    {image: "../img/english/rainbow.jpg", word: "rainbow"},
    {image: "../img/english/reindeer.jpg", word: "reindeer"},
    {image: "../img/english/skating.jpg", word: "skating"}
]

let shuffledQuestions = []
let currentQuestion = 0
let score = 0

function shuffleQuestions() {
    const shuffled = questions.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 10); 
}

function shuffleWord(word) { //Chromen DevToolin (F12) tekoäly korjasi rikkinäisen funktion
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
        let j;
        j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
}

function addRestartButton() {
    const restartButton = document.createElement("button")
    restartButton.classList.add('btn')
    restartButton.setAttribute("id", "restart")
    restartButton.innerText = "Restart"
    restartButton.addEventListener("click", restart)
    
    const buttonsDiv = document.getElementById("buttons")
    buttonsDiv.appendChild(restartButton)

}

function removeRestartButton() {
    const restartButton = document.getElementById("restart")
    if (restartButton) {
        restartButton.remove()
    }
}

function restart() {
    currentQuestion = 0
    score = 0
    document.getElementById("score").innerText = `Score: ${score}`

    shuffledQuestions = shuffleQuestions()

    document.getElementById("answer").value = ""
    document.getElementById("feedback").innerText = ""
    document.getElementById("submit").disabled = false
    document.getElementById("answer").disabled = false

    removeRestartButton()

    loadQuestions()
}

function loadQuestions() {
    const question = shuffledQuestions[currentQuestion]
    document.getElementById("submit").disabled = false
    document.getElementById("image").src = question.image // ChatGPT kysytty apua kuvan lisäämiseen
    document.getElementById("scrambledWord").innerText = shuffleWord(question.word)
    document.getElementById("answer").value = ""
    document.getElementById("answer").disabled = false
    document.getElementById("feedback").innerText = ""
    document.getElementById("answer").focus()
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase()
    const correctAnswer = shuffledQuestions[currentQuestion].word

    document.getElementById("submit").disabled = true
    document.getElementById("answer").disabled = true

    const feedback = document.getElementById("feedback")

    if (userAnswer === correctAnswer) {
        feedback.innerText = "Correct!"
        score++
    } else {
        feedback.innerText = `Wrong! The correct answer is "${correctAnswer}".`
        score = Math.max(0, score - 1) //Estetään pisteiden meneminen negatiiviseksi
    }

    document.getElementById("score").innerText = `Score: ${score}`

    currentQuestion++
    if(currentQuestion < shuffledQuestions.length) {
        setTimeout(loadQuestions, 2500)
        
    } else {
        feedback.innerText += ` Game over. Your final score is ${score}`
        document.getElementById("submit").disabled = true
        document.getElementById("answer").disabled = true
        addRestartButton()
        localStorage.setItem('englishGameScore', score.toString())
    }
}

shuffledQuestions = shuffleQuestions()

document.getElementById("submit").addEventListener("click", () => {
    checkAnswer()
})

document.getElementById("answer").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        checkAnswer()
    }
})

loadQuestions()