class Chicken extends MoveableObject {

    height = 80;
    width = 80;
    y = 340;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        
        this.animate();
    }

    chickenHit = new Audio('audio/chickenHit.mp3');
    isDeadSoundPlayed = false;


    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            } 
        }, 1000 / 30); //30 frames per second


        setInterval(() => {
            if (this.isDead()) {
                if (!this.isDeadSoundPlayed) {
                    this.chickenHit.play();
                    this.isDeadSoundPlayed = true;
                }
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.isDeadSoundPlayed = false;
            }
        }, 200); // Interval every 200ms
    }

}

