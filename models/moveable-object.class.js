class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObejct) {
            return true
        } else {
            return this.y < 225;
        }
    }

    onCollisionCourse(character) {
        // Überprüfe, ob das Objekt in die gleiche Richtung wie der Charakter läuft
        return (this.x < character.x && this.speed > 0) || (this.x > character.x && this.speed < 0);
    }

    isColliding(mo) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height) &&
            obj.onCollisionCourse;
    }

    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //         obj.onCollisionCourse;
    // }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    isStanding() {
        const keys = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE', 'A', 'D'];
        return ![...keys, 'isAboveGround', 'isDead', 'isHurt']
            .some(key => this.world.keyboard[key] || this[key]?.());
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
        this.playAnimationOnce(this.IMAGES_JUMPING);
        this.speedY = 30;
    }
}