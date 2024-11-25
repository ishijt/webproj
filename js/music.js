const instruments = [
  { id: 1, name: 'Piano', file: 'piano.mp3', image: 'piano.jpg' },
  { id: 2, name: 'Guitar', file: 'guitar.mp3', image: 'guitar.jpg' },
  { id: 3, name: 'Drums', file: 'drums.mp3', image: 'drums.jpg' },
  { id: 4, name: 'Violin', file: 'violin.mp3', image: 'violin.jpg' },
  { id: 5, name: 'Trumpet', file: 'trumpet.mp3', image: 'trumpet.jpg' }
]

class MusicGame {
  constructor() {
    this.currentStep = 0
    this.score = 0
    this.gameTime = 0
    this.gameInterval = null
    this.currentMode = 'sound'
    this.maxSteps = 5
    this.defaultVolume = 0.25
  }

  startGame = () => {
    this.currentStep = 0
    this.score = 0
    this.gameTime = 0
    this.gameInterval = setInterval(() => this.updateGameTime(), 1000)

    this.availableClips = shuffleArray(instruments).slice(0, 5)

    this.nextStep()
  }

  stopGame = () => {
    clearInterval(this.gameInterval)
    alert(`Game over! Your final score is ${this.score} out of ${instruments.length}.`)

    const feedbackElement = document.getElementById('feedback')
    feedbackElement.textContent = ''

    document.getElementById('m-start-screen').classList.remove('d-none')
    document.getElementById('music-play').classList.add('d-none')
  }

  handleAnswer = (answer) => {
    const currentClip = this.availableClips[this.currentStep]
    const isCorrect = answer.trim().toLowerCase() === currentClip.name.toLowerCase()

    // Feedback report
    const feedbackElement = document.getElementById('feedback')
    feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!'
    feedbackElement.className = isCorrect ? 'text-success' : 'text-danger'

    if (isCorrect) this.score++
    this.currentStep++

    if (this.currentStep < 5) {
      setTimeout(() => this.nextStep(), 1000)
    } else {
      this.stopGame()
    }
  }

  nextStep = () => {
    const feedbackReset = document.getElementById('feedback')
    feedbackReset.textContent = ''
    feedbackReset.className = ''

    const gameTypes = ['sound', 'image']
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
    const currentClip = this.availableClips[this.currentStep]

    document.getElementById('m-time').textContent = `Time: ${this.gameTime}s`
    document.getElementById('m-score').textContent = `Score: ${this.score}`

    const soundClipElement = document.getElementById('sound-clip')
    const answerButtons = document.getElementById('answer-buttons')
    const inputElement = document.getElementById('answer-input')
    const imageElement = document.getElementById('instrument-image')

    // Clear elements
    answerButtons.innerHTML = ''
    inputElement.value = ''
    inputElement.classList.add('d-none')
    imageElement.classList.add('d-none')
    soundClipElement.classList.add('d-none')

    if (this.currentMode === 'sound') {
      // Sound clip game mode
      soundClipElement.src = `../music_files/sounds/${currentClip.file}`
      soundClipElement.volume = 0.25
      soundClipElement.classList.remove('d-none')

      // Generate 4 answer buttons
      const answerOptions = new Set([currentClip])
      while (answerOptions.size < 4) {
        const randomClip = instruments[Math.floor(Math.random() * instruments.length)]
        answerOptions.add(randomClip)
      }

      const shuffledOptions = shuffleArray([...answerOptions])

      // Shuffle and display the answer options
      shuffledOptions.forEach((clip) => {
        const button = document.createElement('button')
        button.className = 'btn btn-secondary'
        button.textContent = clip.name
        button.addEventListener('click', () => this.handleAnswer(clip.name))
        answerButtons.appendChild(button)
      })
    } else {
        // Image game mode
        imageElement.src = `../music_files/images/${currentClip.image}`
        imageElement.alt = currentClip.name
        imageElement.classList.remove('d-none')

        // Input box
        inputElement.classList.remove('d-none')
        inputElement.focus()
      }
    }
  }

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