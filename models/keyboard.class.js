class Keyboard {

    /**
     * Constructs a new Keyboard object and binds button press events.
     */
    constructor() {
        this.bindBtsPressEvents();
    }

    /**
     * Indicates whether the left key is pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates whether the right key is pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates whether the up key is pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates whether the down key is pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates whether the space key is pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates whether the E key is pressed.
     * @type {boolean}
     */
    E = false; // Throw

    /**
     * Indicates whether the A key is pressed.
     * @type {boolean}
     */
    A = false; // Left

    /**
     * Indicates whether the D key is pressed.
     * @type {boolean}
     */
    D = false; // Right

    /**
     * Binds touchstart and touchend events to the buttons.
     */
    bindBtsPressEvents() {
        document.getElementById('button-up').addEventListener('touchstart', () => { if (!world.gamePaused) this.SPACE = true; });
        document.getElementById('button-e').addEventListener('touchstart', () => { if (!world.gamePaused) this.E = true; });
        document.getElementById('button-right').addEventListener('touchstart', () => { if (!world.gamePaused) this.RIGHT = true; });
        document.getElementById('button-left').addEventListener('touchstart', () => { if (!world.gamePaused) this.LEFT = true; });
        document.getElementById('button-up').addEventListener('touchend', () => { if (!world.gamePaused) this.SPACE = false; });
        document.getElementById('button-e').addEventListener('touchend', () => { if (!world.gamePaused) this.E = false; });
        document.getElementById('button-right').addEventListener('touchend', () => { if (!world.gamePaused) this.RIGHT = false; });
        document.getElementById('button-left').addEventListener('touchend', () => { if (!world.gamePaused) this.LEFT = false; });
    }
}