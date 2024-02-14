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
// Functions
window.onload = function () {
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
}

function update() {
  requestAnimationFrame(update)
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
  } else if (Ball.y + Ball.height >= boardHeight);
  //if ball touches bottom of canvas
  //Game Over
}

function outOfBounds(xPosition) {
  return xPosition < 0 || xPosition + playerWidth > boardWidth
}

function movePlayer(e) {
  if (e.code == 'ArrowLeft') {
    // player.x -= player.velocityX
    let nextPlayerX = player.x - player.velocityX
    if (!outOfBounds(nextPlayerX)) {
      player.x = nextPlayerX
    }
  } else if (e.code == 'ArrowRight') {
    // player.x += player.velocityX
    let nextPlayerX = player.x + player.velocityX
    if (!outOfBounds(nextPlayerX)) {
      player.x = nextPlayerX
    }
  }
}
function detectCollision(a, b)
 {
  return a.x < b.x + b.width &&
         a.x+a.width>b.x&&
         a.y<b.y+b.height &&
         a.y+a.height>b.y
 }

 function topCollision(ball,block){
  //a is above b (ball above block)
  return detectCollision(ball ,block) && (ball.y+ball.height)>=block.y;
 }