class Egg extends MovableObject {
    
    world;
    currentImage = 0;


    IMAGES = [
        "imgs/Egg/Egg_Attack_1.png",
        "imgs/Egg/Egg_Attack_2.png",
    ]


    constructor(x, y, boss) {
        super().loadImage("imgs/Egg/Egg_Attack_1.png");
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.height = 64;
        this.width = 64;


        if (boss) {
            this.otherDirection = boss.otherDirection;
        }

        if(this.otherDirection) {
            this.throw(-5);
        } else {
            this.throw(5);
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