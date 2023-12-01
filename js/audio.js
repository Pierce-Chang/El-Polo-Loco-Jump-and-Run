/**
 * Array containing audio configurations.
 * @type {AudioConfig[]}
 */
let audios = [
    {
        audioName: "backgroundMusic",
        src: "audio/backgroundmusic.mp3",
        loop: true,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterWalking",
        src: "audio/characterWalking.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterDies",
        src: "audio/characterDies.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterGetHurt",
        src: "audio/characterGetHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterJump",
        src: "audio/characterJump.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterSleeps",
        src: "audio/characterSleeps.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "collectCoin",
        src: "audio/collectCoin.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleThrow",
        src: "audio/bottleThrow.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleSplash",
        src: "audio/bottleSplash.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleCollect",
        src: "audio/bottleCollect.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossDies",
        src: "audio/endbossDies.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossHurt",
        src: "audio/endbossHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossAttak",
        src: "audio/endbossAttak.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossAlert",
        src: "audio/endbossAlert.mp3",
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
        audioName: "smallChickenHit",
        src: "audio/smallChickenHit.mp3",
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

/**
 * Plays the specified audio multiple times simultaneously.
 * @param {string} audioName - The name of the audio to play.
 */
function playAudioMultiple(audioName) {
    const audioConfig = audios.find((a) => a.audioName === audioName);
    if (audioConfig) {
        const audio = new Audio(audioConfig.src);
        audio.loop = audioConfig.loop;
        audio.volume = audioConfig.volume;
        audio.addEventListener("ended", function() {
            this.currentTime = 0;
            this.pause();
        });
        audio.play();
    }
}

/**
 * Resets the audio playback to the start and pauses it.
 */
function onAudioEnded() {
    this.currentTime = 0;
    this.pause();
}

/**
 * Pauses the specified audio and resets its playback to the start.
 * @param {string} audioName - The name of the audio to pause.
 */
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
    let musicButton = document.getElementById("toggleAudio");
    const backgroundAudio = audios.find((a) => a.audioName === "backgroundMusic");
    if (backgroundAudio) {
        if (backgroundAudio.isPlaying) {
            pauseAudio("backgroundMusic");
            backgroundAudio.isPlaying = false;
            musicButton.src = "img/10_specific_images/sound-off.png";
        } else {
            playAudio("backgroundMusic");
            backgroundAudio.isPlaying = true;
            musicButton.src = "img/10_specific_images/sound-on.png";
        }
    }
}
