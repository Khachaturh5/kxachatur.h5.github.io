const instructionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const board = document.getElementById("game-board");
const scores = document.getElementById("score");
const highScoreText = document.getElementById("highscore");

let audi2 = new Audio("mixkit-arcade-bonus-alert-767.wav");
let audi3 = new Audio("mixkit-game-show-intro-943.wav");
let audi4 = new Audio("mixkit-wrong-electricity-buzz-955.wav");
let audi5 = new Audio("mixkit-positive-notification-951.wav");

let highScore = 0;
let gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let food1 = generateFood();
let food2 = generateFood();
let food3 = generateFood();
let bomb = generateBomb(); 
let bomb2 = generateBomb();
let bomb3 = generateBomb();
let gift = generateGift(); 
let barrier = generateBarrier();
let direction = "right";
let isGameStarted = false;
let gameSpeedDelay = 300;
let gameIntervalId;
let barrier2 = generateBarrier();
let barrier3 = generateBarrier();
let barrier4 = generateBarrier();
let barrier5 = generateBarrier();

function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    drawFood2();
    drawFood3();
   
    
        drawGift(); 
        drawBomb();
        drawBomb2();
        drawBomb3();
   
    drawBarrier();
    drawBarrier2();
    drawBarrier3();
    drawBarrier4();
    drawBarrier5();
    snakeScore();
    snakeHighScoretext();
    
}

function drawSnake() {
    audi3.play();
    snake.forEach((segment) => {
        const snakeElement = createElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}



function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    let foodElement = createElement("div", "food");
    foodElement.textContent = " 🍎";
    setPosition(foodElement, food1);
    board.appendChild(foodElement);
}

function drawFood2() {
    let foodElement = createElement("div", "food");
    foodElement.textContent = "  🍓";
    setPosition(foodElement, food2);
    board.appendChild(foodElement);
}

function drawFood3() {
    let foodElement = createElement("div", "food");
    foodElement.textContent = " 🍒";
    setPosition(foodElement, food3);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === barrier.x && head.y === barrier.y ||
        head.x === barrier2.x && head.y === barrier2.y ||
        head.x === barrier3.x && head.y === barrier3.y ||
        head.x === barrier4.x && head.y === barrier4.y ||
        head.x === barrier5.x && head.y === barrier5.y) {
        
        resetGame();
        audi4.play(); 
        gameSpeedDelay = 300;
        return; 
    }

        
    if (head.x === food1.x && head.y === food1.y) {
        barrier = generateBarrier();
        barrier2 = generateBarrier();
        barrier3 = generateBarrier();
        barrier4 = generateBarrier();
        barrier5 = generateBarrier();
        bomb = generateBomb(); 
        bomb2 = generateBomb();
        bomb3 = generateBomb();
        food1 = generateFood();
        food2 = generateFood();
        food3 = generateFood();
        audi2.play(); 
        gift = generateGift(); 
        increaseSpeed();
    } else if (head.x === food2.x && head.y === food2.y) {
        barrier = generateBarrier();
        barrier2 = generateBarrier();
        barrier3 = generateBarrier();
        barrier4 = generateBarrier();
        barrier5 = generateBarrier();
        bomb = generateBomb(); 
        bomb2 = generateBomb();
        bomb3 = generateBomb();
        food1 = generateFood();
        food2 = generateFood();
        food3 = generateFood();
        audi2.play(); 
        gift = generateGift(); 
        increaseSpeed();

    } else if (head.x === food3.x && head.y === food3.y) {
        barrier = generateBarrier();
        barrier2 = generateBarrier();
        barrier3 = generateBarrier();
        barrier4 = generateBarrier();
        barrier5 = generateBarrier();
        bomb = generateBomb(); 
        bomb2 = generateBomb();
        bomb3 = generateBomb();
        food1 = generateFood();
        food2 = generateFood();
        food3 = generateFood();
        audi2.play(); 
        gift = generateGift(); 
        increaseSpeed();
    } else if (head.x === bomb.x && head.y === bomb.y ||
               head.x === bomb2.x && head.y === bomb2.y ||
               head.x === bomb3.x && head.y === bomb3.y) {
        audi4.play();
        snake.pop(); 
     
        bomb = generateBomb(); 
        bomb2 = generateBomb();
        bomb3 = generateBomb();
        gift = generateGift(); 
    } else if (head.x === gift.x && head.y === gift.y) {
        snake.push(snake[snake.length - 1]);
        snake.push(snake[snake.length - 1]);
        snake.push(snake[snake.length - 1]);
      
        barrier = generateBarrier();
        barrier2 = generateBarrier();
        barrier3 = generateBarrier();
        barrier4 = generateBarrier();
        barrier5 = generateBarrier();
        bomb = generateBomb(); 
        bomb2 = generateBomb();
        bomb3 = generateBomb();
        food1 = generateFood();
        food2 = generateFood();
        food3 = generateFood();
       
        gift = generateGift(); 
        increaseSpeed();
        audi5.play(); 
    } else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameSpeedDelay = 300;
    gameIntervalId = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

function handleKeyPress(e) {
    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                if (direction !== "down") direction = "up";
                break;
            case "ArrowDown":
                if (direction !== "up") direction = "down";
                break;
            case "ArrowLeft":
                if (direction !== "right") direction = "left";
                break;
            case "ArrowRight":
                if (direction !== "left") direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame();
        audi4.play();
        gameSpeedDelay = 300;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            audi4.play();
            gameSpeedDelay = 300;
            break;
        }
    }
}

