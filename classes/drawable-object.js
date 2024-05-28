class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = [];
    currentImage;


    constructor() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    
    drawCollider(ctx) {
        if(this instanceof Player || this instanceof Npc 
        || this instanceof Boss || this instanceof Bottle
        || this instanceof ThrowableObject || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "tomato";
            ctx.roundRect(this.x , this.y, this.width , this.height, 60);
            ctx.stroke()
        }
    }


    displayBottelCountText(ctx, bottleCount) {
        let newBottleCount = this.increaseBottleCount();
        ctx.font = "24px serif";
        ctx.fillText("SALSA:"+ bottleCount, 30, 40);
    }
}