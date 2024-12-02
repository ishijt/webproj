const instruments = [
  { id: 1, name: 'Piano', file: 'piano.mp3', image: 'piano.jpg' },
  { id: 2, name: 'Guitar', file: 'guitar.mp3', image: 'guitar.jpg' },
  { id: 3, name: 'Drums', file: 'drums.mp3', image: 'drums.jpg' },
  { id: 4, name: 'Violin', file: 'violin.mp3', image: 'violin.jpg' },
  { id: 5, name: 'Trumpet', file: 'trumpet.mp3', image: 'trumpet.jpg' },
  { id: 6, name: 'Flute', file: 'flute.mp3', image: 'flute.jpg' },
  { id: 7, name: 'Saxophone', file: 'saxophone.mp3', image: 'saxophone.jpg' },
  { id: 8, name: 'Cello', file: 'cello.mp3', image: 'cello.jpg' },
  { id: 9, name: 'Harp', file: 'harp.mp3', image: 'harp.jpg' },
  { id: 10, name: 'Banjo', file: 'banjo.mp3', image: 'banjo.jpg' },
  { id: 11, name: 'Bass', file: 'bass.mp3', image: 'bass.jpg'},
  { id: 12, name: 'Harmonica', file: 'harmonica.mp3', image: 'harmonica.jpg'},
  { id: 13, name: 'Ukulele', file: 'ukulele.mp3', image: 'ukulele.jpg'},
]

const triviaQuestions = [
  { question: "The piano is considered a percussion instrument.", answer: true },
  { question: "The guitar usually has six strings.", answer: true },
  { question: "A violin is larger than a viola.", answer: false },
  { question: "The trumpet is a woodwind instrument.", answer: false },
  { question: "Drums are pitched instruments.", answer: false },
  { question: "Beethoven was deaf.", answer: true },
  { question: "The 'Happy Birthday' song is copyrighted.", answer: false },
  { question: "Beethoven composed 'Fur Elise.'", answer: true },
  { question: "Rock music is a well known music genre.", answer: true},
  { question: "Mozart was born in Austria.", answer: true},
  { question: "A kazoo is a type of wind instrument.", answer: true},
  { question: "The violin usually has five strings.", answer: false},
  { question: "Jazz music originated in Europe.", answer: false},
  { question: "Blues music often focuses on themes of happiness and celebration.", answer: false},
  { question: "Folk music is often about telling stories.", answer: true},
  { question: "One of the most popular bands of all time is called 'The Beetles'", answer: false},
]

class MusicGame {
  constructor() {
    this.currentStep = 0
    this.score = 0
    this.gameTime = 0
    this.gameInterval = null
    this.currentMode = 'sound'
    this.usedTriviaQuestions = new Set()
    this.displayBestScore()
  }

  startGame = () => {
    this.currentStep = 0
    this.score = 0
    this.gameTime = 0

    this.usedTriviaQuestions.clear()
    this.gameInterval = setInterval(() => this.updateGameTime(), 1000)

    document.getElementById('view-scores').classList.add('hidden')

    this.availableClips = shuffleArray(instruments).slice(0, 10)

    this.displayBestScore()

    this.nextStep()
  }

  stopGame = () => {
    clearInterval(this.gameInterval)
    
    document.getElementById('m-score').textContent = `Score: ${this.score}`

    alert(`Game over! Your final score is ${this.score} out of ${this.currentStep}.`)

    const feedbackElement = document.getElementById('feedback')
    feedbackElement.textContent = ''

    document.getElementById('m-start-screen').classList.remove('d-none')
    document.getElementById('music-play').classList.add('d-none')
    document.getElementById('view-scores').classList.remove('hidden')

    this.displayBestScore()
    this.saveScore(this.score)
  }

  saveScore(score) {
    const bestScore = localStorage.getItem('musicGameScore')
    if (!bestScore || score > bestScore) {
      localStorage.setItem('musicGameScore', score)
    }
  }

  displayBestScore = () => {
    const bestScore = localStorage.getItem('musicGameScore')
    if (bestScore) {
      document.getElementById('best-score').textContent = `Best Score: ${bestScore}`
    }
  }

  addViewScoresText = () => {
    const viewScoresElement = document.getElementById('view-scores')
    const bestScore = localStorage.getItem('musicGameScore')

    if (bestScore) {
      viewScoresElement.style.display = 'block'
      viewScoresElement.textContent = 'View Scores'

      if (!viewScoresElement.hasAttribute('data-listener')) {
        viewScoresElement.addEventListener('click', () => {
          window.location.href = '../pages/scores.html'
        })
        viewScoresElement.setAttribute('data-listener', 'true')
      }
    }
  }

  handleAnswer = (answer) => {
    console.log("Answer received:", answer)
    let isCorrect

    if (this.currentMode === 'trivia') {
      const currentQuestion = triviaQuestions[this.currentTriviaIndex]
      isCorrect = answer === currentQuestion.answer
    } else {
      const currentClip = this.availableClips[this.currentStep]
      isCorrect = answer.trim().toLowerCase() === currentClip.name.toLowerCase()
    }

    const feedbackElement = document.getElementById('feedback')
    feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!'
    feedbackElement.className = isCorrect ? 'text-success' : 'text-danger'

    if (isCorrect) this.score++
    this.currentStep++

    if (this.currentStep <= 10) {
      setTimeout(() => {
        this.nextStep()
       }, 2000)
    } else {
      this.stopGame()
    }
  }

