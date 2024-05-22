let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    console.log(world.enemies);
    console.log(world.player);
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
});