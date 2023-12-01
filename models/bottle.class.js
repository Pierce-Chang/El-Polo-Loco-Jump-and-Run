class Bottle extends MoveableObject {
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 80;

    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 80;

    /**
     * The y-coordinate of the bottle.
     * @type {number}
     */
    y = 340;

    /**
     * The x-coordinate of the bottle.
     * @type {number}
     */
    x = 200;

    /**
     * Offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 10,
        left: 20,
        right: 40,
        bottom: 10,
    };

    /**
     * Images for the bottle.
     * @type {Array<string>}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructs a new Bottle object, loads images, and starts the animation.
     * @param {number} x - The initial x-coordinate of the bottle.
     */
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = x + Math.random() * 700;
        this.y = 340;

        this.animate();
    }

    /**
     * Starts the animation for the bottle.
     * The bottle's image is set to a random image from IMAGES_BOTTLE.
     */
    animate() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.img = this.imageCache[this.IMAGES_BOTTLE[randomIndex]];
    }
}