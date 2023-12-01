class StatusBarEndboss extends DrawableObject {

    /**
     * Images for the end boss health status bar.
     * @type {Array<string>}
     */
    IMAGES_ENDBOSSHEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * The current percentage of end boss health.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs a new StatusBarEndboss object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSHEALTH);
        this.x = 540;
        this.y = 0;
        this.width = 170;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of end boss health and updates the image accordingly.
     * @param {number} percentage - The new percentage of end boss health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSHEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        if (this.percentage < 0) {
            this.percentage = 0;
        }
    }

    /**
     * Resolves the index of the image to use based on the current percentage of end boss health.
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else if (this.percentage <= 0){
            return 0;
        }
    }
}