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

const animalFacts = [
    { animal: "dog", fact: "A dog's nose print is as unique as a human fingerprint." },
    { animal: "cat", fact: "Cats cannot taste sweetness because they lack the sweet taste receptor." },
    { animal: "lion", fact: "A lion's roar can be heard up to 5 miles away." },
    { animal: "elephant", fact: "Elephants are the only mammals that can't jump." },
    { animal: "horse", fact: "Horses cannot vomit or burp." },
    { animal: "wolf", fact: "Wolves can smell their prey from over a mile away." },
    { animal: "fox", fact: "Foxes use the Earth's magnetic field to hunt." },
    { animal: "giraffe", fact: "A giraffe's tongue can be up to 21 inches long." },
    { animal: "kangaroo", fact: "Kangaroos can leap over 30 feet in a single bound." },
    { animal: "dolphin", fact: "Dolphins give each other names, which are unique whistles." },
    { animal: "koala", fact: "Koalas sleep up to 18-22 hours a day." },
    { animal: "alligator", fact: "Alligators can live over 35 years in the wild." },
    { animal: "parrot", fact: "Parrots can learn to mimic human speech." },
    { animal: "flamingo", fact: "Flamingos get their pink color from the food they eat, like shrimp." },
    { animal: "swan", fact: "Swans form lifelong pair bonds." },
    { animal: "otter", fact: "Otters hold hands while sleeping to avoid drifting apart." },
    { animal: "walrus", fact: "Walruses can weigh up to 3,300 pounds." },
    { animal: "shark", fact: "Sharks never stop growing." },
    { animal: "jellyfish", fact: "Jellyfish have been around for over 500 million years." },
    { animal: "snake", fact: "Snakes can sleep with their eyes open because they have no eyelids." },
    { animal: "hamster", fact: "Hamsters can store food in their cheek pouches." },
    { animal: "squirrel", fact: "Squirrels can find their buried nuts by smell." },
    { animal: "hedgehog", fact: "Hedgehogs can roll into a ball to protect themselves." },
    { animal: "raccoon", fact: "Raccoons can open locks and solve complex problems." },
    { animal: "sloth", fact: "Sloths move so slowly that algae can grow on their fur." },
    { animal: "pig", fact: "Pigs are very intelligent and can learn complex tasks." },
    { animal: "donkey", fact: "Donkeys can remember places and other donkeys for up to 25 years." },
    { animal: "pigeon", fact: "Pigeons can recognize their own reflection in a mirror." },
    { animal: "cow", fact: "Cows can form close friendships and get stressed when separated." }
  ]

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
    let animalFact = document.getElementById('animalFact')

    if (answer.trim() === "") {
        document.getElementById('guessInput').placeholder = "You have to answer something!"
        guessInput.style.border = "2px solid red"
        return
    }

    else if (userAnswer === correctAnswer) {
        guessInput.style.border = "2px solid green"
        correctWrong.style.display = "block"
        toDoNext.style.display = "block"
        animalFact.style.display = "block"
        correctWrong.style.color = "green"
        correctWrong.textContent = "Correct answer!"
        toDoNext.textContent = "Click 'Next picture' to continue."
        nextButton.style.display = "block"
        scoreValue += 1
        scores.textContent = `Scores: ${scoreValue}`

        let fact = animalFacts.find(f => f.animal.toLowerCase() === correctAnswer).fact  
        animalFact.textContent = `${fact}`

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
    let correctWrong = document.getElementById('correctWrong')
    let toDoNext = document.getElementById('toDoNext')
    let animalFact = document.getElementById('animalFact')
    
    getRandomAnimalPicture()


    nextButton.style.display = "none"
    correctWrong.style.display = "none"
    toDoNext.style.display = "none"
    guessInput.style.border = "none"
    animalFact.style.display = "none"

    numberOfPictures += 1
    numberText.textContent = `Photo ${numberOfPictures}/10`

}






