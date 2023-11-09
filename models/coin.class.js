class Coin extends MoveableObject {
    height = 100
    width = 100

    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png')
        this.x = x;
        this.y = 150 + Math.random() * 70;
    }
}
