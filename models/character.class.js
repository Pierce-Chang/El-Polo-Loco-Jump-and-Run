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
        top: 120,
        left: 40,
        right: 40,
        bottom: 10,
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
        this.isCharacterDeadAudioPlayed = false;
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
     * Checks if the right arrow key or the 'D' key is pressed and if the character's x position is less than the level's end x position.
     * @returns {boolean} True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.D && this.x < this.world.level.level_end_x
    }

    /**
     * Checks if the left arrow key or the 'A' key is pressed and if the character's x position is greater than 0.
     * @returns {boolean} True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT || this.world.keyboard.A && this.x > 0
    }

    /**
     * Checks if the space key is pressed and if the character is not above the ground.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }

    /**
     * Handles the character's death animation and audio.
     */
    handleCharacterDeath() {
        if (!isCharacterDeadAudioPlayed) {
            playAudio("characterDies");
            playAudio("gameLost");
            isCharacterDeadAudioPlayed = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
        pauseAudio("characterWalking");
    }

    /**
     * Handles the character's hurt animation and audio.
     */
    handleCharacterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        playAudio("characterGetHurt");
        pauseAudio("characterWalking");
    }

    /**
     * Handles the character's jump animation and audio.
     */
    handleCharacterJump() {
        this.playAnimation(this.IMAGES_JUMPING);
        pauseAudio("characterWalking");
    }

    /**
     * Handles the character's movement animation and audio.
     * @param {number} currentTime - The current time.
     */
    handleCharacterMovement(currentTime) {
        if (this.characterIsMoving()) {
            this.lastActionTime = currentTime;
            playAudio("characterWalking");
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            pauseAudio("characterWalking");
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Moves the character based on the keyboard input. This function is called every 1/60th of a second.
     */
    moveCharacter() {
        setInterval(() => {
            if (this.canMoveRight()) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.canMoveLeft()) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.canJump()) {
                playAudio("characterJump");
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Plays the character's standing animation and audio.
     * @param {number} timeSinceLastAction - The time since the last action.
     */
    playStandingAnimation(timeSinceLastAction) {
        if (!this.isDead() && this.isStanding() && timeSinceLastAction > 5) {
            playAudio("characterSleeps");
            this.playAnimation(this.IMAGES_SLEEPING);
            pauseAudio("characterWalking");
        } else if (!this.isDead() && this.isStanding()) {
            this.playAnimation(this.IMAGES_IDLE);
            pauseAudio("characterWalking");
        }
    }

    /**
     * Plays the character's death animation and audio.
     */
    playDeadAnimation() {
        if (this.isDead()) {
            if (!this.isCharacterDeadAudioPlayed) {
                playAudio("characterDies");
                playAudio("gameLost");
                this.isCharacterDeadAudioPlayed = true;
            }
            this.playAnimation(this.IMAGES_DEAD);
            pauseAudio("characterWalking");
        }
    }

    /**
     * Plays the character's hurt animation and audio.
     * @param {number} currentTime - The current time.
     */
    playHurtAnimation(currentTime) {
        if (this.isHurt()) {
            this.lastActionTime = currentTime;
            this.playAnimation(this.IMAGES_HURT);
            playAudio("characterGetHurt");
            pauseAudio("characterWalking");
        }
    }

    /**
     * Plays the character's jumping animation and audio.
     * @param {number} currentTime - The current time.
     */
    playJumpingAnimation(currentTime) {
        if (this.isAboveGround()) {
            this.lastActionTime = currentTime;
            this.playAnimation(this.IMAGES_JUMPING);
            pauseAudio("characterWalking");
        }
    }

    /**
     * Plays the character's walking animation and audio.
     * @param {number} currentTime - The current time.
     */
    playWalkingAnimation(currentTime) {
        if (!this.isAboveGround() && !this.isHurt() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.A || this.world.keyboard.D)) {
            this.lastActionTime = currentTime;
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Starts the animation for the character.
     * The character moves left or right, jumps, and the camera follows the character.
     */
    animate() {
        this.moveCharacter();
        let isCharacterDeadAudioPlayed = false;
    
        setInterval(() => {
            const currentTime = new Date().getTime();
            const timeSinceLastAction = (currentTime - this.lastActionTime) / 1000;
            this.checkGameIsFinished();
    
            if (!this.lastActionTime) {
                this.lastActionTime = currentTime;
            }
    
            this.playStandingAnimation(timeSinceLastAction);
            this.playDeadAnimation();
            this.playHurtAnimation(currentTime);
            this.playJumpingAnimation(currentTime);
            this.playWalkingAnimation(currentTime);
        }, 98);
    }
}