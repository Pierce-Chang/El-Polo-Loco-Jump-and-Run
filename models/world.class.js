class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
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

    checkCoinCollision() {
        for (let i = 0; i < this.level.coins.length; i++) {
            const coin = this.level.coins[i];
    
            // Überprüfen Sie, ob der Charakter mit der Münze kollidiert
            if (
                this.character.x < coin.x + coin.width &&
                this.character.x + this.character.width > coin.x &&
                this.character.y < coin.y + coin.height &&
                this.character.y + this.character.height > coin.y
            ) {
                // Kollision gefunden, entfernen Sie die Münze und erhöhen Sie den Punktestand
                this.level.coins.splice(i, 1); // Entfernen Sie die Münze aus der Liste
                // Hier können Sie Ihre Punktzählerlogik implementieren
            }
        }
    }
    
}