const instruments = [
  { id: 1, name: 'Piano', file: 'piano.mp3', image: 'piano.png' },
  { id: 2, name: 'Guitar', file: 'guitar.mp3', image: 'guitar.png' },
  { id: 3, name: 'Drums', file: 'drums.mp3', image: 'drums.png' },
  { id: 4, name: 'Violin', file: 'violin.mp3', image: 'violin.png' },
  { id: 5, name: 'Trumpet', file: 'trumpet.mp3', image: 'trumpet.png' },
  { id: 6, name: 'Flute', file: 'flute.mp3', image: 'flute.png' },
  { id: 7, name: 'Saxophone', file: 'saxophone.mp3', image: 'saxophone.png' },
  { id: 8, name: 'Cello', file: 'cello.mp3', image: 'cello.png' },
  { id: 9, name: 'Harp', file: 'harp.mp3', image: 'harp.png' },
  { id: 10, name: 'Banjo', file: 'banjo.mp3', image: 'banjo.png' },
  { id: 11, name: 'Harmonica', file: 'harmonica.mp3', image: 'harmonica.png' },
  { id: 12, name: 'Xylophone', file: 'xylophone.mp3', image: 'xylophone.png' },
  { id: 13, name: 'Accordion', file: 'accordion.mp3', image: 'accordion.png' },
  { id: 14, name: 'Trombone', file: 'trombone.mp3', image: 'trombone.png' },
  { id: 15, name: 'Clarinet', file: 'clarinet.mp3', image: 'clarinet.png' }
]

class MusicGame {
  constructor() {
    this.currentStep = 0
    this.score = 0
    this.gameTime = 0
    this.gameInterval = null
    this.currentMode = 'sound'
  }

  startGame = () => {
    this.currentStep = 0
    this.score = 0
    this.gameTime = 0
    this.gameInterval = setInterval(() => this.updateGameTime(), 1000)
    shuffleArray(soundClips)
    this.nextStep()
  }

  stopGame = () => {
    clearInterval(this.gameInterval)
    alert(`Game over! Your final score is ${this.score} out of ${soundClips.length}.`)

    document.getElementById('feedback').innerHTML = `
      <button class="btn btn-primary mt-3" onclick="game.startGame()">Restart Game</button>
    `
  }

  handleAnswer = (answer) => {
    const currentClip = soundClips[this.currentStep]
    const isCorrect = answer.toLowerCase() === currentClip.name.toLowerCase()

    // Feedback report
    const feedbackElement = document.getElementById('feedback')
    feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!'
    feedbackElement.className = isCorrect ? 'text-success' : 'text-danger'

    if (isCorrect) this.score++
    this.currentStep++

    if (this.currentStep < soundClips.length) {
      setTimeout(() => this.nextStep(), 1000)
    } else {
      this.stopGame()
    }
  }

  nextStep = () => {
    const gameTypes = ['sound', 'image']
    this.currentMode = gameTypes[Math.floor(Math.random() * gameTypes.length)]
    this.updateGameUI()
  }

  updateGameTime = () => {
    this.gameTime++
    const mins = Math.floor(this.gameTime / 60)
    const secs = this.gameTime % 60
    document.getElementById('time').textContent = `Time: ${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  updateGameUI = () => {
    const currentClip = soundClips[this.currentStep]

    document.getElementById('time').textContent = `Time: ${this.gameTime}s`
    document.getElementById('score').textContent = `Score: ${this.score}`

    const gamePlay = document.getElementById('game-play')
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
      soundClipElement.src = `/music/sounds/${currentClip.file}`
      soundClipElement.classList.remove('d-none')

      // Generate 4 answer buttons
      const options = shuffleArray([...soundClips]).slice(0, 3)
      options.push(currentClip)
      shuffleArray(options).forEach((clip) => {
        const button = document.createElement('button')
        button.className = 'btn btn-secondary'
        button.textContent = clip.name
        button.addEventListener('click', () => this.handleAnswer(clip.name))
        answerButtons.appendChild(button)
      })
    } else {
      // Image game mode
      imageElement.src = `/music/images/${currentClip.image}`
      imageElement.alt = currentClip.name
      imageElement.classList.remove('d-none')

      // Show input field for typing the answer
      inputElement.classList.remove('d-none')
      inputElement.focus()
    }
  }
}

// Helper to shuffle arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const game = new MusicGame()

document.getElementById('start-game').addEventListener('click', () => {
  document.getElementById('start-screen').classList.add('d-none')
  document.getElementById('game-play').classList.remove('d-none')
  game.startGame()
})

document.getElementById('answer-input').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    game.handleAnswer(event.target.value)
    event.target.value = ''
  }
})