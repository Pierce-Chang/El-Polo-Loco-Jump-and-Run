class BackgroundObject extends MoveableObject {

    width= 720;
    height= 480;

    /**
     * Constructs a new BackgroundObject.
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The x position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    };
}