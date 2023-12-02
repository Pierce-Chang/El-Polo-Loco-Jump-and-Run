class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

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
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY >= 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (!this.isAboveGround()) {
                    this.setOnGround();
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObejct) {
            return true
        } else {
            return this.y < 180;
        }
    }
    
    /**
     * Sets the object on the ground.
     */
    setOnGround() {
        this.y = 180;
        this.speedY = 0;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The other object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
            this.y + this.offset.top <= obj.y + obj.height - obj.offset.top &&
            this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top
        );
    }

    /**
     * Reduces the object's energy by 20 and sets the last hit time.
     */
    hit() {
        if (this instanceof Endboss) {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        } else {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object was hit less than 0.5 seconds ago, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object's energy is 0 or less, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object is alive.
     * @returns {boolean} True if the object's energy is more than 0, false otherwise.
     */
    isAlive() {
        return this.energy > 0;
    }

    /**
     * Checks if the object is standing.
     * @returns {boolean} True if the object is not moving, jumping, falling, dead, or hurt, false otherwise.
     */
    isStanding() {
        const keys = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE', 'A', 'D'];
        return ![...keys, 'isAboveGround', 'isDead', 'isHurt']
            .some(key => this.world.keyboard[key] || this[key]?.());
    }

    /**
     * Checks if the object is jumping.
     * @returns {boolean} True if the object's vertical speed is positive, false otherwise.
     */
    isJumping() {
        return this.speedY > 0;
    }

    /**
     * Checks if the object is falling.
     * @returns {boolean} True if the object's vertical speed is negative, false otherwise.
     */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Makes the object jump on an enemy.
     */
    jumpOnEnemy() {
        this.speedY = 25;
    }

    /**
     * Plays an animation for the object.
     * @param {Array<string>} images - The images to use for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation for the object once.
     * @param {Array<string>} images - The images to use for the animation.
     */
    playAnimationOnce(images) {
        for (let i = 0; i < images.length; i++) {
            this.img = this.imageCache[images[i]];
            this.currentImage = i;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.playAnimationOnce(this.IMAGES_JUMPING);
        this.speedY = 25;
    }
}