class Coin extends MovableObject {

    currentImage = 0;
    pickedUp = false;


    IMAGES_IDLE = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png",
    ];

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_IDLE);
        this.x = 300;
        this.y = 170;
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
        this.x += 200;
    }
}