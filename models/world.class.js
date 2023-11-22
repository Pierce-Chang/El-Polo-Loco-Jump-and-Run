class World extends DrawableObject {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    endboss = new Endboss();
    ThrowableObjects = [];
    eKeyPressed = false;

    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 30);
    }

    checkThrowObjects() {
        if (this.keyboard.E && !this.eKeyPressed) {
            if (this.statusBarBottle.percentage > 0) {
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 34);

                let bottle = new ThrowableObejct(this.character.x + 40, this.character.y + 100, this);
                this.ThrowableObjects.push(bottle);

                let bottleAnimationInterval = setInterval(() => {
                    // Check if the bottle collides with the end boss
                    if (bottle.isColliding(this.endboss)) {
                        console.log('Endboss got hit by bottle!')
                        // Endboss was hit by the bottle
                        this.hitEndboss();
                    } else {
                        console.log('No collision detected with Endboss');
                    }

                    // Check if the bottle hits the ground
                    if (bottle.hitGround()) {
                        clearInterval(bottleAnimationInterval); // Clear the animation interval
                        const index = this.ThrowableObjects.indexOf(bottle);
                        if (index !== -1) {
                            this.ThrowableObjects.splice(index, 1);
                        }
                    }
                }, 30);

                // Set the status of the "E" key to pressed
                this.eKeyPressed = true;
            }
        } else if (!this.keyboard.E) {
            // Set the status of the "E" key to not pressed when the key is released
            this.eKeyPressed = false;
        }
    }


    checkCollisions() {
        const enemiesToRemove = [];

        // Kollisionen mit Feinden überprüfen
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumping() && this.character.isColliding(enemy) && this.character.y < 225) {
                // Der Charakter springt auf den Feind
                this.character.jumpOnEnemy();
                enemiesToRemove.push(enemy); // Füge den Feind zur Entfernungsliste hinzu
            } else if (this.character.isColliding(enemy)) {
                // Der Charakter wird getroffen
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                console.log('Collision with Character, energy', this.character.energy);
            }
        });

        // Entferne die Feinde, die markiert wurden
        enemiesToRemove.forEach((enemy) => {
            this.removeFromWorld(enemy);
        });

        // Kollisionen mit Münzen überprüfen
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                console.log('Collision with coin detected');
                this.removeFromWorld(coin);
                this.collectCoin();
            }
        });

        // Kollisionen mit Flaschen überprüfen
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.removeFromWorld(bottle);
                this.collectBottle();
            }
        });
    }



    hitEndboss() {
        // Reduziere die Endboss-Statusleiste um 34%
        this.statusBarEndboss.setPercentage(this.statusBarEndboss.percentage - 34);
        console.log('Endboss hit, new percentage:', this.statusBarEndboss.percentage);
    }

    collectCoin() {
        // Erhöhe die Coin-Anzeige um 20%
        this.statusBarCoins.setPercentage(this.statusBarCoins.percentage + 20);
    }

    collectBottle() {
        // Erhöhe die Flaschen-Anzeige um einen festen Wert (z.B., 10%)
        this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 3334); // changed percentage increment for test purpose
        let bottle = new ThrowableObejct();
        this.ThrowableObjects.push(bottle);
        // this.bottleCount ++;
        // console.log(bottleCount)
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

        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.ThrowableObjects)

        this.ctx.translate(-this.camera_x, 0);
        // ----------- Space for fixed objects ----------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
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
        mo.drawFrame(this.ctx);
        mo.drawOffsetFrame(this.ctx);

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