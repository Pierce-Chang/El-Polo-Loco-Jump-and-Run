class Bottle extends CollectableObejct {

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = x + Math.random() * 70;
        this.y = 330;

        this.animate();
    }


    animate() {
        // Zufälligen Index auswählen
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        
        // Bild anhand des zufälligen Index setzen
        this.img = this.imageCache[this.IMAGES_BOTTLE[randomIndex]];
    }
}