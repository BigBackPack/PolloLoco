class Player extends MovableObject {
    world;
    speed;
    camStartBoundery = 300;
    camEndBoundery = 2300;
    walkingSound = new Audio("audio/running.ogg");
    jumpSound = new Audio("audio/jump.ogg");
    pickupSound = new Audio("audio/pickup.ogg");
    pickupCoinSound = new Audio("audio/coin.ogg");
    health = 100;

    jumpPeak = false;


    IMAGES_WALKING = [
        "imgs/player/Player_Run_01.png",
        "imgs/player/Player_Run_02.png",
        "imgs/player/Player_Run_03.png",
        "imgs/player/Player_Run_04.png",
        "imgs/player/Player_Run_05.png",
    ];

    IMAGES_IDLE = [
        "imgs/player/Player_Idle_01.png",
        "imgs/player/Player_Idle_02.png",
        "imgs/player/Player_Idle_03.png",
        "imgs/player/Player_Idle_04.png",
        "imgs/player/Player_Idle_05.png",
        "imgs/player/Player_Idle_06.png",
    ];
    
    IMAGES_JUMP = [
        "imgs/player/Player_Jump_01.png",
        "imgs/player/Player_Jump_02.png",
        "imgs/player/Player_Jump_03.png",
        "imgs/player/Player_Jump_03.png",
        "imgs/player/Player_Jump_03.png",
        "imgs/player/Player_Jump_03.png",
        "imgs/player/Player_Jump_03.png",
    ];

    IMAGES_DEAD = [
        "imgs/player/Player_Dead_01.png",
        // "imgs/2_player/5_dead/D-52.png",
        // "imgs/2_player/5_dead/D-53.png",
        // "imgs/2_player/5_dead/D-54.png",
        // "imgs/2_player/5_dead/D-55.png",
        // "imgs/2_player/5_dead/D-56.png",
        // "imgs/2_player/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "imgs/player/Player_Hurt_01.png",
        "imgs/player/Player_Hurt_02.png",
    ];

    IMAGES_THROW = [
        "imgs/player/Player_Throw_01.png",
    ];

    currentImage = 0;


    constructor() {
        super().loadImage("imgs/player/Player_Idle_01.png",);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_THROW);

        this.x = 20;
        this.y = 340;
        this.height = 64;
        this.width = 64;
        this.speed = 7;
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
            this.bossTriggerPos();

            if (this.world.keyboard.RIGHT && this.x < 2650) {
                this.moveRight();
                this.walkingSound.pause();
                if (!soundMuted) {
                    this.walkingSound.play();
                }
            } 

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walkingSound.pause();
                if (!soundMuted) {
                    this.walkingSound.play();
                }            
            }

            if(this.x > this.camStartBoundery && this.x < this.camEndBoundery) {
                this.world.camPosX = -this.x + this.camStartBoundery;
            }

            if(this.world.keyboard.JUMP && !this.aboveGround()) {
                this.jump(); 
                this.jumpSound.pause();
                if (!soundMuted) {
                    this.jumpSound.play();
                }
            }
        }, 1000/60);     

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                window.location = "lose-screen.html";
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.aboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else if (this.world.keyboard.isShooting) {
                this.playAnimation(this.IMAGES_THROW);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.jumpPeak = false;
            }   
        }, 1000/10);     
    }


    pickUpBottle(bottle) {
        this.world.bottleCount.increaseBottleCount();
        bottle.height = 0;
        bottle.width = 0;
        if (!soundMuted) {
            this.pickupSound.play();
        }

        setTimeout(function() {
            bottle.height = 50;
            bottle.width = 50;
            bottle.pickedUp = false;
        }, 5000); 
      }


    pickUpCoin(coin) {
        this.world.coinCount.increaseCoinCount();
        if (!soundMuted) {
            this.pickupCoinSound.play();
        }
        coin.height = 0;
        coin.width = 0; 
        coin.pickedUp = true;
    }


    bossTriggerPos() {
        if (this.x > 1200) {
            document.getElementById("canvas").style.backgroundColor = "#ffd900";
            this.world.bossTriggered = true;
        } else {
            document.getElementById("canvas").style.backgroundColor = "#4793AF";
            this.world.bossTriggered = false;
        }
    }
}