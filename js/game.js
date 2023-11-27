let canvas = [];
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    startGame();
}

function startGame() {
    startscreen = document.getElementById('startscreen');
    canvas = document.getElementById('canvas');
    startscreen.style.display = 'none';
    canvas.style.display = 'block';

}

function endGame() {
    endscreen = document.getElementById('endscreen');
    canvas = document.getElementById('canvas');
    endscreen.style.display = 'block';
    canvas.style.display = 'none';
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 69) {
        keyboard.E = true;
    }

    if (e.keyCode == 65) {
        keyboard.A = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 69) {
        keyboard.E = false;
    }

    if (e.keyCode == 65) {
        keyboard.A = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});