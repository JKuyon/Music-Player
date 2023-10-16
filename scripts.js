const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music =  document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 
const songs = [
    {
        name: 'A Tribe Called Quest - After Hours',
        displayName: 'After Hours',
        artist: 'A Tribe Called Quest',
        image: 'PeoplesInstinctTravels'
    },
    {
        name: 'Lupe Fiasco - Paris, Tokyo',
        displayName: 'Paris, Tokyo',
        artist: 'Lupe Fiasco',
        image: 'TheCool'
    },
    {
        name: 'Nas - It Aint Hard to Tell',
        displayName: 'It Aint Hard to Tell',
        artist: 'Nas',
        image: 'Illmatic'
    },
    {
        name: 'Little Brother - Shortys Reprise',
        displayName: 'Shortys Reprise',
        artist: 'Little Brother',
        image: 'TheListening'
    }
];

// Check if Music is Playing
let isPlaying = false;

// Play the Music
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause the Music
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update Music & Tags
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.image}.jpg`;
}

let songIndex = 0;

// Seek Backward
function prevSong() {
    songIndex--;
    if (songIndex < 0)
    {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    // Navigate through Player
    loadSong(songs[songIndex]);
    playSong();
}

// Seek Forward
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1)
    {
        songIndex = 0;
    }
    // Navigate through Player
    loadSong(songs[songIndex]);
    playSong();
}

// Update the Progress Bar & Music Play Time
function updateProgressBar(Event) {
    if (isPlaying) {
        const { duration, currentTime } = Event.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate Current Time for Music Bar
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Scrub through Music Progress Bar
function setProgressBar(Event)
{
    const width = this.clientWidth;
    const clickX = Event.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration; // Enable music progress selection
}


// Seek Forward and Backward Events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong); // After Music Finishes, seek to next song
music.addEventListener('timeupdate', updateProgressBar); // Update Music Bar Progression
progressContainer.addEventListener('click', setProgressBar);



