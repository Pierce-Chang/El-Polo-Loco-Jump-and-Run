let canvas = [];
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas, world, background music, and starting the game.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    initBackgroundMusic();
    startGame();
    addKeyListeners();
}

/**
 * Initializes the background music for the game.
 */
function initBackgroundMusic() {
    const backgroundAudio = audios.find((a) => a.audioName === "backgroundMusic");
    if (backgroundAudio) {
        playAudio("backgroundMusic");
        backgroundAudio.isPlaying = true;
    }
}

/**
 * Toggles the display of the game controls.
 */
function toggleControlls() {
    let controlls = document.getElementById('controlls');
    if (controlls.style.display === 'none') {
        controlls.style.display = 'flex';
    } else {
        controlls.style.display = 'none';
    }
}

/**
 * Toggles fullscreen mode for the game.
 */
function fullscreen() {
    let fullscreen = document.getElementById('content');
    if (!document.fullscreenElement) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
}

/**
 * Enters fullscreen mode for the given element.
 * @param {HTMLElement} element - The element to display in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Starts the game by hiding the start screen and displaying the canvas.
 */
function startGame() {
    startscreen = document.getElementById('startscreen');
    canvas = document.getElementById('canvas');
    startscreen.style.display = 'none';
    canvas.style.display = 'block';
}

/**
 * Ends the game by displaying the end screen.
 */
function endGame() {
    endscreen = document.getElementById('endscreen');
    endscreen.style.display = 'block';
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Event listener for keydown events.
 * Sets the corresponding property in the keyboard object to true if the key is pressed and the endboss is not dead.
 */
function addKeyListeners() {
    window.addEventListener('keydown', (e) => {
        if (!world.endbossIsDead) {
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
        }
    });

    /**
     * Event listener for keyup events.
     * Sets the corresponding property in the keyboard object to false when the key is released.
     */
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
}