class ChickenSmall extends MoveableObject {

    height = 80;
    width = 80;
    y = 340;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEADmodels/chicken.class.js);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30); //30 frames per second


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200); // Interval every 1000ms
    }

}

