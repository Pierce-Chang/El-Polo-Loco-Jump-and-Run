class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 350;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = x + Math.random() * 200; // Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        setInterval (() => {
            this.moveLeft();
        }, 80)
    }
}