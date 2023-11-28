class Coin extends MoveableObject {
    height = 100
    width = 100

    offset = {
        top: 20,
        left: 20,
        right: 40,
        bottom: 40,
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    collectcoin = new Audio('audio/collectcoin.mp3');

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}
