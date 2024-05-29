class MovableObject extends DrawableObject {
    speed;
    gravity = 0;
    fallSpeed = 1;
    health;
    lastHit = 0;
    otherDirection = false;

    hurtSound = new Audio("audio/hurt.ogg");


    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.gravity > 0 ) {
                this.y -= this.gravity;
                this.gravity -= this.fallSpeed;
            }
        }, 1000/60);
    }


    aboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 280;
    }



// collision handeling
    isColliding(mo) {
        return this.x + this.width > mo.x 
            && this.y + this.height > mo.y 
            && this.x < mo.x 
            && this.y < mo.y + mo.height;
    }


// basic controlls
    getFacingDirection() {
        return this.otherDirection;
    }


   moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    jump() {
        this.gravity = 20; 
    }


    playAnimation(images) {
        // iterate thru the aray and % each index until the result is 0
        let m = this.currentImage % images.length;
        let path = images[m];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    hit() {
        this.health -= 2;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.hurtSound.play();
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; //from msec to sec
        return timePassed < 0.2;
    }


    isDead() {
        return this.health == 0;
    }
}