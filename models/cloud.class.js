class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 350;

    /**
     * Constructs a new Cloud object, loads an image and starts the animation.
     * @param {number} x - The initial x-coordinate for the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = x + Math.random() * 200;
        this.animate();
    }

    /**
     * Animates the Cloud object by moving it to the left.
     * This function is called at a regular interval.
     */
    animate() {
        setInterval (() => {
            this.moveLeft();
        }, 80)
    }
}