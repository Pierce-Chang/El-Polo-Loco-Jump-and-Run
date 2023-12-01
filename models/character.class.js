class Character extends MoveableObject {
    /**
     * The height of the character.
     * @type {number}
     */
    height = 250;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 125;

    /**
     * The y-coordinate of the character.
     * @type {number}
     */
    y = 180;

    /**
     * The speed of the character.
     * @type {number}
     */
    speed = 8;

    /**
     * Offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 100,
        left: 10,
        right: 20,
        bottom: 110,
    };

    /**
     * Images for the walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    /**
     * Images for the jumping animation.
     * @type {Array<string>}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Images for the dead animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Images for the hurt animation.
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Images for the idle animation.
     * @type {Array<string>}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /**
     * Images for the sleeping animation.
     * @type {Array<string>}
     */
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    /**
     * Reference to the world object.
     * @type {World}
     */
    world;

    /**
     * Constructs a new Character object, loads images, applies gravity, and starts the animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.isHit = false;
    }

    /**
     * Checks if the game is finished.
     * If the character is dead, it plays the death sound.
     */
    checkGameIsFinished() {
        if (this.isDead()) {
            playAudio("deathSound");
        }
    }

    /**
     * Starts the animation for the character.
     * The character moves left or right, jumps, and the camera follows the character.
     */
    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.D && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT || this.world.keyboard.A && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                playAudio("characterJump");
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        let isCharacterDeadAudioPlayed = false;

        /**
         * Sets an interval to check the game status and animate the character.
         * The character's animation depends on its current state (standing, dead, hurt, above ground, or moving).
         * The appropriate sound is played for each state.
         */
        setInterval(() => {
            this.checkGameIsFinished();

            const currentTime = new Date().getTime();
            if (!this.lastActionTime) {
                this.lastActionTime = currentTime;
            }
            const timeSinceLastAction = (currentTime - this.lastActionTime) / 1000;

            if (this.isStanding() && timeSinceLastAction > 5) {
                playAudio("characterSleeps");
                this.playAnimation(this.IMAGES_SLEEPING);
                pauseAudio("characterWalking");
            } else {
                if (this.isStanding()) {
                    this.playAnimation(this.IMAGES_IDLE);
                    pauseAudio("characterWalking");
                } else if (this.isDead()) {
                    if (!isCharacterDeadAudioPlayed) {
                        playAudio("characterDies");
                        playAudio("gameLost");
                        isCharacterDeadAudioPlayed = true;
                    }
                    this.playAnimation(this.IMAGES_DEAD);
                    pauseAudio("characterWalking");
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    playAudio("characterGetHurt");
                    pauseAudio("characterWalking");
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                    pauseAudio("characterWalking");
                } else {
                    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.A || this.world.keyboard.D) {
                        this.lastActionTime = currentTime;
                        playAudio("characterWalking");
                        this.playAnimation(this.IMAGES_WALKING);
                    } else {
                        pauseAudio("characterWalking");
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
            }
        }, 98);
    }
}