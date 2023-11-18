class Bottle extends CollectableObejct {
    height = 80
    width = 80

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = x + Math.random() * 70;
        this.y = 340;

        this.animate();
    }


    animate() {
        // Zufälligen Index auswählen
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        
        // Bild anhand des zufälligen Index setzen
        this.img = this.imageCache[this.IMAGES_BOTTLE[randomIndex]];
    }
}