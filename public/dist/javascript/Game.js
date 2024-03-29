let userLoggedIn = localStorage.getItem('userLoggedIn')
let userData = JSON.parse(localStorage.getItem('userData'))
//Board
let board
let boardWidth = 500
let boardHeight = 500
let context

//player
let playerWidth = 80
let playerHeight = 10
let playerVelocityX = 10

// player JSON
let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
  velocityX: playerVelocityX,
}
// Ball
let ballWidth = 10
let ballHeight = 10
let BallVelocityX = 3
let BallVelocityY = 2

let Ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: BallVelocityX,
  vlocityY: BallVelocityY,
}

// Blocks
let blockArray = []
let blockWidth = 50
let blockHeight = 10
let blockCol = 8
let blockRow = 3
let blockMaxRow = 10
let blockCount = 0
// Starting block corner top left
let blockX = 15
let blockY = 45

//Score
let score = 0
let gameOver = false

//Next Level
// if (blockCount == 0) {
//   score += 100 * blockRow * blockCol
//   blockRow = Math.min(blockRow + 1, blockMaxRow)
//   createBlocks()
// }

// Functions
window.onload = function () {
  let confirmed = confirm('Ready to play?')
  if (confirmed) {
    startGame()
  } else {
    alert("You cancelled the game. Feel free to start whenever you're ready!")
  }
}

function update() {
  requestAnimationFrame(update)
  if (gameOver) return

  context.clearRect(0, 0, board.width, board.height)
  //player
  context.fillStyle = 'lightgreen'
  context.fillRect(player.x, player.y, player.width, player.height)

  context.fillStyle = 'red'
  Ball.x += Ball.velocityX
  Ball.y += Ball.vlocityY
  context.fillRect(Ball.x, Ball.y, Ball.width, Ball.height)

  // bounce ball off walls
  if (Ball.y <= 0) {
    // Top Of Canvas
    Ball.vlocityY *= -1
  } else if (Ball.x <= 0 || Ball.x + Ball.width >= boardWidth) {
    //Left or Right of Canvas
    Ball.velocityX *= -1
  } else if (Ball.y + Ball.height >= boardHeight) {
    //if ball touches bottom of canvas
    //Game Over
    context.fillStyle = 'white'
    context.font = '20px sans-serif'
    context.fillText(`Score:${score}`, 200, 350)
    context.fillText(" Game Over: Press 'Arrow Up' to Restart", 80, 400)
    scoring()
    gameOver = true
  }
  //bounce the ball of paddle
  if (topCollision(Ball, player) || bottomCollision(Ball, player)) {
    Ball.vlocityY *= -1 //flip y Direction up or down
  } else if (leftCollision(Ball, player) || rightCollison(Ball, player)) {
    Ball.velocityX *= -1
  }
  // Blocks
  context.fillStyle = 'skyblue'
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i]
    if (!block.break) {
      if (topCollision(Ball, block) || bottomCollision(Ball, block)) {
        block.break = true
        Ball.vlocityY *= -1 //flip y diraction to up or down
        blockCount -= 1
        score += 100
      } else if (leftCollision(Ball, block) || rightCollison(Ball, block)) {
        block.break = true
        Ball.velocityX *= -1 //flip x diraction to left or right
        blockCount -= 1
        score += 100
      }
      context.fillRect(block.x, block.y, block.width, block.height)
    }
  }
  context.font = '20px sans-serif'
  context.fillText(score, 10, 25)
}

function outOfBounds(xPosition) {
  return xPosition < 0 || xPosition + playerWidth > boardWidth
}

function movePlayer(e) {
  if (gameOver) {
    if (e.code == 'ArrowUp' || e.code == 'KeyW') {
      resetGame()
      Ranking(userData)
    }
  }

  if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
    // player.x -= player.velocityX
    let nextPlayerX = player.x - player.velocityX
    if (!outOfBounds(nextPlayerX)) {
      player.x = nextPlayerX
    }
  } else if (e.code == 'ArrowRight' || e.code == 'KeyD') {
    // player.x += player.velocityX
    let nextPlayerX = player.x + player.velocityX
    if (!outOfBounds(nextPlayerX)) {
      player.x = nextPlayerX
    }
  }
}
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault()
  }
})

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}
// Detect Ball and Block Functions
function topCollision(ball, block) {
  //a is above b (ball above block)
  return detectCollision(ball, block) && ball.y + ball.height >= block.y
}

