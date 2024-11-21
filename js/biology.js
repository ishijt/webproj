let startButton = document.getElementById('startGameButton')
let game = document.getElementById('game')
let welcome = document.getElementById('welcomeCont')


startButton.addEventListener('click', startGame)

function startGame() {
    game.style.display = 'block'
    welcome.style.display = 'none'

}




