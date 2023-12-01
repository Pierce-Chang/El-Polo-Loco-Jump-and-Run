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

    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initializeWorld();
    }

    initializeWorld() {
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrowObjects();
        this.gameEnded = false;
    }

    setWorld() {
        this.character.world = this;
    }

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

    checkEndGame() {
        if (!this.gameEnded && (world.endbossIsDead || world.character.energy <= 0)) {
            pauseAudio("endbossAttak");
            this.endboss.speed = 0;
            endGame();
            this.gameEnded = true;
        }
    }

    checkStopBackgroundMusic() {
        if (this.endboss.alertState || this.endboss.moveAction || this.character.energy <= 0) {
                pauseAudio("backgroundMusic");
        }
    }

    checkCollisions() {
        const hitDelay = 1000; // Delay in milliseconds

        this.level.enemies.forEach((enemy) => {
            const currentTime = new Date().getTime();

            if (this.character.isFalling() && this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.jumpOnEnemy();
                playAudio("characterJump");
                enemy.energy = 0;
                setTimeout(() => {
                    this.removeFromWorld(enemy);
                }, 300);
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                if (!this.character.lastHitTime || currentTime - this.character.lastHitTime >= hitDelay) {
                    this.character.hit();
                    this.character.lastHitTime = currentTime;
                    this.statusBarHealth.setPercentage(this.character.energy);
                    console.log('Collision with Character, energy', this.character.energy);
                }
            }
        });
        this.checkEndbossCollidesCharacter();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
    }

    checkThrowObjects() {
        if (this.keyboard.E && !this.eKeyPressed) {
            if (this.statusBarBottle.percentage > 0) {
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 20);

                let bottle = new ThrowableObejct(this.character.x + 40, this.character.y + 100);
                this.ThrowableObjects.push(bottle);

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
                this.eKeyPressed = true;
            }
        } else if (!this.keyboard.E) {
            this.eKeyPressed = false;
        }
    }

    checkCharacterIsNearEndboss() {
        setInterval(() => {
            const distance = this.endboss.x - this.character.x;
            if (distance < 600 && !this.endboss.alertState) {
                this.endboss.alertState = true;

                setTimeout(() => {
                    if (!this.endboss.moveAction) {
                        this.endboss.moveAction = true;
                        this.endboss.alertState = false;
                    }
                }, 2000);
            }
        }, 200);
    }

    checkEndbossIsDead() {
        if (this.endboss.isDead()) {
            this.endbossIsDead = true;
        }
    }

    checkChacaterIsDead() {
        if (this.character.isDead()) {
            this.endbossIsDead = true;
        }
    }

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

    stopAnimation() {
        if (this.animation) {
            clearInterval(this.animation);
            this.animation = null;
        }
    }

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

    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.removeFromWorld(coin);
                this.collectCoin();
            }
        });
    }

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

    removeBottleAfterDelay(bottle) {
        setTimeout(() => {
            const index = this.ThrowableObjects.indexOf(bottle);
            if (index !== -1) {
                this.ThrowableObjects.splice(index, 1);
            }
        }, 200);
    }

    collectBottle() {
        this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
        let bottle = new ThrowableObejct();
        this.ThrowableObjects.push(bottle);
    }

    collectCoin() {
        this.statusBarCoins.setPercentage(this.statusBarCoins.percentage + 20);
        playAudioMultiple("collectCoin");
    }

    hitEndboss() {
        const currentPercentage = this.statusBarEndboss.percentage;
        const newPercentage = Math.max(0, currentPercentage - 20);
        this.statusBarEndboss.setPercentage(newPercentage);
        this.endboss.hit();
        console.log('Endboss hit, new percentage:', newPercentage);
    }


    removeFromWorld(object) {
        if (object instanceof Coin) {
            this.removeFromLevel(object, this.level.coins);
        } else if (object instanceof Bottle) {
            this.removeFromLevel(object, this.level.bottles);
        } else if (object instanceof Chicken || object instanceof ChickenSmall) {
            this.removeFromLevel(object, this.level.enemies);
        }
    }

    removeFromLevel(object, levelArray) {
        const index = levelArray.indexOf(object);
        if (index !== -1) {
            levelArray.splice(index, 1);
        }
    }

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

    addObjectsToMap(objetcs) {
        objetcs.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}