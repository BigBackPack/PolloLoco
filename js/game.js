let canvas;
let world;
let keyboard = new Keyboard();

let buttonMoveRight = document.getElementById("right-button");
let buttonMoveLeft = document.getElementById("left-button");
let throwButton = document.getElementById("bottle-button");
let jumpButton = document.getElementById("jump-button");
let restartButton = document.getElementById("restart-button");


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
        facingRight = false;
    } 
    if (event.key == "d") {
        keyboard.RIGHT = true;
        facingRight = true;
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
    }
    if (event.key == "d") {
        keyboard.RIGHT = false;
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
buttonMoveRight.addEventListener("mousedown", () => {
    keyboard.RIGHT = true;
    facingRight = true;
});

buttonMoveRight.addEventListener("mouseup", () => {
    keyboard.RIGHT = false;
});


buttonMoveLeft.addEventListener("mousedown", () => {
    keyboard.LEFT = true;
    facingLeft = false;
});

buttonMoveLeft.addEventListener("mouseup", () => {
    keyboard.LEFT = false;
});


throwButton.addEventListener("mousedown", () => {
    keyboard.THROW = true;
});

throwButton.addEventListener("mouseup", () => {
    keyboard.THROW = false;
    keyboard.isShooting = false;
});


jumpButton.addEventListener("mousedown", () => {
    keyboard.JUMP = true;
});

jumpButton.addEventListener("mouseup", () => {
    keyboard.JUMP = false;
});


restartButton.addEventListener("mousedown", () => {
    window.location = "index.html";
});
