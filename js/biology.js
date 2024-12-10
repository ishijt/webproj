///start game button///
let startButton = document.getElementById('startGameButton')
let game = document.getElementById('game')
let welcome = document.getElementById('welcomeCont')

startButton.addEventListener('click', startGame)

function startGame() {
    game.style.display = 'block'
    welcome.style.display = 'none'
}


///API
const animalNames = [
    'dog', 'cat', 'bird', 'lion', 'tiger', 'elephant', 'horse', 'fish', 'rabbit', 'deer',
    'bear', 'wolf', 'fox', 'giraffe', 'zebra', 'kangaroo', 'penguin', 'dolphin', 'whale',
    'monkey', 'panda', 'koala', 'leopard', 'cheetah', 'crocodile', 'alligator', 'hippopotamus',
    'rhinoceros', 'bat', 'owl', 'eagle', 'hawk', 'parrot', 'flamingo', 'peacock', 'swan',
    'otter', 'seal', 'walrus', 'shark', 'octopus', 'jellyfish', 'crab', 'lobster', 'turtle',
    'frog', 'snake', 'lizard', 'hamster', 'mouse', 'rat', 'squirrel', 'hedgehog', 'raccoon',
    'badger', 'beaver', 'weasel', 'ferret', 'meerkat', 'lemur', 'sloth', 'armadillo',
    'buffalo', 'camel', 'llama', 'goat', 'sheep', 'cow', 'pig', 'donkey', 'chicken', 'duck',
    'goose', 'turkey', 'pigeon', 'finch', 'budgerigar', 'macaw', 'toucan',
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



// Lataa ensimmäinen kuva, kun sivu avataan
window.onload = () => {
    animalName = getRandomAnimal()
    fetchAnimalImage()
}


//Nappi oikein
checkAnswerButton.addEventListener('click', checkAnswer)
let scoreValue = 0
let numberOfPictures = 1

function checkAnswer() {
    

    let scores = document.getElementById('scores')
    let checkAnswerButton = document.getElementById('checkAnswerButton')
    let answer = document.getElementById('guessInput').value
    let inputArea = document.getElementById('guessInput')
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
        

        if (numberOfPictures === 10) {
            alert("Gamae is over!")
            game.style.display = "none"
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
            alert("Game is over!")
        }
    }

    document.getElementById('guessInput').value = ''
}




//next picture

let nextButton = document.getElementById('nextPicture')
nextButton.addEventListener('click', nextPicture)



function nextPicture() {
    let nextButton = document.getElementById('nextPicture')
    let numberText = document.getElementById('numberOfPictures')

    animalName = getRandomAnimal()
    fetchAnimalImage()


    nextButton.style.display = "none"
    correctWrong.style.display = "none"
    toDoNext.style.display = "none"
    guessInput.style.border = "none"

    numberOfPictures += 1
    numberText.textContent = `Photo ${numberOfPictures}/10`

}




