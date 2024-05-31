let soundMuted = false;

let bgMusic = new Audio("audio/latin_bg_music_2.ogg");


function muteGame() {
    document.getElementById("mute-button").style.display = "none"
    document.getElementById("unmute-button").style.display = "block"
    soundMuted = true;
    playBgMusic();
}


function unmuteGame() {
    document.getElementById("mute-button").style.display = "block"
    document.getElementById("unmute-button").style.display = "none"
    soundMuted = false;
    playBgMusic();
}


function playBgMusic() {
    if(!soundMuted) {
        bgMusic.loop = true;

        // Check if the audio can be played immediately
        if (bgMusic.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
            // Add an event listener for user interaction to play the music
            document.addEventListener('keydown', enableAudio.bind(this), { once: true });
        } else {
            // Fallback to event listener if readyState is not sufficient
            bgMusic.addEventListener('loadeddata', () => {
                document.addEventListener('keydown', enableAudio.bind(this), { once: true });
            });
        }
    } else {
        // Stop the music if sound is muted
        bgMusic.pause();
        bgMusic.currentTime = 0; // Reset playback position to the beginning
      }
}


function enableAudio() {
    bgMusic.play().catch(error => {
        console.error('Autoplay was prevented:', error);
    });
}


function disableAudio() {
    bgMusic.stop()
}


playBgMusic();