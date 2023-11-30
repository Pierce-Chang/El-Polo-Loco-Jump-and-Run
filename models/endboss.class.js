class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 50;
    x = this.x;
    speed = 14;
    moveAction = false;
    alertState = false;
    isDeathSoundPlayed = false;

    world;

    offset = {
        top: 70,
        left: 40,
        right: 60,
        bottom: 90,
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTAK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTAK);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                if (!this.isDeathSoundPlayed) {
                    playAudio("endbossDies")
                    playAudio("gameWon");
                    pauseAudio("endbossAttak");
                    this.isDeathSoundPlayed = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimationOnce(this.IMAGES_HURT);
            } else if (this.moveAction) {
                playAudio("endbossAttak");
                pauseAudio("endbossAlert");
                this.playAnimation(this.IMAGES_ATTAK);
            } else if (this.alertState) {
                playAudio("endbossAlert");
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100); // Interval every 200ms

        setInterval(() => {
            if (!this.isDead() && this.moveAction) {
                this.moveLeft();
            }
        }, 200); // Interval every 200ms
    }

    onHitByBottle() {
        // Aktionen, die bei Treffer durch eine Flasche ausgeführt werden sollen
        console.log('Endboss hit by bottle');
        this.energy -= 10; // Example: decrease energy when hit by a bottle
        this.lastHit = new Date().getTime();
    }
}

