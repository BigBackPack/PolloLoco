class BossHpBar extends DrawableObject {

    IMAGES = [
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_01.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_02.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_03.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_04.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_05.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_06.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_07.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_08.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_09.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_10.png",
        "imgs/ui/boss_hp_bar/HP_Bar_Boss_11.png",

    ]

    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 440;
        this.y = 20;
        this.height = 128;
        this.width = 256;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if(this.percentage == 100) {
            return 10;
        } else if (this.percentage >= 90) {
            return 9;
        } else if (this.percentage >= 80) {
            return 8;
        } else if (this.percentage >= 70) {
            return 7;
        } else if (this.percentage >= 60) {
            return 6;
        } else if (this.percentage >= 50) {
            return 5;
        } else if (this.percentage >= 40) {
            return 4;
        } else if (this.percentage >= 30) {
            return 3;
        } else if (this.percentage >= 20) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}