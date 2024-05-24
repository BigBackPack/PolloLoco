class Player extends MovableObject {
    world;
    speed;
    camStartBoundery = 300;
    camEndBoundery = 2300;
    walkingSound = new Audio("audio/running.ogg")
    health = 100;

    jumpPeak = false;


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
    
    IMAGES_JUMP = [
        "img/2_player/3_jump/J-31.png",
        "img/2_player/3_jump/J-32.png",
        "img/2_player/3_jump/J-33.png",
        "img/2_player/3_jump/J-34.png",
        "img/2_player/3_jump/J-35.png",
        "img/2_player/3_jump/J-36.png",
        "img/2_player/3_jump/J-37.png",
        "img/2_player/3_jump/J-38.png",
        "img/2_player/3_jump/J-39.png",
    ];

    IMAGES_DEAD = [
        "img/2_player/5_dead/D-51.png",
        "img/2_player/5_dead/D-52.png",
        "img/2_player/5_dead/D-53.png",
        "img/2_player/5_dead/D-54.png",
        "img/2_player/5_dead/D-55.png",
        "img/2_player/5_dead/D-56.png",
        "img/2_player/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "img/2_player/4_hurt/H-41.png",
        "img/2_player/4_hurt/H-42.png",
        "img/2_player/4_hurt/H-43.png",
    ];

    currentImage = 0;


    constructor() {
        super().loadImage("img/2_player/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);

        this.x = 20;
        this.y = 280;
        this.height = 150;
        this.width = 80;
        this.speed = 2;
        this.applyGravity();

        this.animate();
        this.checkJumpPeak();
    }


    checkJumpPeak() {
        setInterval(() => {
            if(this.y < 180) {
                this.jumpPeak = true;
            }
        }, 1000/60);
    }


    animate() {
        setInterval(() => {
            // movement
            this.walkingSound.pause();

            if (this.world.keyboard.RIGHT && this.x < 2650) {
                this.moveRight();
                this.walkingSound.play();
            } 

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walkingSound.play();
            }

            if(this.x > this.camStartBoundery && this.x < this.camEndBoundery) {
                this.world.camPosX = -this.x + this.camStartBoundery;
            }

            if(this.world.keyboard.JUMP && !this.aboveGround()) {
                this.jump(); 
            }
        }, 1000/60);     

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.aboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.jumpPeak = false;
            }
            
        }, 1000/10);     
    }
}