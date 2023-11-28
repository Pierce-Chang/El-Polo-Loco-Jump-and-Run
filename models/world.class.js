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
    collectCoinSound = new Audio('audio/collectcoin.mp3');
    collectBottleSound = new Audio('audio/collect_bottle.mp3');
    bottleSplashSound = new Audio('audio/bottle_splash.mp3');
    endbossHitSound = new Audio('audio/endboss_hit.mp3');
    backgroundmusic = new Audio('audio/backgroundmusic.mp3');
    

    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrowObjects();
    }

    setWorld() {
        this.character.world = this;
    }

    setEndboss() {
        this.endboss.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCharacterIsNearEndboss();
            this.checkEndbossIsDead();
            this.playBackgroundMusic();
        }, 20);
    }

    playBackgroundMusic() {
        if (!this.endboss.alertState) {
            this.backgroundmusic.play();
        } else if (this.endboss.endboss_attak.play()) {
            this.backgroundmusic.pause();
        }
    }

    checkThrowObjects() {
        if (this.keyboard.E && !this.eKeyPressed) {
            if (this.statusBarBottle.percentage > 0) {
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 20);

                let bottle = new ThrowableObejct(this.character.x + 40, this.character.y + 100);
                this.ThrowableObjects.push(bottle);

                let bottleAnimationInterval = setInterval(() => {
                    // Check if the bottle collides with the end boss
                    if (bottle.isColliding(this.endboss)) {
                        // Endboss was hit by the bottle
                        this.playEndbossHitSound();
                        this.hitEndboss();
                        bottle.isSplashed = true;
                        this.removeBottleAfterDelay(bottle)
                        clearInterval(bottleAnimationInterval); // Clear the animation interval
                    }

                    if (bottle.hitGround()) {
                        this.playBottleSplashSound();
                        this.removeBottleAfterDelay(bottle)
                        clearInterval(bottleAnimationInterval); // Clear the animation interval
                    }
                }, 30);
                this.eKeyPressed = true;
            }
        } else if (!this.keyboard.E) {
            this.eKeyPressed = false;
        }
    }

    removeBottleAfterDelay(bottle) {
        // Remove the bottle after a delay (e.g., 1000ms)
        setTimeout(() => {
            const index = this.ThrowableObjects.indexOf(bottle);
            if (index !== -1) {
                this.ThrowableObjects.splice(index, 1);
            }
        }, 200);
    }



    checkCollisions() {
        const hitDelay = 1000; // Delay in milliseconds

        this.level.enemies.forEach((enemy) => {
            const currentTime = new Date().getTime();

            if (this.character.isJumping() && this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.jumpOnEnemy();
                enemy.energy = 0;
                setTimeout(() => {
                    this.removeFromWorld(enemy);
                }, 300);
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                // Check if enough time has passed since the last hit
                if (!this.character.lastHitTime || currentTime - this.character.lastHitTime >= hitDelay) {
                    // Der Charakter wird getroffen
                    this.character.hit();
                    this.character.lastHitTime = currentTime; // Record the time of the hit
                    this.statusBarHealth.setPercentage(this.character.energy);
                    console.log('Collision with Character, energy', this.character.energy);
                }
            }
        });
        this.checkEndbossCollidesCharacter();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
    }

    checkCharacterIsNearEndboss() {
        setInterval(() => {
            const distance = this.endboss.x - this.character.x;
            if (distance < 600) {
                this.endboss.alertState = true;
                // animate alert

                // After 1 second, animate attack
                setTimeout(() => {
                    this.endboss.moveAction = true;
                    this.endboss.alertState = false; // Add this line
                    // animate attack
                }, 2000);
            }
        }, 200); // Interval every 200ms
    }

    checkEndbossIsDead() {
        if (this.endboss.isDead()) {
            this.endbossIsDead = true;
        }
    }

    hitEndboss() {
        // Reduziere die Endboss-Statusleiste um 34%
        const currentPercentage = this.statusBarEndboss.percentage;
        const newPercentage = Math.max(0, currentPercentage - 20);
        this.statusBarEndboss.setPercentage(newPercentage);
        this.endboss.hit();
        console.log('Endboss hit, new percentage:', newPercentage);
    }

    checkEndbossCollidesCharacter() {
        if (this.character.isColliding(this.endboss)) {
            console.log('Endboss collides with Character')
            this.character.hit();
            this.character.speedY = 10;
            if (this.character.isAboveGround()) {
                // Clear the existing interval
                if (this.animation) {
                    clearInterval(this.animation);
                }
                let distance = 0;
                this.animation = setInterval(() => {
                    this.character.x -= 10;
                    distance += 10;
                    if (distance >= 200) {
                        clearInterval(this.animation);
                        this.animation = null;
                    }
                }, 10); // adjust the interval as needed
            }
        }
    }

    checkCollisionCoin() {
        // Kollisionen mit Münzen überprüfen
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.removeFromWorld(coin);
                this.collectCoin();
            }
        });
    }

    collectCoin() {
        // Erhöhe die Coin-Anzeige um 20%
        this.statusBarCoins.setPercentage(this.statusBarCoins.percentage + 20);
        this.playCollectCoinSound();
    }

    playCollectCoinSound() {
        let sound = new Audio('audio/collectcoin.mp3');
        sound.play();
    }

    playCollectBottleSound() {
        let sound = new Audio('audio/collect_bottle.mp3');
        sound.play();
    }

    playBottleSplashSound() { 
        let sound = new Audio('audio/bottle_splash.mp3');
        sound.play();
    }

    playEndbossHitSound() {
        let sound = new Audio('audio/endboss_hit.mp3');
        sound.play();
    }


    checkCollisionBottle() {
        // Kollisionen mit Flaschen überprüfen
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.removeFromWorld(bottle);
                this.playCollectBottleSound();
                this.collectBottle();
            }
        });
    }

    collectBottle() {
        // Erhöhe die Flaschen-Anzeige um einen festen Wert (z.B., 10%)
        this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20); // changed percentage increment for test purpose
        let bottle = new ThrowableObejct();
        this.ThrowableObjects.push(bottle);
    }


    removeFromWorld(object) {
        if (object instanceof Coin) {
            const index = this.level.coins.indexOf(object);
            if (index !== -1) {
                this.level.coins.splice(index, 1);
            }
        } else if (object instanceof Bottle) {
            const index = this.level.bottles.indexOf(object);
            if (index !== -1) {
                this.level.bottles.splice(index, 1);
            }
        } else if (object instanceof Chicken || ChickenSmall) {
            const index = this.level.enemies.indexOf(object);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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

        // Draw() wird immer wieder aufgerufen
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