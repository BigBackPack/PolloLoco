class World {
    ctx;
    player = new Player();
    boss;
    bottleIcon = new BottleIcon();
    coinIcon = new CoinIcon();
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
    bossTriggered = false;
    bossAggro = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.boss = new Boss(this);

        console.log('World constructor:', this.boss.world);

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
    }


    setWorld() {
        this.player.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.throwObjects();
            this.checkPlayerPosition();
        }, 1000/200);
    }


    checkPlayerPosition() {
        if (this.player.x > 1200 && !this.bossAggro) {
            this.triggerBoss();
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.player.isColliding(enemy)) {
                if (this.isPlayerAboveEnemy(this.player, enemy) 
                    && this.player.jumpPeak
                    && !(enemy instanceof Boss)) {
                    enemy.dead(this.level.enemies, enemy);
                    this.player.jumpPeak = false; 
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

            if (egg.y > 350) {
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
        const playerBottom = player.y + player.height;
        const enemyTop = enemy.y;
        const enemyMiddleY = enemy.y + enemy.height / 2;
    
        const isAbove = playerBottom <= enemyMiddleY;
        const isHorizontallyAligned = (
            player.x + player.width > enemy.x && 
            player.x < enemy.x + enemy.width
        );
    
        return isAbove && isHorizontallyAligned;
    }

   
    throwObjects() {
        if(this.keyboard.THROW && this.keyboard.isShooting == false
        && this.bottleCount.bottleCount > 0) {
            if (!soundMuted) {
                this.throwSound.play();
            }          
            let bottle = new ThrowableObject(this.player.x + this.player.width/2, this.player.y + this.player.height - 64, this.player);
            this.throwableObjects.push(bottle);
            this.keyboard.isShooting = true;
            this.bottleCount.decreaseBottleCount();
        }
    }


    triggerBoss() {
        document.getElementById("canvas").style.backgroundColor = "#ffd900";
        this.bossTriggered = true;
        this.bossAggro = true;
        this.bossAttack();
    }


    bossAttack() {
        if (!this.isAttacking && !this.boss.bossIsDead) {
            this.isAttacking = true;
            this.eggAttack();
            setTimeout(() => {
                this.isAttacking = false;
                if (this.bossAggro && !this.boss.bossIsDead) {
                    this.bossAttack();
                }
            }, 2000);
        }
    }


    eggAttack() {
        if (this.isAttacking && !this.boss.bossIsDead) {
            let egg = new Egg(this.boss.x + this.boss.width / 2, this.boss.y + this.boss.height / 2, this.boss);
            this.eggs.push(egg);
        }
    }


    onBossDeath() {
        this.bossAggro = false; 
        this.isAttacking = false; 
        this.boss.bossIsDead = true;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camPosX, 0);

        this.addObjectsToMap(this.level.bgs);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.eggs);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.player);

        this.ctx.translate(-this.camPosX, 0);
        // fixed objects space start
        this.addToMap(this.statusBar);
        if (this.bossTriggered == true) {
            this.addToMap(this.bossHpBar);
        }
        this.addToMap(this.bottleIcon);
        this.addToMap(this.coinIcon);
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