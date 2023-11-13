class StatusBarEndboss extends DrawableObject {

    IMAGES_ENDBOSSHEALTH = [
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSHEALTH);
        this.x = 540;
        this.y = 0;
        this.width = 170;
        this.height = 50;
        this.setPercentage(100);
    }


    // setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSHEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 80) {
            return 3;
        } else if (this.percentage > 60) {
            return 2;
        } else if (this.percentage > 40) {
            return 1;
        } else {
            return 0;
        }
    }
}



