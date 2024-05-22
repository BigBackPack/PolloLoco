class World {
    ctx;
    player = new Player();
    sky = new Sky();
    keyboard;
    camPosX = 0;
    bgs = level01.bgs;
    clouds = level01.clouds;
    enemies = level01.enemies;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.player.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camPosX, 0);
    
        // this.ctx.drawImage(this.sky.img, this.sky.x, this.sky.y, this.sky.width, this.sky.height);

        this.addObjectsToMap(this.bgs);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.player);

        this.ctx.translate(-this.camPosX, 0);

        let self = this; //this" is not accepted within the next function
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}