  nextStep = () => {
    const feedbackReset = document.getElementById('feedback')
    feedbackReset.textContent = ''
    feedbackReset.className = ''

    const gameTypes = ['sound', 'image', 'trivia'].filter(mode => {
      if (mode === 'sound' && this.currentStep < this.availableClips.length) return true
      if (mode === 'image' && this.currentStep < this.availableClips.length) return true
      if (mode === 'trivia' && this.usedTriviaQuestions.size < triviaQuestions.length) return true
      return false
    })

    // Backup game stopper (if no questions left for some reason, stop game)
    if (gameTypes.length === 0) {
      return this.stopGame()
    }

    this.currentMode = gameTypes[Math.floor(Math.random() * gameTypes.length)]
    this.updateGame()
  }

  updateGameTime = () => {
    this.gameTime++
    const mins = Math.floor(this.gameTime / 60)
    const secs = this.gameTime % 60
    document.getElementById('m-time').textContent = `Time: ${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  updateGame = () => {
    const feedbackElement = document.getElementById('feedback')
    feedbackElement.textContent = ''
    feedbackElement.className = ''

    document.getElementById('m-time').textContent = `Time: 0:${this.gameTime}`
    document.getElementById('m-score').textContent = `Score: ${this.score}`

    const soundClipElement = document.getElementById('sound-clip')
    const answerButtons = document.getElementById('answer-buttons')
    const inputElement = document.getElementById('answer-input')
    const imageElement = document.getElementById('instrument-image')
    const choiceButtons = document.getElementById('choice-buttons')

    // Clearing elements
    answerButtons.innerHTML = ''
    choiceButtons.innerHTML = ''
    inputElement.value = ''
    inputElement.classList.add('d-none')
    imageElement.classList.add('d-none')
    soundClipElement.classList.add('d-none')

    if (this.currentMode === 'sound') {
      this.runSoundGame(this.availableClips[this.currentStep])
    } else if (this.currentMode === 'image') {
      this.runImageGame(this.availableClips[this.currentStep])
    } else {
      this.runTriviaGame()
    }
  }

  runSoundGame = (currentClip) => {
    const soundClipElement = document.getElementById('sound-clip')
    const answerButtons = document.getElementById('answer-buttons')
    
    soundClipElement.src = `../music_files/sounds/${currentClip.file}`
    soundClipElement.volume = 0.25
    soundClipElement.classList.remove('d-none')

    // Generate 4 answer buttons
    const answerOptions = new Set([currentClip])

    while (answerOptions.size < 4) {
      const randomClip = instruments[Math.floor(Math.random() * instruments.length)]
      answerOptions.add(randomClip)
    }

    // Shuffle and display the answer options
    const shuffledOptions = shuffleArray([...answerOptions])
    shuffledOptions.forEach((clip) => {
      const button = document.createElement('button')
      button.className = 'btn btn-secondary'
      button.textContent = clip.name
      button.addEventListener('click', () => this.handleAnswer(clip.name))
      answerButtons.appendChild(button)
    })
  }

  runImageGame = (currentClip) => {
    const imageElement = document.getElementById('instrument-image')
    const inputElement = document.getElementById('answer-input')

    imageElement.src = `../music_files/images/${currentClip.image}`
    imageElement.alt = currentClip.name
    imageElement.classList.remove('d-none')

    // Input box
    inputElement.classList.remove('d-none')
    inputElement.focus()
  }

  runTriviaGame = () => {
    const availableQuestions = triviaQuestions.filter((_, index) => {
      !this.usedTriviaQuestions.has(index)
    })

    // Uses another game mode if questions from one are out
    if (availableQuestions.length === 0) {
      this.nextStep()
      return
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const currentQuestion = availableQuestions[randomIndex]

    this.currentTriviaIndex = triviaQuestions.indexOf(currentQuestion)

    this.usedTriviaQuestions.add(this.currentTriviaIndex)

    const answerButtons = document.getElementById('choice-buttons')
    answerButtons.innerHTML = ''

    const questionElement = document.createElement('div')
    questionElement.textContent = currentQuestion.question
    questionElement.className = 'mb-3'
    answerButtons.appendChild(questionElement)

    const triviaChoices = [
      { text: 'True', value: true },
      { text: 'False', value: false }
    ]

    triviaChoices.forEach((option) => {
      const button = document.createElement('button')
      button.className = 'btn btn-secondary'
      button.textContent = option.text

      button.addEventListener('click', () => {
        this.handleAnswer(option.value)
      })
      answerButtons.appendChild(button)
  })
}}

// Helper to shuffle arrays
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new MusicGame()

  document.getElementById('m-start-game').addEventListener('click', () => {
    document.getElementById('m-start-screen').classList.add('d-none')
    document.getElementById('music-play').classList.remove('d-none')
    game.startGame()
  })

  document.getElementById('answer-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      game.handleAnswer(event.target.value)
      event.target.value = ''
    }
  })
})