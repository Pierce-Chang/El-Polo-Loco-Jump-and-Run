class World extends DrawableObject {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    statusBarEndbossIcon = new StatusBarEndbossIcon();
    ThrowableObjects = [];
    eKeyPressed = false;
    endbossIsDead = false;
    moveAction = false;
    gameEnded = false;

    /**
     * Constructs a new World object.
     * @param {HTMLCanvasElement} canvas - The canvas on which to draw the world.
     * @param {Object} keyboard - The keyboard object to handle keyboard input.
     */
    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initializeWorld();
    }

    /**
     * Initialize the game world.
     */
    initializeWorld() {
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrowObjects();
        this.gameEnded = false;
    }

    /**
     * Set the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Run the game world.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCharacterIsNearEndboss();
            this.checkEndbossIsDead();
            this.checkChacaterIsDead();
            this.checkStopBackgroundMusic();
            this.checkEndGame();
        }, 20);
    }

    /**
     * Check if the game has ended.
     */
    checkEndGame() {
        if (!this.gameEnded && (world.endbossIsDead || world.character.energy <= 0)) {
            pauseAudio("endbossAttak");
            this.endboss.speed = 0;
            endGame();
            this.gameEnded = true;
        }
    }

    /**
     * Check if the background music should stop.
     */
    checkStopBackgroundMusic() {
        if (this.endboss.alertState || this.endboss.moveAction || this.character.energy <= 0) {
                pauseAudio("backgroundMusic");
        }
    }

    /**
     * Check for collisions between characters and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.handleEnemyCollision(enemy);
        });
        this.checkEndbossCollidesCharacter();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
    }

    /**
     * Handle a collision with an enemy.
     * @param {Object} enemy - The enemy that the character collided with.
     */
    handleEnemyCollision(enemy) {
        const hitDelay = 1000;
        const currentTime = new Date().getTime();

        if (this.character.isFalling() && this.character.isColliding(enemy) && this.character.isAboveGround()) {
            this.handleJumpOnEnemy(enemy);
        } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
            if (!this.character.lastHitTime || currentTime - this.character.lastHitTime >= hitDelay) {
                this.handleEnemyHitCharacter(currentTime);
            }
        }
    }

    /**
     * Handle the character jumping on an enemy.
     * @param {Object} enemy - The enemy that the character jumped on.
     */
    handleJumpOnEnemy(enemy) {
        this.character.jumpOnEnemy();
        playAudio("characterJump");
        enemy.energy = 0;
        setTimeout(() => {
            this.removeFromWorld(enemy);
        }, 300);
    }

    /**
     * Handle the character being hit by an enemy.
     * @param {number} currentTime - The current time.
     */
    handleEnemyHitCharacter(currentTime) {
        this.character.hit();
        this.character.lastHitTime = currentTime;
        this.statusBarHealth.setPercentage(this.character.energy);
        console.log('Collision with Character, energy', this.character.energy);
    }

    /**
     * Checks if the E key is pressed to throw a bottle.
     * If the E key is pressed and a bottle is available, it creates and animates a bottle.
     * If the E key is not pressed, it resets the eKeyPressed flag.
     */
    checkThrowObjects() {
        if (this.keyboard.E && !this.eKeyPressed) {
            if (this.statusBarBottle.percentage > 0) {
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 20);
                let bottle = this.createBottle();
                this.animateBottle(bottle);
                this.eKeyPressed = true;
            }
        } else if (!this.keyboard.E) {
            this.eKeyPressed = false;
        }
    }

    /**
     * Creates a new ThrowableObject (bottle) at the character's position and adds it to the ThrowableObjects array.
     * @returns {ThrowableObject} The created bottle.
     */
    createBottle() {
        let bottle = new ThrowableObejct(this.character.x + 40, this.character.y + 100);
        this.ThrowableObjects.push(bottle);
        return bottle;
    }

    /**
     * Animates a bottle. If the bottle collides with the endboss, it plays an audio, hits the endboss, and removes the bottle.
     * If the bottle hits the ground, it plays an audio and removes the bottle.
     * @param {ThrowableObject} bottle - The bottle to animate.
     */
    animateBottle(bottle) {
        let bottleAnimationInterval = setInterval(() => {
            if (bottle.isColliding(this.endboss)) {
                playAudioMultiple("endbossHurt");
                this.hitEndboss();
                bottle.isSplashed = true;
                this.removeBottleAfterDelay(bottle)
                clearInterval(bottleAnimationInterval);
            }

            if (bottle.hitGround()) {
                playAudioMultiple("bottleSplash");
                this.removeBottleAfterDelay(bottle)
                clearInterval(bottleAnimationInterval);
            }
        }, 30);
    }

    /**
     * Checks if the character is near the endboss.
     * If the character is within a certain distance and the endboss is not in alert state, it sets the endboss state.
     */
    checkCharacterIsNearEndboss() {
        setInterval(() => {
            const distance = this.endboss.x - this.character.x;
            if (distance < 600 && !this.endboss.alertState) {
                this.setEndbossState(this.endboss);
            }
        }, 200);
    }

    /**
     * Sets the state of the endboss.
     * If the endboss is not in move action, it sets the move action and resets the alert state after a delay.
     * @param {Object} endboss - The endboss to set the state of.
     */
    setEndbossState(endboss) {
        endboss.alertState = true;
        setTimeout(() => {
            if (!endboss.moveAction) {
                endboss.moveAction = true;
                endboss.alertState = false;
            }
        }, 2000);
    }

    /**
     * Checks if the endboss is dead.
     * If the endboss is dead, it sets the endbossIsDead flag.
     */
    checkEndbossIsDead() {
        if (this.endboss.isDead()) {
            this.endbossIsDead = true;
        }
    }

    /**
     * Checks if the character is dead.
     * If the character is dead, it sets the endbossIsDead flag.
     */
    checkChacaterIsDead() {
        if (this.character.isDead()) {
            this.endbossIsDead = true;
        }
    }

    /**
     * Checks if the endboss collides with the character.
     * If the endboss collides with the character, it logs a message, hits the character, sets the character's energy in the status bar, logs the character's energy, sets the character's speedY, and if the character is above ground, it stops the animation and moves the character.
     */
    checkEndbossCollidesCharacter() {
        if (this.character.isColliding(this.endboss)) {
            console.log('Endboss collides with Character')
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
            console.log('Collision with Character, energy', this.character.energy);
            this.character.speedY = 10;
            if (this.character.isAboveGround()) {
                this.stopAnimation();
                this.moveCharacter(200, 10);
            }
        }
    }

    /**
     * Stops the animation.
     */
    stopAnimation() {
        if (this.animation) {
            clearInterval(this.animation);
            this.animation = null;
        }
    }

    /**
     * Moves the character a certain distance at a certain speed.
     * @param {number} distanceToMove - The distance to move the character.
     * @param {number} speed - The speed at which to move the character.
     */
    moveCharacter(distanceToMove, speed) {
        let distanceMoved = 0;
        this.animation = setInterval(() => {
            this.character.x -= speed;
            distanceMoved += speed;
            if (distanceMoved >= distanceToMove) {
                this.stopAnimation();
            }
        }, 10);
    }

    /**
     * Checks if the character collides with a coin.
     * If the character collides with a coin, it removes the coin from the world and collects the coin.
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.removeFromWorld(coin);
                this.collectCoin();
            }
        });
    }

    /**
     * Checks if the character collides with a bottle.
     * If the character collides with a bottle and the bottle percentage is less than 100, it plays an audio, removes the bottle from the world, and collects the bottle.
     */
    checkCollisionBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.statusBarBottle.percentage < 100) {
                    playAudioMultiple("bottleCollect");
                    this.removeFromWorld(bottle);
                    this.collectBottle();
                }
            }
        });
    }

    /**
     * Removes a bottle from the ThrowableObjects array after a delay.
     * @param {ThrowableObject} bottle - The bottle to remove.
     */
    removeBottleAfterDelay(bottle) {
        setTimeout(() => {
            const index = this.ThrowableObjects.indexOf(bottle);
            if (index !== -1) {
                this.ThrowableObjects.splice(index, 1);
            }
        }, 200);
    }

    /**
     * Collects a bottle.
     * It increases the bottle percentage in the status bar, creates a new ThrowableObject (bottle), and adds it to the ThrowableObjects array.
     */
    collectBottle() {
        this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
        let bottle = new ThrowableObejct();
        this.ThrowableObjects.push(bottle);
    }

    /**
     * Collects a coin.
     * It increases the coin percentage in the status bar and plays an audio.
     */
    collectCoin() {
        this.statusBarCoins.setPercentage(this.statusBarCoins.percentage + 20);
        playAudioMultiple("collectCoin");
    }

    /**
     * Hits the endboss.
     * It decreases the endboss percentage in the status bar, hits the endboss, and logs the new percentage.
     */
    hitEndboss() {
        const currentPercentage = this.statusBarEndboss.percentage;
        const newPercentage = Math.max(0, currentPercentage - 20);
        this.statusBarEndboss.setPercentage(newPercentage);
        this.endboss.hit();
        console.log('Endboss hit, new percentage:', newPercentage);
    }

    /**
     * Removes an object from the world.
     * If the object is a Coin, it removes it from the coins array in the level.
     * If the object is a Bottle, it removes it from the bottles array in the level.
     * If the object is a Chicken or a ChickenSmall, it removes it from the enemies array in the level.
     * @param {Object} object - The object to remove.
     */
    removeFromWorld(object) {
        if (object instanceof Coin) {
            this.removeFromLevel(object, this.level.coins);
        } else if (object instanceof Bottle) {
            this.removeFromLevel(object, this.level.bottles);
        } else if (object instanceof Chicken || object instanceof ChickenSmall) {
            this.removeFromLevel(object, this.level.enemies);
        }
    }

    /**
     * Removes an object from a level array.
     * @param {Object} object - The object to remove.
     * @param {Array} levelArray - The level array to remove the object from.
     */
    removeFromLevel(object, levelArray) {
        const index = levelArray.indexOf(object);
        if (index !== -1) {
            levelArray.splice(index, 1);
        }
    }

    /**
     * Draws the world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.ThrowableObjects)
        this.ctx.translate(-this.camera_x, 0);
        // ----------- Space for fixed objects ----------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        if (this.endboss.alertState) {
            this.addToMap(this.statusBarEndboss);
            this.addToMap(this.statusBarEndbossIcon);
        }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the map.
     * @param {Array} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     * If the object is facing the other direction, it flips the image.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawOffsetFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
     * Flips an image.
     * It saves the current context, translates the context by the width of the image, scales the context to flip the image, and multiplies the x position of the image by -1.
     * @param {Object} mo - The object with the image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips an image back.
     * It multiplies the x position of the image by -1 and restores the context.
     * @param {Object} mo - The object with the image to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}