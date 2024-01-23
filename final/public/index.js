let gameState = 'start'; 
let paddle_1 = document.querySelector('.paddle_1'); 
let board = document.querySelector('.board'); 
let initial_ball = document.querySelector('.ball'); 
let ball = document.querySelector('.ball'); 
let score_1 = document.querySelector('.player_1_score'); 
let wall = document.querySelector('.wall');
let message = document.querySelector('.message'); 
let paddle_1_coord = paddle_1.getBoundingClientRect(); 
let initial_ball_coord = ball.getBoundingClientRect(); 
let ball_coord = initial_ball_coord; 
let board_coord = board.getBoundingClientRect(); 
let paddle_common = 
    document.querySelector('.paddle').getBoundingClientRect(); 
  
let dx = Math.floor(Math.random() * 4) + 3; 
let dy = Math.floor(Math.random() * 4) + 3; 
let dxd = Math.floor(Math.random() * 2); 
let dyd = Math.floor(Math.random() * 2); 
  
const socket = io();

function movePaddle(sensorValue) {
    const paddleSpeed = 60; // Adjust the speed as needed
    paddle_1.style.top = Math.max(board_coord.top, Math.min(board_coord.bottom - paddle_common.height, paddle_1_coord.top + paddleSpeed*sensorValue)) + 'px';
    paddle_1_coord = paddle_1.getBoundingClientRect();
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        gameState = gameState == 'start' ? 'play' : 'start';
        if (gameState == 'play') {
            message.innerHTML = 'Game Started';
            message.style.left = 42 + 'vw';
            requestAnimationFrame(() => {
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveBall(dx, dy, dxd, dyd);
            });
        }
    }

    if (gameState == 'play') {
        socket.on('gyroscopeData', (data) => {
            movePaddle(data.sensorValue);
        });
    }
});
  
function moveBall(dx, dy, dxd, dyd) { 
if (ball_coord.top <= board_coord.top) { 
    dyd = 1; 
} 
if (ball_coord.bottom >= board_coord.bottom) { 
    dyd = 0; 
} 
if ( 
    ball_coord.left <= paddle_1_coord.right && 
    ball_coord.top >= paddle_1_coord.top && 
    ball_coord.bottom <= paddle_1_coord.bottom 
) { 
    dxd = 1; 
    dx = Math.floor(Math.random() * 4) + 3; 
    dy = Math.floor(Math.random() * 4) + 3; 
} 
if (
    ball_coord.right >= wall.getBoundingClientRect().left &&
    ball_coord.top >= wall.getBoundingClientRect().top &&
    ball_coord.bottom <= wall.getBoundingClientRect().bottom
) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
}
if ( 
    ball_coord.left <= board_coord.left
) {
    gameState = 'start'; 
    score_1.innerHTML -= 1
    if (score_1.innerHTML == 0) {
        score_1.innerHTML = 5
    }
    ball_coord = initial_ball_coord; 
    ball.style = initial_ball.style; 
    message.innerHTML = 'Press Enter to Play Pong'; 
    message.style.left = 38 + 'vw'; 
    return; 
} 
ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px'; 
ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px'; 
ball_coord = ball.getBoundingClientRect(); 
requestAnimationFrame(() => { 
    moveBall(dx, dy, dxd, dyd); 
}); 
} 