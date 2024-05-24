class BottleCount extends DrawableObject {

    IMAGES = [
        "img/6_ammo/1_salsa_bottle_on_ground.png",
        
    ]

    constructor() {
        super().loadImage("img/6_ammo/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.animate();
        currentImage = 0;

        this.img = this.IMAGES[0];
    }
}