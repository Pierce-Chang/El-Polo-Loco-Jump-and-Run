class Level {
    enemies;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}