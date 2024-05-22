class Bg extends MovableObject {

    constructor(imagePath, x) {
        super().loadImage(imagePath);

        this.height = 480;
        this.width = 721;
        this.x = x;
        this.y = 480 - this.height;
    }
}