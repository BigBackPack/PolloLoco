class Bottle extends MovableObject {

    currentImage = 0;

    
    IMAGES_IDLE = [
        "img/6_ammo/1_salsa_bottle_on_ground.png",
    ];

    constructor() {
        super().loadImage("img/6_ammo/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_IDLE);
        this.x = 300;
        this.y = 370;
        this.width = 50;
        this.height = 50;
        this.animate();
    }


    animate() {
        setInterval(() => {            
            this.playAnimation(this.IMAGES_IDLE);
        }, 1000/10);     
    }
}