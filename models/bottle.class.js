class Bottle extends MoveableObject {
    height = 80
    width = 80

    y = 350;
    x = 200;

    offset = {
        top: 20,
        left: 40,
        right: 0,
        bottom: 30,
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
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