class Level {
    /**
     * The enemies in the level.
     * @type {Array}
     */
    enemies;

    /**
     * The clouds in the level.
     * @type {Array}
     */
    clouds;

    /**
     * The coins in the level.
     * @type {Array}
     */
    coins;

    /**
     * The bottles in the level.
     * @type {Array}
     */
    bottles;

    /**
     * The background objects in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * The x-coordinate of the end of the level.
     * @type {number}
     */
    level_end_x = 2200;

    /**
     * Constructs a new Level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} bottles - The bottles in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}