class Npc extends MovableObject {
  
    randomStartPos = Math.random() * 500;
    x;
    y;
    height;
    width;
    speed = Math.random() + 0.5;
    currentImage = 0;
    
    IMAGES_WALKING = [
        "img/3_npc/chicken_normal/1_walk/1_w.png",
        "img/3_npc/chicken_normal/1_walk/2_w.png",
        "img/3_npc/chicken_normal/1_walk/3_w.png"
    ];

    IMAGES_DEAD = [
        "img/3_npc/chicken_normal/2_dead/dead.png"
    ];


    constructor() {
        super().loadImage("img/3_npc/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + this.randomStartPos;
        this.y = 390;
        this.height = 40;
        this.width = 40;

        this.animate();
    }

    
    animate() {
        this.moveLeft();

        setInterval(() => {
            // iterate thru the aray and % each index until the result is 0
            let m = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[m];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000/10);     
    }
}