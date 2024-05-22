class Bg extends MovableObject {

    constructor(imagePath, x) {
        super().loadImage(imagePath);

        this.height = 400;
        this.width = 720;
        this.x = x;
        this.y = 480 - this.height;
    }
}