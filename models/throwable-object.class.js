class ThrowableObejct extends MoveableObject {
    height = 50;
    width = 50;
    x = this.x;
    y = this.y;
    level;
    isSplashed = false;

    /**
     * Offset for the throwable object.
     * @type {Object}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
     * Images for the rotation animation of the throwable object.
     * @type {Array<string>}
     */
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    /**
     * Images for the splash animation of the throwable object.
     * @type {Array<string>}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
     * Constructs a new ThrowableObject.
     * @param {number} x - The x position of the throwable object.
     * @param {number} y - The y position of the throwable object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.splashIfHitGround();
        this.throw(100, 150);
        this.animate();
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        playAudioMultiple("bottleThrow");
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (!this.isSplashed) {
            this.x += 10;
            }
        }, 25);
    }

    /**
     * Checks if the throwable object has hit the ground.
     * @returns {boolean} True if the throwable object has hit the ground, false otherwise.
     */
    hitGround() {
        return this.y > 356;
    }

    /**
     * Sets the isSplashed flag if the throwable object has hit the ground.
     */
    splashIfHitGround() {
        setInterval(() => {
            if (this.hitGround()) {
                this.isSplashed = true;
            }
        }, 20);
    }

    /**
     * Stops the gravity effect on the throwable object.
     */
    stopGravity() {
        this.speedY = 0;
    }

    /**
     * Animates the throwable object.
     * If the throwable object has splashed, it stops the gravity effect and plays the splash animation.
     * If the throwable object has not splashed, it plays the rotation animation.
     */
    animate() {
        setInterval(() => {
            if (this.isSplashed) {
                this.stopGravity();
                setInterval(() => {
                    this.playAnimation(this.IMAGES_SPLASH);
                }, 50);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 50);
    }
    }