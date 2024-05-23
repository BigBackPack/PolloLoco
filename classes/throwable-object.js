class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage("img/6_ammo/bottle_rotation/1_bottle_rotation.png");
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }


    throw() {
        this.speed = 10;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 1000/60);
    }
}