class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 50;
    x = this.x;
    speed = 14;
    moveAction = false;
    alertState = false;
    isDeathSoundPlayed = false;

    world;

    /**
     * Offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 70,
        left: 40,
        right: 20,
        bottom: 10,
    };

    /**
     * Images for the walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * Images for the alert animation.
     * @type {Array<string>}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Images for the attack animation.
     * @type {Array<string>}
     */
    IMAGES_ATTAK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
     * Images for the hurt animation.
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Images for the dead animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Constructs a new Endboss object, loads images and starts the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTAK);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2500;
        this.animate();
    }

    /**
     * Handles the death of the endboss. Plays the death sound and animation if not already played.
     */
    handleDeath() {
        if (!this.isDeathSoundPlayed) {
            playAudio("endbossDies")
            playAudio("gameWon");
            this.isDeathSoundPlayed = true;
        }
        this.playAnimationOnce(this.IMAGES_DEAD);
    }

    /**
     * Handles the hurt state of the endboss. Plays the hurt animation.
     */
    handleHurt() {
        this.playAnimationOnce(this.IMAGES_HURT);
    }

    /**
     * Handles the attack of the endboss. Plays the attack sound and animation.
     */
    handleAttack() {
        playAudio("endbossAttak");
        pauseAudio("endbossAlert");
        this.playAnimation(this.IMAGES_ATTAK);
    }

    /**
     * Handles the alert state of the endboss. Plays the alert sound and animation.
     */
    handleAlert() {
        playAudio("endbossAlert");
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * Animates the endboss based on its current state. The endboss can be in one of the following states: moving, dead, hurt, attacking, alert, or walking.
     */
    animate() {
        setInterval(() => {
            if (this.moveAction) {
                this.moveLeft();
            }

            if (this.isDead()) {
                this.handleDeath();
            } else if (this.isHurt()) {
                this.handleHurt();
            } else if (this.moveAction) {
                this.handleAttack();
            } else if (this.alertState) {
                this.handleAlert();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
    /**
     * Handles the event when the Endboss is hit by a bottle.
     * Decreases the energy of the Endboss and logs the event.
     */
    onHitByBottle() {
        this.energy -= 10;
        this.lastHit = new Date().getTime();
    }
}

