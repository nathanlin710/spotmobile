// let gameState = 'start'; 
// let paddle_1 = document.querySelector('.paddle_1'); 
// let board = document.querySelector('.board'); 
// let initial_ball = document.querySelector('.ball'); 
// let ball = document.querySelector('.ball'); 
// let score_1 = document.querySelector('.player_1_score'); 
// let wall = document.querySelector('.wall');
// let message = document.querySelector('.message'); 
// let paddle_1_coord = paddle_1.getBoundingClientRect(); 
// let initial_ball_coord = ball.getBoundingClientRect(); 
// let ball_coord = initial_ball_coord; 
// let board_coord = board.getBoundingClientRect(); 
// let paddle_common = 
//     document.querySelector('.paddle').getBoundingClientRect(); 
  
// let dx = Math.floor(Math.random() * 4) + 3; 
// let dy = Math.floor(Math.random() * 4) + 3; 
// let dxd = Math.floor(Math.random() * 2); 
// let dyd = Math.floor(Math.random() * 2); 
  
// const socket = io();

// function movePaddle(x, y, z) {
//     const paddleSpeed = 60; // Adjust the speed as needed

//     // Calculate pitch angle
//     const pitch = Math.atan2(z, Math.sqrt(x ** 2 + y ** 2));

//     // Adjust paddle position based on pitch angle
//     if (pitch > 0) {
//         // Arduino facing upwards, move paddle up
//         paddle_1.style.top = Math.max(board_coord.top, paddle_1_coord.top - paddleSpeed) + 'px';
//     } else {
//         // Arduino facing downwards, move paddle down
//         paddle_1.style.top = Math.min(board_coord.bottom - paddle_common.height, paddle_1_coord.top + paddleSpeed) + 'px';
//     }

//     paddle_1_coord = paddle_1.getBoundingClientRect();
// }

// document.addEventListener('keydown', (e) => {
//     if (e.key == 'Enter') {
//         gameState = gameState == 'start' ? 'play' : 'start';
//         if (gameState == 'play') {
//             message.innerHTML = 'Game Started';
//             message.style.left = 42 + 'vw';
//             requestAnimationFrame(() => {
//                 dx = Math.floor(Math.random() * 4) + 3;
//                 dy = Math.floor(Math.random() * 4) + 3;
//                 dxd = Math.floor(Math.random() * 2);
//                 dyd = Math.floor(Math.random() * 2);
//                 moveBall(dx, dy, dxd, dyd);
//             });
//         }
//     }

//     if (gameState == 'play') {
//         socket.on('gyroscopeData', (data) => {
//             movePaddle(data.x, data.y, data.z);
//         });
//     }
// });
  
// function moveBall(dx, dy, dxd, dyd) { 
// if (ball_coord.top <= board_coord.top) { 
//     dyd = 1; 
// } 
// if (ball_coord.bottom >= board_coord.bottom) { 
//     dyd = 0; 
// } 
// if ( 
//     ball_coord.left <= paddle_1_coord.right && 
//     ball_coord.top >= paddle_1_coord.top && 
//     ball_coord.bottom <= paddle_1_coord.bottom 
// ) { 
//     dxd = 1; 
//     dx = Math.floor(Math.random() * 4) + 3; 
//     dy = Math.floor(Math.random() * 4) + 3; 
// } 
// if (
//     ball_coord.right >= wall.getBoundingClientRect().left &&
//     ball_coord.top >= wall.getBoundingClientRect().top &&
//     ball_coord.bottom <= wall.getBoundingClientRect().bottom
// ) {
//     dxd = 0;
//     dx = Math.floor(Math.random() * 4) + 3;
//     dy = Math.floor(Math.random() * 4) + 3;
// }
// if ( 
//     ball_coord.left <= board_coord.left
// ) {
//     gameState = 'start'; 
//     score_1.innerHTML -= 1
//     if (score_1.innerHTML == 0) {
//         score_1.innerHTML = 5
//     }
//     ball_coord = initial_ball_coord; 
//     ball.style = initial_ball.style; 
//     message.innerHTML = 'Press Enter to Play Pong'; 
//     message.style.left = 38 + 'vw'; 
//     return; 
// } 
// ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px'; 
// ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px'; 
// ball_coord = ball.getBoundingClientRect(); 
// requestAnimationFrame(() => { 
//     moveBall(dx, dy, dxd, dyd); 
// }); 
// } 

let gameState = 'start'; 
let paddle_1 = document.querySelector('.paddle_1'); 
let paddle_2 = document.querySelector('.paddle_2'); 
let board = document.querySelector('.board'); 
let initial_ball = document.querySelector('.ball'); 
let ball = document.querySelector('.ball'); 
let score_1 = document.querySelector('.player_1_score'); 
let score_2 = document.querySelector('.player_2_score'); 
let message = document.querySelector('.message'); 
let paddle_1_coord = paddle_1.getBoundingClientRect(); 
let paddle_2_coord = paddle_2.getBoundingClientRect(); 
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

function movePaddle1(x, y, z) {
    const paddleSpeed = 60; // Adjust the speed as needed

    // Calculate pitch angle
    const pitch = Math.atan2(z, Math.sqrt(x ** 2 + y ** 2));

    // Adjust paddle position based on pitch angle
    if (pitch > 0) {
        // Arduino facing upwards, move paddle up
        paddle_1.style.top = Math.max(board_coord.top, paddle_1_coord.top - paddleSpeed) + 'px';
    } else {
        // Arduino facing downwards, move paddle down
        paddle_1.style.top = Math.min(board_coord.bottom - paddle_common.height, paddle_1_coord.top + paddleSpeed) + 'px';
    }

    paddle_1_coord = paddle_1.getBoundingClientRect();
}

function movePaddle2(x, y, z) {
    const paddleSpeed = 60; // Adjust the speed as needed

    // Calculate pitch angle
    const pitch = Math.atan2(z, Math.sqrt(x ** 2 + y ** 2));

    // Adjust paddle position based on pitch angle
    if (pitch > 0) {
        // Arduino facing upwards, move paddle up
        paddle_2.style.top = Math.max(board_coord.top, paddle_2_coord.top - paddleSpeed) + 'px';
    } else {
        // Arduino facing downwards, move paddle down
        paddle_2.style.top = Math.min(board_coord.bottom - paddle_common.height, paddle_2_coord.top + paddleSpeed) + 'px';
    }

    paddle_2_coord = paddle_2.getBoundingClientRect();
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
            if (data.id == 'e71302c99a5518ce9c8f8254469e95fa') {
                movePaddle1(data.x, data.y, data.z);
            }
            else {
                movePaddle2(data.x, data.y, data.z);
            }
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
    ball_coord.right >= paddle_2_coord.left && 
    ball_coord.top >= paddle_2_coord.top && 
    ball_coord.bottom <= paddle_2_coord.bottom 
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
if ( 
    ball_coord.right >= board_coord.right
) {
    gameState = 'start'; 
    score_2.innerHTML -= 1
    if (score_2.innerHTML == 0) {
        score_2.innerHTML = 5
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