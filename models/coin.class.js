class Coin extends MoveableObject {
    height = 100
    width = 100

    /**
     * Offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 20,
        left: 20,
        right: 40,
        bottom: 40,
    };

    /**
     * Images for the coin animation.
     * @type {Array<string>}
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    /**
     * Constructs a new Coin object, loads images and starts the animation.
     * @param {number} x - The x-coordinate for the coin.
     * @param {number} y - The y-coordinate for the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Audio for the coin collection.
     * @type {Audio}
     */
    collectcoin = new Audio('audio/collectcoin.mp3');

    /**
     * Animates the Coin object.
     * This function is called at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}
