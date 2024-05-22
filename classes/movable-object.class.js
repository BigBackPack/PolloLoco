class MovableObject {
    x;
    y;
    height;
    width;
    img;
    speed;
    otherDirection = false;
    imageCache = [];


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        console.log("moving right!");
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); //60 fps
    }
}