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
        right: 60,
        bottom: 90,
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
     * Animates the Endboss object based on its current state.
     * This function is called at a regular interval.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                if (!this.isDeathSoundPlayed) {
                    playAudio("endbossDies")
                    playAudio("gameWon");
                    this.isDeathSoundPlayed = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimationOnce(this.IMAGES_HURT);
            } else if (this.moveAction) {
                playAudio("endbossAttak");
                pauseAudio("endbossAlert");
                this.playAnimation(this.IMAGES_ATTAK);
            } else if (this.alertState) {
                playAudio("endbossAlert");
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);

        setInterval(() => {
            if (this.moveAction) {
                this.moveLeft();
            }
        }, 200);
    }

    /**
     * Handles the event when the Endboss is hit by a bottle.
     * Decreases the energy of the Endboss and logs the event.
     */
    onHitByBottle() {
        console.log('Endboss hit by bottle');
        this.energy -= 10;
        this.lastHit = new Date().getTime();
    }
}

