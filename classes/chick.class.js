class Chick extends MovableObject {

    x;
    y;
    height;
    width;
    randomStartPos = Math.random() * 1300;
    speed = (Math.random() * 4) + 1;
    currentImage = 0;
    goalUp = false;
    isDead = false;

    chickenHurtSound = new Audio("audio/chicken.ogg");
    
    
    IMAGES_BOUNCE = [
        "imgs/chick/chick_idle_1.png",
        "imgs/chick/chick_idle_2.png",
        "imgs/chick/chick_idle_3.png",
        "imgs/chick/chick_idle_4.png",
        "imgs/chick/chick_idle_5.png",
        "imgs/chick/chick_idle_6.png",
        "imgs/chick/chick_idle_5.png",
        "imgs/chick/chick_idle_4.png",
        "imgs/chick/chick_idle_3.png",
        "imgs/chick/chick_idle_2.png",
    ];

    constructor() {
        super().loadImage("imgs/chick/chick_idle_1.png");
        this.loadImages(this.IMAGES_BOUNCE);

        this.x = 200 + this.randomStartPos;
        this.y = 340;
        this.height = 64;
        this.width = 64;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.bounceBehaviour()
        }, 1000 / 20); //20 fps    
    }
    

    bounceBehaviour() {
        if (this.y > 340) {
            this.goalUp = true;
        } 
        if (this.y < 100) {
            this.goalUp = false;  
        }

        if (this.goalUp == true) {
            this.y -= 3 * this.speed;
            this.otherDirection = true;
        }
        else if (this.goalUp == false) {
            this.y += 3 * this.speed;
            this.otherDirection = false;
        } 
        this.playAnimation(this.IMAGES_BOUNCE);
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