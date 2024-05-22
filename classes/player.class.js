class Player extends MovableObject {
    world;
    speed;

    IMAGES_WALKING = [
        "img/2_player/2_walk/W-21.png",
        "img/2_player/2_walk/W-22.png",
        "img/2_player/2_walk/W-23.png",
        "img/2_player/2_walk/W-24.png",
        "img/2_player/2_walk/W-25.png",
        "img/2_player/2_walk/W-26.png",
    ];

    IMAGES_IDLE = [
        "img/2_player/1_idle/idle/I-1.png",
        "img/2_player/1_idle/idle/I-2.png",
        "img/2_player/1_idle/idle/I-3.png",
        "img/2_player/1_idle/idle/I-4.png",
        "img/2_player/1_idle/idle/I-5.png",
        "img/2_player/1_idle/idle/I-6.png",
        "img/2_player/1_idle/idle/I-7.png",
        "img/2_player/1_idle/idle/I-8.png",
        "img/2_player/1_idle/idle/I-9.png",
        "img/2_player/1_idle/idle/I-10.png"
    ];

    currentImage = 0;


    constructor() {
        super().loadImage("img/2_player/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = 20;
        this.y = 330;
        this.height = 100;
        this.width = 60;
        this.speed = 2;

        this.animate();
    }


    animate() {
        setInterval(() => {
            // movement
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            } 

            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000/60);     

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // iterate thru array and % each index until the result is 0
                let m = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[m];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

        }, 1000/10);     
    }


    jump() {

    }
}