function resetGame() {
    stopGame();

    snake = [{ x: 10, y: 11 }];
    barrier2 = generateBarrier();
    barrier3 = generateBarrier();
    barrier4 = generateBarrier();
    barrier5 = generateBarrier();
    barrier = generateBarrier();
    bomb = generateBomb(); 
    bomb2 = generateBomb();
    bomb3 = generateBomb();
    direction = "right";
    gameSpeedDelay = 300;
    food1 = generateFood();
    food2 = generateFood();
    food3 = generateFood();
}

function stopGame() {
    gameSpeedDelay = 300;
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instructionText.style.display = "block";
}

document.addEventListener("keydown", handleKeyPress);

function snakeScore() {
    let currentScore = snake.length - 1;
    scores.textContent = currentScore.toString().padStart(3, "0");
}

function snakeHighScoretext() {
    let currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}

function generateBarrier() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function drawBarrier() {
    let barrierElement = createElement("div", "barrier");
    barrierElement.textContent = "  🪨";
    setPosition(barrierElement, barrier);
    board.appendChild(barrierElement);
}

function drawBarrier2() {
    let barrier2Element = createElement("div", "barrier2");
    barrier2Element.textContent = "  🪨";
    setPosition(barrier2Element, barrier2);
    board.appendChild(barrier2Element);
}

function drawBarrier3() {
    let barrier3Element = createElement("div", "barrier3");
    barrier3Element.textContent = "  🪨";
    setPosition(barrier3Element, barrier3);
    board.appendChild(barrier3Element);
}

function drawBarrier4() {
    let barrier4Element = createElement("div", "barrier4");
    barrier4Element.textContent = "  🪨";
    setPosition(barrier4Element, barrier4);
    board.appendChild(barrier4Element);
}

function drawBarrier5() {
    let barrier5Element = createElement("div", "barrier5");
    barrier5Element.textContent = "  🪨";
    setPosition(barrier5Element, barrier5);
    board.appendChild(barrier5Element);
}

function increaseSpeed() {
    gameSpeedDelay = Math.max(gameSpeedDelay - 5, 50); 
    clearInterval(gameIntervalId);
    gameIntervalId = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

function drawBomb() {
    let bombElement = createElement("div", "bomb");
    bombElement.textContent = " 💣"; 
    setPosition(bombElement, bomb);
    board.appendChild(bombElement);
}

function drawBomb2() {
    let bomb2Element = createElement("div", "bomb2");
    bomb2Element.textContent = " 💣"; 
    setPosition(bomb2Element, bomb2);
    board.appendChild(bomb2Element);
}

function drawBomb3() {
    let bomb3Element = createElement("div", "bomb3");
    bomb3Element.textContent = " 💣"; 
    setPosition(bomb3Element, bomb3);
    board.appendChild(bomb3Element);
}

function generateBomb() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function drawGift() {
    let giftElement = createElement("div", "gift");
    giftElement.textContent = " 🎁"; 
    setPosition(giftElement, gift);
    board.appendChild(giftElement);
}

function generateGift() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}
