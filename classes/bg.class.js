class Bg extends MovableObject {


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.speed = 7;
        this.height = 480;
        this.width = 721;
        this.x = x;
        this.y = 480 - this.height;
        this.animate();
        this.path = imagePath;
    }


    animate() {
        setInterval(() => {
            if (this.moveBgLeft) {
                if(this.path === "img/5_background/layers/3_third_layer/1.png") {
                    this.moveBGLeft();  
                }
            } 

            if (this.moveBgRight) {
                this.moveBGRight();  
            } 
        }, 1000/60);        
    }


    moveBGLeft() {
        this.x -= this.speed;
    }


    moveBGRight() {
        this.x += this.speed;
    }
}