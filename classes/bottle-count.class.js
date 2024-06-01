class BottleCount extends DrawableObject {

    bottleCount = 10;


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


    increaseBottleCount() {
        return this.bottleCount ++;
    }


    decreaseBottleCount() {
        return this.bottleCount --;
    }


    displayBottelCountText = (ctx) => { 
        ctx.font = "24px Pixelify Sans";
        ctx.fillStyle = "white";
        ctx.fillText("SALSA:" + this.bottleCount, 30, 40);
    }
    
}