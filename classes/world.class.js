class World {
    ctx;
    player = new Player();
    statusBar = new StatusBar();
    sky = new Sky();
    throwableObjects = [];
    keyboard;
    camPosX = 0;
    level = level01;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.player.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.throwObjects();        
        }, 1000/60);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.player.isColliding(enemy)) {
                console.log("col");
                this.player.hit();
                this.statusBar.setPercentage(this.player.health);
            };
        });
    }


    throwObjects() {
        if(this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.player.x + this.player.width, this.player.y + this.player.height/2);
            this.throwableObjects.push(bottle);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camPosX, 0);

        this.addObjectsToMap(this.level.bgs);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.player);

        this.ctx.translate(-this.camPosX, 0);
        // fixed objects space start
        this.addToMap(this.statusBar);
        // fixed objects space end
        this.ctx.translate(this.camPosX, 0);

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
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawCollider(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}