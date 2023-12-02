/**
 * Instance of the Level class.
 * This represents the first level of the game.
 * @type {Level}
 */
const level1 = new Level(
    /**
     * Array of ChickenSmall and Chicken objects.
     * Each object is initialized with a specific x-coordinate.
     * @type {Array<ChickenSmall|Chicken>}
     */
    [
        new ChickenSmall(500),
        new Chicken(750),
        new ChickenSmall(1040),
        new Chicken(1480),
        new ChickenSmall(1800),
        new Chicken(2000),
    ],

    /**
     * Array of Cloud objects.
     * Each object is initialized with a specific x-coordinate.
     * @type {Array<Cloud>}
     */
    [
        new Cloud(0),
        new Cloud(400),
        new Cloud(800),
        new Cloud(1200),
        new Cloud(1600),
        new Cloud(2000),
        new Cloud(2400)
    ],
    /**
     * Array of Coin objects.
     * Each object is initialized with specific x and y coordinates.
     * @type {Array<Coin>}
     */
    [
        new Coin(400, 200),
        new Coin(660, 150),
        new Coin(920, 180),
        new Coin(1280, 100),
        new Coin(1540, 220),
    ],

    /**
     * Array of Bottle objects.
     * Each object is initialized with a specific x-coordinate.
     * @type {Array<Bottle>}
     */
    [
        new Bottle(100),
        new Bottle(100),
        new Bottle(100),
        new Bottle(100),
        new Bottle(100),
        new Bottle(100),
        new Bottle(100),
        new Bottle(100),
    ],

    /**
     * Array of BackgroundObject objects.
     * Each object is initialized with a specific image path and x-coordinate.
     * @type {Array<BackgroundObject>}
     */
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ]
);