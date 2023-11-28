class ThrowableObejct extends MoveableObject {
    height = 50;
    width = 50;
    x = this.x;
    y = this.y;
    level;
    isSplashed = false;
    throwBottleSound = new Audio('audio/throw_bottle.mp3');

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.splashIfHitGround();
        this.trow(100, 150);
        this.animate();
    }


    trow() {
        this.throwBottleSound.play();
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (!this.isSplashed) {
            this.x += 10;
            }
        }, 25);
    }

    hitGround() {
        return this.y > 356;
    }

    splashIfHitGround() {
        setInterval(() => {
            if (this.hitGround()) {
                this.isSplashed = true;
            }
        }, 20);
    }

    stopGravity() {
        this.speedY = 0;
    }

    animate() {
        setInterval(() => {
            if (this.isSplashed) {
                this.stopGravity();
                setInterval(() => {
                    this.playAnimation(this.IMAGES_SPLASH);
                }, 50);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 50);
    }
    }