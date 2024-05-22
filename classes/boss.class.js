class Boss extends MovableObject {

    currentImage = 0;

    IMAGES_WALKING = [
        "img/4_boss/2_alert/G5.png",
        "img/4_boss/1_walk/G2.png",
        "img/4_boss/1_walk/G3.png",
        "img/4_boss/1_walk/G4.png",
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2200;
        this.y = 240
        this.width = 200;
        this.height = 200;
        this.animate();
    }


    animate() {
        setInterval(() => {            
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000/10);     
    }
}