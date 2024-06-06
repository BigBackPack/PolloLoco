class JumpingNpc extends MovableObject {
  
    x;
    y;
    height;
    width;
    randomStartPos = Math.random() * 500;
    speed = Math.random() + 0.5;
    currentImage = 0;
    goalRight = false;
    isDead = false;

    chickenHurtSound = new Audio("audio/chicken.ogg");

    walkMinPos;
    walkMaxPos;
    
    
    IMAGES_WALKING = [
        "imgs/chicken/Chicken_Run_01.png",
        "imgs/chicken/Chicken_Run_02.png",
        "imgs/chicken/Chicken_Run_03.png",
        "imgs/chicken/Chicken_Run_04.png",
        "imgs/chicken/Chicken_Run_05.png",
        "imgs/chicken/Chicken_Run_06.png",
    ];

    IMAGES_DEAD = [
        "img/3_npc/chicken_normal/2_dead/dead.png"
    ];


    constructor() {
        super().loadImage("imgs/chicken/Chicken_Run_01.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + this.randomStartPos;
        this.y = 290;
        this.height = 128;
        this.width = 128;

        this.walkMinPos = 0;
        this.walkMaxPos = 400;

        this.animate();
    }


    checkDirection() {
        if (this.x < 0) {
            this.goalRight = true;
        } 
        if (this.x > 700) {
            this.goalRight = false;  
        }

        if (this.goalRight == true) {
            this.x += 3;
            this.otherDirection = true;
        }
        else if (this.goalRight == false) {
            this.x -= 3;
            this.otherDirection = false;
        } 

        this.playAnimation(this.IMAGES_WALKING);
    }

    
    animate() {
        setInterval(() => {
            this.checkDirection();
        }, 1000 / 20); //60 fps    
    }


    dead(path, enemy) {
        if (!soundMuted) {
            this.chickenHurtSound.play();
        }
        this.x = -100;
        this.y = -100;
        this.width = 0;
        this.height = 0; 
    }
}