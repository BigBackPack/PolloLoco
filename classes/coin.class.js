class Coin extends MovableObject {

    currentImage = 0;
    pickedUp = false;
    randomHeightPos = Math.random() * 200;


    IMAGES_IDLE = [
        "imgs/coin/Coin_01.png",
        "imgs/coin/Coin_02.png",
        "imgs/coin/Coin_03.png",
        "imgs/coin/Coin_04.png",
        "imgs/coin/Coin_05.png",
        "imgs/coin/Coin_06.png",
        "imgs/coin/Coin_07.png",
    ];

    constructor() {
        super().loadImage("imgs/coin/Coin_01.png");
        this.loadImages(this.IMAGES_IDLE);
        this.x = 300;
        this.y = 50 + this.randomHeightPos;
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