const songs = [
    { title: "Song One", artist: "Artist A", src: "songs/song1.mp3" },
    { title: "Song Two", artist: "Artist B", src: "songs/song2.mp3" },
    { title: "Song Three", artist: "Artist C", src: "songs/song3.mp3" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");

function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}
loadSong(currentSong);

// Play / Pause
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Next song
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// Previous song
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// Progress update
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    let min = Math.floor(audio.duration / 60);
    let sec = Math.floor(audio.duration % 60);
    duration.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});
volume.value = 0.5;

// Autoplay next (Bonus)
audio.addEventListener("ended", nextSong);

// Playlist (Bonus)
songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => {
        currentSong = index;
        loadSong(index);
        audio.play();
    };
    playlist.appendChild(li);
});
