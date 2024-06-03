class Bg extends MovableObject {


    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.height = 4096;
        this.width = 4096;
        this.x = x;
        this.y = y;
        console.log("x:" + x,"y:" + y);
        // this.y = 780 - this.height;
        this.parallax();
        this.path = imagePath;
    }


    parallax() {
        setInterval(() => {
            if (this.moveBgLeft) {
                if(this.y == -3136 && this.x <= 0) {this.moveBGLeft(2);} // desert
                if(this.y == -2656 && this.x <= 0) {this.moveBGLeft(1.5);} // mountains
                if(this.y == -2176 && this.x <= 0) {this.moveBGLeft(1);} // clouds
            } 

            if (this.moveBgRight) {
                if(this.y == -3136 && this.x < 0) {this.moveBGRight(2);} // desert
                if(this.y == -2656 && this.x < 0) {this.moveBGRight(1.5);} // mountains
                if(this.y == -2176 && this.x < 0) {this.moveBGRight(1);} // clouds
            } 
        }, 1000/60);        
    }


    moveBGLeft(bgSpeed) {
        this.x -= bgSpeed;
    }


    moveBGRight(bgSpeed) {
        this.x += bgSpeed;
    }
}