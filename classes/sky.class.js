class Sky extends MovableObject {

    constructor(imagePath, x, y) {
        super().loadImage("imgs/bgs/BG_1024px.png");
        // super().loadImage(imagePath);

        this.x = 0;
        this.y = 0;
        this.height = 700;
        this.width = 720;
    }
}