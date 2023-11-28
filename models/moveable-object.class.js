class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    jump_sound = new Audio('audio/jump.mp3');

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

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

    isAboveGround() {
        if (this instanceof ThrowableObejct) {
            return true
        } else {
            return this.y < 180;
        }
    }
    
    setOnGround() {
        this.y = 180;
    }

    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
            this.y + this.offset.top <= obj.y + obj.height &&
            this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top + this.height - this.offset.bottom >= obj.y
        );
    }

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
        }}
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    isAlive() {
        return this.energy > 0;
    }

    isStanding() {
        const keys = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE', 'A', 'D'];
        return ![...keys, 'isAboveGround', 'isDead', 'isHurt']
            .some(key => this.world.keyboard[key] || this[key]?.());
    }

    isJumping() {
        // Überprüfe, ob das Objekt springt
        return this.speedY < 0;
    }

    jumpOnEnemy() {
        this.speedY = 25;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        for (let i = 0; i < images.length; i++) {
            this.img = this.imageCache[images[i]];
            this.currentImage = i;
        }
    }

    moveRight() {
        this.x += this.speed;

        this.walking_sound.play();
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.jump_sound.play();
        this.playAnimationOnce(this.IMAGES_JUMPING);
        this.speedY = 25;
    }
}