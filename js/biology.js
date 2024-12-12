let startButton = document.getElementById('startGameButton')
let game = document.getElementById('game')
let welcome = document.getElementById('welcomeCont')
let numberText = document.getElementById('numberOfPictures')

startButton.addEventListener('click', startGame)

//start game -button function
function startGame() {
    game.style.display = 'block'
    welcome.style.display = 'none'

    scoreValue = 0
    numberOfPictures = 1

    numberText.textContent = `Photo ${numberOfPictures}/10`
    scores.textContent = `Scores: ${scoreValue}`

    localStorage.setItem('biologyGameScores', scoreValue)
}

const animalNames = ['dog', 'cat', 'lion', 'elephant', 'horse', 'wolf', 'fox', 'giraffe', 'kangaroo', 'dolphin', 'koala', 'alligator', 'parrot', 'flamingo', 'swan',
    'otter', 'walrus', 'shark', 'jellyfish', 'snake', 'hamster', 'squirrel', 'hedgehog', 'raccoon', 'sloth', 'pig', 'donkey','pigeon', 'cow']

let animalName = ''
let usedAnimals = []

function getRandomAnimal() {
    let randomAnimal
    do {
        randomAnimal = Math.floor(Math.random() * animalNames.length)
    } while (usedAnimals.includes(animalNames[randomAnimal])) 

    usedAnimals.push(animalNames[randomAnimal])
    return animalNames[randomAnimal]
}

function getRandomAnimalPicture() {
    animalName = getRandomAnimal()
    document.getElementById('animalImage').src = `../img/biology/${animalName}.jpg`
}

window.onload = () => {
    getRandomAnimalPicture()
}


function restartGame() {
    getRandomAnimalPicture()

    game.style.display = "block"

    scoreValue = 0
    numberOfPictures = 1

    numberText.textContent = `Photo ${numberOfPictures}/10`
    scores.textContent = `Scores: ${scoreValue}`

    let afterGame = document.getElementById('afterGame')
    let nextButton = document.getElementById('nextPicture')
    let guessInput = document.getElementById('guessInput')

    nextButton.style.display = "none"
    correctWrong.style.display = "none"
    toDoNext.style.display = "none"
    guessInput.style.border = "none"
    afterGame.style.display = "none"

    localStorage.setItem('biologyGameScores', scoreValue)
}

//check answer button
let checkAnswerButton = document.getElementById('checkAnswerButton')
checkAnswerButton.addEventListener('click', checkAnswer)
let scoreValue = 0
let numberOfPictures = 1

function checkAnswer() {
    

    let scores = document.getElementById('scores')

    let answer = document.getElementById('guessInput').value
    let userAnswer = answer.toLowerCase()
    let correctAnswer = animalName.toLowerCase()
    let correctWrong = document.getElementById('correctWrong')
    let toDoNext = document.getElementById('toDoNext')
    let nextButton = document.getElementById('nextPicture')

    if (answer.trim() === "") {
        document.getElementById('guessInput').placeholder = "You have to answer something!"
        guessInput.style.border = "2px solid red"
        return
    }

    else if (userAnswer === correctAnswer) {
        guessInput.style.border = "2px solid green"
        correctWrong.style.display = "block"
        toDoNext.style.display = "block"
        correctWrong.style.color = "green"
        correctWrong.textContent = "Correct answer!"
        toDoNext.textContent = "Click 'Next picture' to continue."
        nextButton.style.display = "block"
        scoreValue += 1
        scores.textContent = `Scores: ${scoreValue}`

        localStorage.setItem('biologyGameScores', scoreValue)


        if (numberOfPictures === 10) {
            let afterGame = document.getElementById('afterGame')
            let game = document.getElementById('game')
            let totalScore = document.getElementById('totalScore')
                

            afterGame.style.display = "flex"
            game.style.display = "none"

            totalScore.textContent = `Your total score is ${scoreValue}.`
                
            document.getElementById('restartButton').addEventListener('click', restartGame)

            document.getElementById('viewScores').addEventListener('click', () => {
                window.location.href = "./scores.html"})  

                localStorage.setItem('biologyGameScores', scoreValue)
            }



        
    } else {
        guessInput.style.border = "2px solid red"
        correctWrong.style.display = "block"
        toDoNext.style.display = "block"
        correctWrong.style.color = "red"
        correctWrong.textContent = `Wrong answer! Correct answer is ${correctAnswer}.`
        toDoNext.textContent = `Click 'Next picture' to continue`
        nextButton.style.display = "block"

        if (numberOfPictures === 10) {
            let afterGame = document.getElementById('afterGame')
            let game = document.getElementById('game')
            let totalScore = document.getElementById('totalScore')
                

            afterGame.style.display = "flex"
            game.style.display = "none"

            totalScore.textContent = `Your total score is ${scoreValue}.`
                
            document.getElementById('restartButton').addEventListener('click', restartGame)

            document.getElementById('viewScores').addEventListener('click', () => {
                window.location.href = "./scores.html"})  
        }


    }

    document.getElementById('guessInput').value = ''
}



//next picture

let nextButton = document.getElementById('nextPicture')
nextButton.addEventListener('click', nextPicture)



function nextPicture() {
    let nextButton = document.getElementById('nextPicture')
    
    getRandomAnimalPicture()


    nextButton.style.display = "none"
    correctWrong.style.display = "none"
    toDoNext.style.display = "none"
    guessInput.style.border = "none"

    numberOfPictures += 1
    numberText.textContent = `Photo ${numberOfPictures}/10`

}






