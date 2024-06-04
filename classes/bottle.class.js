class Bottle extends MovableObject {

    currentImage = 0;
    pickedUp = false;

    
    IMAGES_IDLE = [
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_03.png",
        "imgs/bottle/Bottle_Idle_03.png",
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_01.png",
        "imgs/bottle/Bottle_Idle_04.png",
        "imgs/bottle/Bottle_Idle_01.png",
        "imgs/bottle/Bottle_Idle_04.png",
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_03.png",
        "imgs/bottle/Bottle_Idle_03.png",
        "imgs/bottle/Bottle_Idle_02.png",
        "imgs/bottle/Bottle_Idle_02.png",
    ];

    
    constructor() {
        super().loadImage("imgs/bottle/Bottle_Idle_01.png");
        this.loadImages(this.IMAGES_IDLE);
        this.x = 300;
        this.y = 350;
        this.width = 50;
        this.height = 50;
        this.animate();
    }


    animate() {
        setInterval(() => {            
            this.playAnimation(this.IMAGES_IDLE);
        }, 1000/10);     
    }


    defineStartingPos() {
        this.x += 300;
    }
}