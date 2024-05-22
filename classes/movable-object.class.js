class MovableObject {
    x;
    y;
    height;
    width;
    img;
    speed;
    otherDirection = false;
    imageCache = [];
    gravity = 0;
    fallSpeed = 1;


    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.gravity > 0 ) {
                this.y -= this.gravity;
                this.gravity -= this.fallSpeed;
            }
        }, 1000/60);
    }


    aboveGround() {
        return this.y < 280;
    }


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
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    jump() {
        this.gravity = 20; 
    }


    playAnimation(images) {
        // iterate thru the aray and % each index until the result is 0
        let m = this.currentImage % images.length;
        let path = images[m];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}