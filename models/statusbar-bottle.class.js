class StatusBarBottle extends DrawableObject {

    /**
     * Images for the bottle status bar.
     * @type {Array<string>}
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * The current percentage of bottle.
     * @type {number}
     */
    percentage = 0;

    /**
     * Constructs a new StatusBarBottle object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 10;
        this.y = 80;
        this.width = 170;
        this.height = 50;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of bottle and updates the image accordingly.
     * @param {number} percentage - The new percentage of bottle.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to use based on the current percentage of bottle.
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage >= 20 && this.percentage < 40) {
            return 1;
        } else if (this.percentage >= 40 && this.percentage < 60) {
            return 2;
        } else if (this.percentage >= 60 && this.percentage < 80) {
            return 3;
        } else if (this.percentage >= 80 && this.percentage < 100) {
            return 4;
        } else if (this.percentage >= 100) {
            return 5;
        }
    }
}

