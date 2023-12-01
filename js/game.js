let canvas = [];
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    initBackgroundMusic();
    startGame();
}

function initBackgroundMusic() {
    const backgroundAudio = audios.find((a) => a.audioName === "backgroundMusic");
    if (backgroundAudio) {
        playAudio("backgroundMusic");
        backgroundAudio.isPlaying = true;
    }
}


function toggleControlls() {
    let controlls = document.getElementById('controlls');
    if (controlls.style.display === 'none') {
        controlls.style.display = 'flex';
    } else {
        controlls.style.display = 'none';
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('content');
    if (!document.fullscreenElement) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function startGame() {
    startscreen = document.getElementById('startscreen');
    canvas = document.getElementById('canvas');
    startscreen.style.display = 'none';
    canvas.style.display = 'block';

}

function endGame() {
    endscreen = document.getElementById('endscreen');
    endscreen.style.display = 'block';
}


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