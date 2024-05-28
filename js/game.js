let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const canvasWidth = 720;
const canvasHeight = 480;

const fullscreenButton = document.getElementById('fullscreen-button');
const minscreenButton = document.getElementById('minscreen-button');
const canvasContainer = document.getElementById('canvas-container');
const aspectRatio = canvasWidth / canvasHeight;

let scaledWidth, scaledHeight;

if (viewportWidth / viewportHeight > aspectRatio) {
    // Screen is wider than aspect ratio, scale to height
    scaledHeight = viewportHeight;
    scaledWidth = scaledHeight * aspectRatio;
} else {
    // Screen is taller than aspect ratio, scale to width
    scaledWidth = viewportWidth;
    scaledHeight = scaledWidth / aspectRatio;
}


document.addEventListener('fullscreenchange', () => {
    isFullscreen = document.fullscreenElement !== null;
    updateButtonVisibility();
});


fullscreenButton.addEventListener('click', () => {
    if (!isFullscreen) {
      canvasContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    isFullscreen = !isFullscreen;
    updateButtonVisibility();
});


function updateButtonVisibility() {
    if (isFullscreen) {
      fullscreenButton.style.display = 'none';
      minscreenButton.style.display = 'block';
      canvas.style.width = `${scaledWidth}px`;
      canvas.style.height = `${scaledHeight}px`;
    } else {
      fullscreenButton.style.display = 'block';
      minscreenButton.style.display = 'none';
      canvas.style.width = `${canvasWidth}px`; 
      canvas.style.height = `${canvasHeight}px`;
    }
  }
  


minscreenButton.addEventListener('click', () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
});


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}


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