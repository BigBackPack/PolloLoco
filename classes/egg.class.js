class Egg extends MovableObject {
    
    world;


    constructor(x, y, boss) {
        super().loadImage("img/8_coin/coin_2.png");
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;

        this.throw(-10);

        if (boss) {
            this.otherDirection = boss.otherDirection;
        }

        if(this.otherDirection) {
            this.throw(-2);
        } else {
            this.throw(2);
        }
    }


    throw(throwDistance) {
        this.speed = 20;
        this.applyEggGravity();

        setInterval(() => {
            this.x += throwDistance;
            world.checkCollisions();

        }, 1000/60);
    }


    removeEgg(path, egg) {
        path.splice(egg, 1); 
    }
}