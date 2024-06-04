class CoinIcon extends DrawableObject{

    IMAGES = [
        "imgs/ui/Coin_Icon_01.png",
    ]


    constructor() {
        super();
        this.img = new Image();
        this.img.src = this.IMAGES[0];
        this.x = 20;
        this.y = 130;
        this.height = 32;
        this.width = 32;
    }
}