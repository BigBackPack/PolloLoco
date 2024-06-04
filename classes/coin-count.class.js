class CoinCount extends DrawableObject {

    coinCount = 0;


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
    }


    increaseCoinCount() {
        return this.coinCount ++;
    }


    decreaseCoinCount() {
        return this.coinCount --;
    }


    displayCoinCountText = (ctx) => { 
        ctx.font = "32px Pixelify Sans";
        ctx.fillStyle = "white";
        ctx.fillText(": " + this.coinCount, 56, 156);
    }
}