class World {
    ctx;
    player = new Player();
    boss = new Boss();
    statusBar = new StatusBar();
    bossHpBar = new BossHpBar();
    bottleCount = new BottleCount();
    coinCount = new CoinCount();

    sky = new Sky();
    throwableObjects = [];
    eggs = [];
    keyboard;
    camPosX = 0;
    level = level01;

    throwSound = new Audio("audio/throw.ogg");

    isAttacking = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        // Set positions for bottles
        let bottleX = 500;
        this.level.bottles.forEach((bottle, index) => {
            bottle.x = bottleX + index * 500;
        });

         // Set positions for bottles
         let coinX = 300;
         this.level.coins.forEach((coin, index) => {
             coin.x = coinX + index * 200;
         });

        this.bossAttackManager();

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
                if (this.isPlayerAboveEnemy(this.player, enemy) 
                    && (this.player.jumpPeak == true)
                    && (!(enemy instanceof Boss))) {
                        enemy.dead(this.level.enemies, enemy);
                } else {
                    this.player.hit(0.5);
                    this.statusBar.setPercentage(this.player.health);
                }
            }
        });

        this.level.bottles.forEach((bottle) => {
            if (this.player.isColliding(bottle) && bottle.pickedUp == false){
                this.player.pickUpBottle(bottle);
                bottle.pickedUp = true;
            }
        })

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && enemy instanceof Boss){
                    enemy.dead(this.level.enemies, enemy);
                    this.bossHpBar.setPercentage(enemy.hp);
                    bottle.removeBottel(this.throwableObjects, bottle);
                } else if (bottle.isColliding(enemy)) {
                    enemy.dead(this.level.enemies, enemy);
                    bottle.removeBottel(this.throwableObjects, bottle);
                }
            })
        })

        this.eggs.forEach((egg) => {
            if (this.player.isColliding(egg)){
                this.player.hit(20);
                this.statusBar.setPercentage(this.player.health);
                egg.removeEgg(this.eggs, egg);
            }

            if (egg.y > 400) {
                egg.removeEgg(this.eggs, egg);
            }
        })

        this.level.coins.forEach((coin) => {
            if (this.player.isColliding(coin) && coin.pickedUp == false){
                this.player.pickUpCoin(coin);
                coin.pickedUp = true;
            }
        })
    }
    

    // Helper method to check if the player is above the enemy
    isPlayerAboveEnemy(player, enemy) {
        return player.y + player.height <= enemy.y + (enemy.height / 2);
    }
    
   
    throwObjects() {
        if(this.keyboard.THROW && this.keyboard.isShooting == false
        && this.bottleCount.bottleCount > 0) {
            if (!soundMuted) {
                this.throwSound.play();
            }          
            let bottle = new ThrowableObject(this.player.x + this.player.width/2, this.player.y + this.player.height/2, this.player);
            this.throwableObjects.push(bottle);
            this.keyboard.isShooting = true;
            this.bottleCount.decreaseBottleCount();
        }
    }


    eggAttack() {
        if (this.isAttacking == true) {
            let egg = new Egg(this.boss.x + this.boss.width/2, this.boss.y + this.boss.height/2, this.boss);
            this.eggs.push(egg);
        }
    }


    bossAttackManager() {
        if (!this.isAttacking) { // Check if not already attacking
          this.isAttacking = true;
          this.eggAttack();
          setTimeout(() => {
            this.isAttacking = false; // Reset after the attack
            this.bossAttackManager(); // Schedule the next attack
          }, 5000);
        }
    }


    bossAttack() {
        this.isAttacking = false;
        this.bossAttackManager();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camPosX, 0);

        this.addObjectsToMap(this.level.bgs);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);


        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.eggs);
        this.addToMap(this.player);

        this.ctx.translate(-this.camPosX, 0);
        // fixed objects space start
        this.addToMap(this.statusBar);
        this.addToMap(this.bossHpBar);
        this.bottleCount.displayBottelCountText(this.ctx);
        this.coinCount.displayCoinCountText(this.ctx);
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
        // mo.drawCollider(this.ctx);
        
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