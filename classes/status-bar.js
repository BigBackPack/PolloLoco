class StatusBar extends DrawableObject{

    IMAGES = [
        "imgs/ui/player_hp_bar/HP_Bars_01.png",
        "imgs/ui/player_hp_bar/HP_Bars_02.png",
        "imgs/ui/player_hp_bar/HP_Bars_03.png",
        "imgs/ui/player_hp_bar/HP_Bars_04.png",
        "imgs/ui/player_hp_bar/HP_Bars_05.png",
        "imgs/ui/player_hp_bar/HP_Bars_06.png",
    ]

    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 20;
        this.height = 64;
        this.width = 128;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}