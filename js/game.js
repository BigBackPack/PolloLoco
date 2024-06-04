let canvas;
let world;
let keyboard = new Keyboard();

const buttonMoveRight = document.getElementById("right-button");
const buttonMoveLeft = document.getElementById("left-button");
const throwButton = document.getElementById("bottle-button");
const jumpButton = document.getElementById("jump-button");
const restartButton = document.getElementById("restart-button");
const fullscreenButton = document.getElementById('fullscreen-button');
const minscreenButton = document.getElementById('minscreen-button');
const titleConatiner = document.getElementById('title-container');
const canvasConatiner = document.getElementById('canvas-container');

const groundLayer = level01.bgs[0];
const desertLayer = level01.bgs[1];
const mountainLayer = level01.bgs[2];
const cloudLayer = level01.bgs[3];
const cloudBgLayer = level01.bgs[4];

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

// key controlls
window.addEventListener("keydown", (event) => {
    if(event.key == "a"){
        keyboard.LEFT = true;
        facingRdight = false;
        groundLayer.moveBgRight = true;
        desertLayer.moveBgRight = true;
        mountainLayer.moveBgRight = true;
        cloudLayer.moveBgRight = true;
        cloudBgLayer.moveBgRight = true;
    } 
    if (event.key == "d") {
        keyboard.RIGHT = true;
        facingRight = true;
        groundLayer.moveBgLeft = true;
        desertLayer.moveBgLeft = true;
        mountainLayer.moveBgLeft = true;
        cloudLayer.moveBgLeft = true;
        cloudBgLayer.moveBgLeft = true;
    } 
    if (event.key == " ") {
        keyboard.JUMP = true;
    }
    if (event.key == "w") {
        keyboard.THROW = true;
    } 
});


window.addEventListener("keyup", (event) => {
    if(event.key == "a"){
        keyboard.LEFT = false;
        groundLayer.moveBgRight = false;
        desertLayer.moveBgRight = false;
        mountainLayer.moveBgRight = false;
        cloudLayer.moveBgRight = false;
        cloudBgLayer.moveBgRight = false;
    }
    if (event.key == "d") {
        keyboard.RIGHT = false;
        groundLayer.moveBgLeft = false;
        desertLayer.moveBgLeft = false;
        mountainLayer.moveBgLeft = false;
        cloudLayer.moveBgLeft = false;
        cloudBgLayer.moveBgLeft = false;
    }
    if (event.key == " ") {
        keyboard.JUMP = false;
    }
    if (event.key == "w") {
        keyboard.THROW = false;
        keyboard.isShooting = false;
    } 
});


// button controlls
buttonMoveRight.addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
    facingRight = true;
});

buttonMoveRight.addEventListener("touchend", () => {
    keyboard.RIGHT = false;
});


buttonMoveLeft.addEventListener("touchstart", () => {
    keyboard.LEFT = true;
    facingLeft = false;
});

buttonMoveLeft.addEventListener("touchend", () => {
    keyboard.LEFT = false;
});


throwButton.addEventListener("touchstart", () => {
    keyboard.THROW = true;
});

throwButton.addEventListener("touchend", () => {
    keyboard.THROW = false;
    keyboard.isShooting = false;
});


jumpButton.addEventListener("touchstart", () => {
    keyboard.JUMP = true;
});

jumpButton.addEventListener("touchend", () => {
    keyboard.JUMP = false;
});


restartButton.addEventListener("touchstart", () => {
    window.location = "index.html";
});


restartButton.addEventListener("click", () => {
    window.location = "index.html";
});
