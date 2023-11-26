class StatusBarEndbossIcon extends DrawableObject {

    IMAGE_ENDBOSSICON = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGE_ENDBOSSICON);
        this.x = 529;
        this.y = 5;
        this.width = 54;
        this.height = 54;
    }
}
