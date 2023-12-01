class Chicken extends MoveableObject {

    height = 80;
    width = 80;
    y = 340;

    /**
     * Offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
     * Images for the walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Images for the dead animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Constructs a new Chicken object, loads images and starts the animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 600 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        
        this.animate();
    }

    /**
     * Indicates if the death sound has been played.
     * @type {boolean}
     */
    isDeadSoundPlayed = false;

    /**
     * Animates the Chicken object based on its current state.
     * This function is called at a regular interval.
     */
    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            } 
        }, 1000 / 30);

        setInterval(() => {
            if (this.isDead()) {
                if (!this.isDeadSoundPlayed) {
                    playAudio("chickenHit")
                    this.isDeadSoundPlayed = true;
                }
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.isDeadSoundPlayed = false;
            }
        }, 200);
    }
}

