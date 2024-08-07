class Boss extends MovableObject {

    world;
    hp = 100;
    currentImage = 0;
    goalRight = false;
    bossIsDead = false;
    walkMinPos;
    walkMaxPos;
    dyingAnimPlayed = false;

    IMAGES_WALKING = [
        "imgs/boss/Boss_01.png",
        "imgs/boss/Boss_02.png",
        "imgs/boss/Boss_03.png",
        "imgs/boss/Boss_04.png",
        "imgs/boss/Boss_05.png",
        "imgs/boss/Boss_06.png",
        "imgs/boss/Boss_07.png",
        "imgs/boss/Boss_08.png",
    ];

    IMAGES_HURT = [
        "imgs/boss/Boss_Hurt_01.png",
        "imgs/boss/Boss_Hurt_02.png",
    ];

    IMAGES_DYING = [
        "imgs/boss/Boss_Dead_01.png",
        "imgs/boss/Boss_Dead_02.png",
        "imgs/boss/Boss_Dead_03.png",
        "imgs/boss/Boss_Dead_04.png",
        "imgs/boss/Boss_Dead_05.png",
        "imgs/boss/Boss_Dead_06.png",
        "imgs/boss/Boss_Dead_07.png",
        "imgs/boss/Boss_Dead_08.png",
        "imgs/boss/Boss_Dead_09.png",
    ];

    IMAGES_DEAD = [
        "imgs/boss/Boss_Dead_09.png",
    ];


    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;
        this.y = 140
        this.width = 256;
        this.height = 256;

        this.walkMinPos = 10; //1600
        this.walkMaxPos = 2400;

        this.bossIsDead = false;
        this.world = world;
        console.log('Boss constructor:', world);

        this.animate();
    }


    checkDirection() {
        if (!this.bossIsDead) {
            if (this.x < this.walkMinPos) {
                this.goalRight = true;
            } 
            if (this.x > this.walkMaxPos) {
                this.goalRight = false;  
            }
    
            if (this.goalRight == true) {
                this.x += 10;
                this.otherDirection = true;
            }
            else if (this.goalRight == false) {
                this.x -= 10;
                this.otherDirection = false;
            } 
                this.playAnimation(this.IMAGES_WALKING);
        } else if (this.bossIsDead && !this.dyingAnimPlayed){
            this.playAnimation(this.IMAGES_DYING);
            this.dyingAnimPlayed = true;
        }
    }


    animate() {
        setInterval(() => {
            if (world && world.bossAggro) {
                this.checkDirection();
            }     
        }, 1000/10);  
    }

    
    dead(path, enemy) {
        this.hp -= 20;
        this.playAnimation(this.IMAGES_HURT);

        if (this.hp <= 0) {
            this.bossIsDead = true;
            world.bossAggro = false; 
            world.isAttacking = false; 
            world.boss.bossIsDead = true;
            
            setTimeout(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 1000);

            setTimeout(() => {
                path.splice(enemy, 1);
                this.loadWinScreen();
            }, 2000);
        }
    }

    
    loadWinScreen() {
        window.location = "win-screen.html";
    }

}