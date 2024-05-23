let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}


window.addEventListener("keydown", (event) => {
    if(event.key == "a"){
        keyboard.LEFT = true;
    } 
    if (event.key == "d") {
        keyboard.RIGHT = true;
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
    } 
});