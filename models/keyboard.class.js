class Keyboard {

    constructor() {
        this.bindBtsPressEvents();
    }

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    E = false; // Throw

    A = false; // Left
    D = false; // Right

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