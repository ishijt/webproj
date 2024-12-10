

let startButton = document.getElementById('startGameButton')
let game = document.getElementById('game')
let welcome = document.getElementById('welcomeCont')
let numberText = document.getElementById('numberOfPictures')

startButton.addEventListener('click', startGame)

function startGame() {
    game.style.display = 'block'
    welcome.style.display = 'none'

    scoreValue = 0
    numberOfPictures = 1

    numberText.textContent = `Photo ${numberOfPictures}/10`
    scores.textContent = `Scores: ${scoreValue}`

    localStorage.setItem('biologyGameScores', scoreValue)
}


///API
const animalNames = [
    'dog', 'cat', 'bird', 'lion', 'tiger', 'elephant', 'horse', 'fish', 'rabbit', 'deer',
    'bear', 'wolf', 'fox', 'giraffe', 'zebra', 'kangaroo', 'penguin', 'dolphin', 'whale',
    'monkey', 'panda', 'koala', 'leopard', 'cheetah', 'crocodile', 'alligator', 'hippopotamus',
    'rhinoceros', 'bat', 'owl', 'eagle', 'hawk', 'parrot', 'flamingo', 'peacock', 'swan',
    'otter', 'seal', 'walrus', 'shark', 'octopus', 'jellyfish', 'crab', 'lobster',
    'frog', 'snake', 'lizard', 'hamster', 'rat', 'squirrel', 'hedgehog', 'raccoon',
    'badger', 'beaver', 'weasel', 'ferret', 'meerkat', 'lemur', 'sloth', 'armadillo', 'camel', 'llama', 'goat', 'sheep', 'cow', 'pig', 'donkey', 'chicken', 'duck',
    'goose', 'pigeon', 'finch', 'budgerigar', 'macaw', 'toucan',
    'woodpecker', 'hummingbird', 'kingfisher', 'cow', 'lynx']


const APIkey = 'S6glRYH0Gxv2xoZ1XkEYzV8nErIwcJd1niGGsyaon0g'
let animalName = ''


function getRandomAnimal() {
    let randomAnimal = Math.floor(Math.random() * animalNames.length)
    return animalNames[randomAnimal]
}

function fetchAnimalImage() {
    const url = `https://api.unsplash.com/photos/random?query=${animalName}&topics=pets&client_id=${APIkey}`
    

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error')
            }
            return response.json()
        })
        .then(data => {
            document.getElementById('animalImage').src = data.urls.regular
            currentAnimalName = animalName
        })
        .catch(error => {
            console.error('Error', error)
        })
}



window.onload = () => {
    animalName = getRandomAnimal()
    fetchAnimalImage()
}


function restartGame() {
    getRandomAnimal()
    fetchAnimalImage()

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

///restart






//next picture

let nextButton = document.getElementById('nextPicture')
nextButton.addEventListener('click', nextPicture)



function nextPicture() {
    let nextButton = document.getElementById('nextPicture')
    

    animalName = getRandomAnimal()
    fetchAnimalImage()


    nextButton.style.display = "none"
    correctWrong.style.display = "none"
    toDoNext.style.display = "none"
    guessInput.style.border = "none"

    numberOfPictures += 1
    numberText.textContent = `Photo ${numberOfPictures}/10`

}






