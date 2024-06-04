class BottleCount extends DrawableObject {

    bottleCount = 0;
    currentImage = 0;


    IMAGES = [
        "imgs/bottle/Bottle_Throw_01.png",   
    ]

    constructor() {
        super().loadImage("imgs/bottle/Bottle_Throw_01.png");
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
    }


    increaseBottleCount() {
        return this.bottleCount ++;
    }


    decreaseBottleCount() {
        return this.bottleCount --;
    }


    displayBottelCountText = (ctx) => { 
        ctx.font = "32px Pixelify Sans";
        ctx.fillStyle = "white";
        ctx.fillText(": " + this.bottleCount, 56, 106);
    }
    
}