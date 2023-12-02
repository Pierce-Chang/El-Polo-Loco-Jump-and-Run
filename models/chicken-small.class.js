class ChickenSmall extends MoveableObject {

    height = 60;
    width = 60;
    y = 360;

    /**
     * Offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };

    /**
     * Images for the walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /**
     * Images for the dead animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    /**
     * Constructs a new ChickenSmall object, loads images and starts the animation.
     * @param {number} x - The initial x-coordinate for the chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * Indicates if the death sound has been played.
     * @type {boolean}
     */
    isDeadSoundPlayed = false;

    /**
     * Animates the ChickenSmall object based on its current state.
     * This function is called at a regular interval.
     */
    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            } 
        }, 1000 / 30); //30 frames per second

        setInterval(() => {
            if (this.isDead()) {
                if (!this.isDeadSoundPlayed) {
                    playAudio("smallChickenHit")
                    this.isDeadSoundPlayed = true;
                }
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}