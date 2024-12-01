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
    'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Koala', 'Panda', 
    'Bear', 'Wolf', 'Fox', 'Rabbit', 'Squirrel', 'Mouse', 'Rat', 'Leopard', 'Jaguar', 
    'Gorilla', 'Chimpanzee', 'Orangutan', 'Rhinoceros', 'Hippopotamus', 'Alligator', 
    'Crocodile', 'Penguin', 'Albatross', 'Eagle', 'Hawk', 'Owl', 'Parrot', 'Flamingo', 
    'Peacock', 'Ostrich', 'Pigeon', 'Crow', 'Magpie', 'Seagull', 'Camel', 'Llama', 
    'Alpaca', 'Goat', 'Sheep', 'Cow', 'Pig', 'Chicken', 'Rooster', 'Duck', 'Goose', 
    'Swan', 'Sparrow', 'Starling', 'Swallow', 'Cuckoo', 'Stork', 'Heron', 'Pelican', 
    'Crane', 'Ibis', 'Toucan', 'Woodpecker', 'Kingfisher', 'Hummingbird', 'Bat', 
    'Dolphin', 'Whale', 'Shark', 'Octopus', 'Squid', 'Jellyfish', 'Starfish', 'Sea Urchin', 
    'Crab', 'Lobster', 'Shrimp', 'Clam', 'Oyster', 'Snail', 'Slug', 'Frog', 'Toad', 
    'Salamander', 'Newt', 'Lizard', 'Gecko', 'Chameleon', 'Iguana', 'Snake', 'Turtle', 
    'Tortoise', 'Butterfly', 'Moth', 'Bee', 'Wasp', 'Ant', 'Termite', 'Beetle', 'Ladybug', 
    'Dragonfly', 'Grasshopper', 'Cricket', 'Cockroach', 'Spider', 'Scorpion', 'Centipede', 
    'Millipede', 'Earthworm', 'Leech', 'Coral', 'Sea Anemone', 'Sea Cucumber', 'Sea Horse', 
    'Sea Lion', 'Walrus', 'Seal', 'Otter', 'Beaver', 'Platypus', 'Armadillo', 'Sloth', 
    'Anteater', 'Aardvark', 'Hedgehog', 'Porcupine', 'Mole', 'Shrew', 'Weasel', 'Ferret', 
    'Mink', 'Badger', 'Skunk', 'Raccoon', 'Opossum', 'Hamster', 'Gerbil', 'Guinea Pig', 
    'Chinchilla', 'Capybara', 'Nutria', 'Agouti', 'Paca', 'Tapir', 'Okapi', 'Bison', 
    'Buffalo', 'Yak', 'Water Buffalo', 'Gaur', 'Banteng', 'Eland', 'Kudu', 'Nyala', 
    'Sable Antelope', 'Oryx', 'Gemsbok', 'Springbok', 'Gazelle', 'Impala', 'Dik-dik', 
    'Duiker', 'Klipspringer', 'Steenbok', 'Reedbuck', 'Waterbuck', 'Bushbuck', 'Hartebeest', 
    'Wildebeest', 'Topi', 'Tsessebe', 'Bontebok', 'Blesbok', 'Sitatunga', 'Bongo', 
    'Gerenuk', 'Hirola', 'Saiga', 'Chiru', 'Takin', 'Musk Ox', 'Pronghorn', 'Mountain Goat']


const APIkey = 'S6glRYH0Gxv2xoZ1XkEYzV8nErIwcJd1niGGsyaon0g'
const randomAnimal = Math.floor(Math.random() * animalNames.length)
const animalName = animalNames[randomAnimal]
const url = `https://api.unsplash.com/photos/random?query=${animalName}&client_id=${APIkey}`

function fetchAnimalImage() {
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
window.onload = fetchAnimalImage;


//Nappi oikein

let checkAnswerButton = document.getElementById('checkAnswerButton')


checkAnswerButton.addEventListener('click', checkAnswer)

function checkAnswer() {
    let answer = document.getElementById('guessInput').value
    let userAnswer = answer.toLowerCase()
    let correctAnswer = animalName.toLowerCase()
    let textArea = document.getElementById('infoText')
    let nextButton = document.getElementById('nextPicture')

    if (answer.trim() === "") {
        document.getElementById('guessInput').placeholder = "You have to answer something!"
        guessInput.style.border = "2px solid red"
        return
    }

    else if (userAnswer === correctAnswer) {
        guessInput.style.border = "2px solid green"
        textArea.textContent = "Correct answer!"
        nextButton.style.display = "block"
    } else {
        guessInput.style.border = "2px solid red"
        textArea.textContent = `Your answer is wrong, correct answer is ${correctAnswer}.`
        nextButton.style.display = "block"

    }
}