function bottomCollision(ball, block) {
  return detectCollision(ball, block) && block.y + block.height >= ball.y
}

function leftCollision(ball, block) {
  return detectCollision(ball, block) && ball.x + ball.width >= block.x
}

function rightCollison(ball, block) {
  return detectCollision(ball, block) && block.x + block.width >= ball.x
}

// Block Creation Function
function createBlocks() {
  blockArray = [] //cleaer block array
  for (let c = 0; c < blockCol; c++) {
    for (let r = 0; r < blockRow; r++) {
      let block = {
        x: blockX + c * blockWidth + c * 10,
        y: blockY + r * blockHeight + r * 20,
        width: blockWidth,
        height: blockHeight,
        break: false,
      }
      blockArray.push(block)
    }
  }
  blockCount = blockArray.length
}

// Reset Function
function resetGame() {
  gameOver = false
  player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX,
  }
  Ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: BallVelocityX,
    vlocityY: BallVelocityY,
  }
  blockArray = []
  score = 0
  blockRow = 3
  createBlocks()
}
function startGame() {
  board = document.getElementById('board')
  board.height = boardHeight
  board.width = boardWidth
  //used for drawing on the board
  context = board.getContext('2d')
  //draw inital player
  context.fillStyle = 'lightgreen'
  context.fillRect(player.x, player.y, player.width, player.height)

  requestAnimationFrame(update)
  document.addEventListener('keydown', movePlayer)

  //create blocks
  createBlocks()
}

function scoring() {
  const currentUser = userData.find((user) => user.uName === userLoggedIn)

  if (currentUser) {
    currentUser.uScore = score
    localStorage.setItem('userData', JSON.stringify(userData))
  }
}

function Ranking(userData) {
  let userListContainer = document.querySelector('.highscores')

  // Clear the existing content in userListContainer
  userListContainer.innerHTML = ''
  userListContainer.classList.add('mt-20')
  const header = document.createElement('h1')
  header.classList.add('text-white','font-bold', 'text-4xl','hover:text-red-600', 'hover:cursor-pointer')
  header.textContent='Highscores'
  userListContainer.appendChild(header)
  const titles = document.createElement('div')
  titles.classList.add('title', 'flex', 'text-white', 'text-2xl' ,'gap-96', 'mt-5' ,'border-t-2' ,'font-semibold', 'hover:text-red-600', 'hover:cursor-pointer')
  userListContainer.appendChild(titles)
  const p1 = document.createElement('p')
  p1.classList.add('left')
  p1.innerHTML='Username'
  titles.appendChild(p1)
  const p2 = document.createElement('p')
  p2.classList.add('right')
  p2.innerHTML='Score'
  titles.appendChild(p2)
  
  // Loop through userData and create elements for each user
  for (let i = 0; i < userData.length; i++) {
    let user = userData[i]

    // Create elements for username and score
    let item = document.createElement('div')
    item.classList.add(
      'item',
      'flex',
      'justify-between',
      'text-white',
      'text-2xl',
      'mt-5',
      'bg-slate-500',
      'rounded-lg',
      'font-semibold',
      'hover:text-red-600',
      'hover:cursor-pointer'
      ,'p-1'
    )

    let userNameContainer = document.createElement('p')
    userNameContainer.classList.add('userName')
    userNameContainer.textContent = user.uName
    item.appendChild(userNameContainer)

    let userScoreContainer = document.createElement('p')
    userScoreContainer.classList.add('score') 
    userScoreContainer.textContent = user.uScore
    item.appendChild(userScoreContainer)

    userListContainer.appendChild(item)
  }
}
