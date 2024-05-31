class ThrowableObject extends MovableObject {
    
    world;


    constructor(x, y, player) {
        super().loadImage("img/6_ammo/bottle_rotation/1_bottle_rotation.png");
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;

        if (player) {
            this.otherDirection = player.otherDirection;
        }

        if(this.otherDirection) {
            this.throw(-20);
        } else {
            this.throw(20);
        }
    }


    throw(throwDistance) {
        this.speed = 10;
        this.applyGravity();

        setInterval(() => {
            this.x += throwDistance;
            world.checkCollisions();
        }, 1000/60);
    }


    removeBottel(path, bottle) {
        path.splice(bottle, 1); 
    }
}