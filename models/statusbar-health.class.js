class StatusBarHealth extends DrawableObject {
/**
 * Images for the health status bar.
 * @type {Array<string>}
 */
IMAGES_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
];

/**
 * The current percentage of health.
 * @type {number}
 */
percentage = 100;

/**
 * Constructs a new StatusBarHealth object.
 */
constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 10;
    this.y = 0;
    this.width = 170;
    this.height = 50;
    this.setPercentage(100);
    this.percentage;
}

/**
 * Sets the percentage of health and updates the image accordingly.
 * @param {number} percentage - The new percentage of health.
 */
setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
}

/**
 * Resolves the index of the image to use based on the current percentage of health.
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



