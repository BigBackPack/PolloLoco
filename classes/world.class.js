class World {
    ctx;
    player = new Player();
    sky = new Sky();
    keyboard;

    bgs = [
        new Bg("img/5_background/layers/3_third_layer/1.png", 0),
        new Bg("img/5_background/layers/3_third_layer/2.png", 720),
        new Bg("img/5_background/layers/2_second_layer/1.png", 0),
        new Bg("img/5_background/layers/2_second_layer/2.png", 720),
        new Bg("img/5_background/layers/1_first_layer/1.png", 0),
        new Bg("img/5_background/layers/1_first_layer/2.png", 720),
    ];

    clouds = [
        new Cloud()
    ];

    enemies = [
        new Npc(),
        new Npc(),
        new Npc()
    ];
    

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
        
        this.ctx.drawImage(this.sky.img, this.sky.x, this.sky.y, this.sky.width, this.sky.height);

        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.bgs);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.player);

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