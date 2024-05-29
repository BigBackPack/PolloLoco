class Boss extends MovableObject {

    hp = 100;
    currentImage = 0;
    goalRight = false;
    isDead = false;

    walkMinPos;
    walkMaxPos;


    IMAGES_WALKING = [
        "img/4_boss/1_walk/G2.png",
        "img/4_boss/1_walk/G3.png",
        "img/4_boss/1_walk/G4.png",
        "img/4_boss/2_alert/G5.png",
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2200;
        this.y = 240
        this.width = 200;
        this.height = 200;

        this.walkMinPos = 1600;
        this.walkMaxPos = 2400;

        this.animate();
    }


    checkDirection() {
        if (this.x < this.walkMinPos) {
            this.goalRight = true;
        } 
        if (this.x > this.walkMaxPos) {
            this.goalRight = false;  
        }

        if (this.goalRight == true) {
            this.x += 10;
            this.otherDirection = true;
        }
        else if (this.goalRight == false) {
            this.x -= 10;
            this.otherDirection = false;
        } 

        this.playAnimation(this.IMAGES_WALKING);
    }


    animate() {
        setInterval(() => {            
            this.checkDirection();
        }, 1000/10);     
    }


    dead(path, enemy) {
        this.hp -= 20;

        if (this.hp > 0) {
            console.log(this.hp);
        } else {
            this.x = -100;
            this.y = -100;
            this.width = 0;
            this.height = 0; 
            window.location = "win-screen.html";
        }
    }
}