/**
 * Array containing audio configurations.
 * @type {AudioConfig[]}
 */
let audios = [
    {
        audioName: "backgroundSound",
        src: "audio/background.mp3",
        loop: true,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "walkingSound",
        src: "audio/walking.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "deathSound",
        src: "audio/gameLost.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "hurtSound",
        src: "audio/characterHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "jumpSound",
        src: "audio/characterJump.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "snoreSound",
        src: "audio/characterSnore.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "coinSound",
        src: "audio/coinCollected.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleSmashed",
        src: "audio/bottleSmashed.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleCollected",
        src: "audio/bottleCollected.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endboss",
        src: "audio/endboss.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "chickenHit",
        src: "audio/chickenHit.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "gameLost",
        src: "audio/gameLost.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "gameWon",
        src: "audio/gameWon.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
];

/**
 * Plays the specified audio.
 * @param {string} audioName - The name of the audio to play.
 */
function playAudio(audioName) {
    const audio = audios.find((a) => a.audioName === audioName);

    if (audio && !audio.isPlaying) {
        if (!audio.audioElement || audio.audioElement.paused || audio.audioElement.ended) {
            if (audio.audioElement) {
                audio.audioElement.pause();
                audio.audioElement.currentTime = 0;
            } else {
                audio.audioElement = new Audio(audio.src);
                audio.audioElement.loop = audio.loop;
                audio.audioElement.volume = audio.volume;
            }

            audio.audioElement.removeEventListener("ended", onAudioEnded);
            audio.audioElement.addEventListener("ended", onAudioEnded);

            audio.audioElement.play();
        }
    }
}

function onAudioEnded() {
    this.currentTime = 0;
    this.pause();
}

function pauseAudio(audioName) {
    const audio = audios.find((a) => a.audioName === audioName);

    if (audio && audio.audioElement) {
        audio.audioElement.pause();
        audio.audioElement.currentTime = 0;
    }
}

/**
 * Toggles the background music.
 */
function toggleMusic() {
    const backgroundAudio = audios.find((a) => a.audioName === "backgroundSound");

    if (backgroundAudio) {
        if (!backgroundAudio.isPlaying) {
            setIsPlayingToTrue();
            allAudiosPaused();
        } else {
            setIsPlayingToFalse();
            allAudiosPlay();
        }
    }
}

/**
 * Sets the 'isPlaying' property of all audios to false.
 */
function setIsPlayingToFalse() {
    audios.forEach((audio) => {
        audio.isPlaying = false;
    });
}

/**
 * Sets the 'isPlaying' property of all audios to true.
 */
function setIsPlayingToTrue() {
    audios.forEach((audio) => {
        audio.isPlaying = true;
    });
}

/**
 * Pauses all audios.
 */
function allAudiosPaused() {
    audios.forEach((audio) => {
        pauseAudio(audio.audioName);
    });
}

/**
 * Plays all audios.
 */
function allAudiosPlay() {
    audios.forEach((audio) => {
        playAudio("backgroundSound");
    });
}
