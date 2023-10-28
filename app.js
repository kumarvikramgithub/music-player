const playPauseBtn = document.querySelector("#playPause");
const backwardBtn = document.querySelector("#backward");
const forwardBtn = document.querySelector("#forward");
const myAudio = document.querySelector("#myAudio");
const likeBtn = document.querySelector("#addLike");
const repeatSongBtn = document.querySelector("#repeatSong");

const trackBar = document.querySelector(".track");
const progressBarTack = document.querySelector(".progressBar");

const currentDuration = document.querySelector("#currentTime");
const totalDuration = document.querySelector("#totalDuration");

const songThumbnail = document.querySelector("#songThumbnail");

const repeatPlayListBtn = document.querySelector("#repeatPlayList");
const SongName = document.querySelector("#songName");
const AsrtistName = document.querySelector("#artistName");
const playListName = document.querySelector("#playListName");

let isPlaying = false;
let isLiked = false;
let isRepeatAudio = false;
const playList = {
  name: `<i class="fa-solid fa-compact-disc disk"></i>Bollywood Hits 2023 `,
songs: [
  {
    audio: "./audio/audio1.mp3",
    thumbnail: "./images/image1.jpg",
    song: "Love is Life",
    artist: "Jone Rock",
  },
  {
    audio: "./audio/audio2.mp3",
    thumbnail: "./images/image2.jpg",
    song: "O Bala O Bala",
    artist: "Sandeep Vidhi",
  },
  {
    audio: "./audio/audio3.mp3",
    thumbnail: "./images/image3.jpg",
    song: "Teri Muskan",
    artist: "Arman",
  },
  {
    audio: "./audio/audio4.mp3",
    thumbnail: "./images/image4.jpg",
    song: "Pare Pare tere Aakh",
    artist: "Pushpa Raj",
  },
]
}
let currentSong = 0;
let isPlayListRepeat = false;

let favroiteAudio = [];

playPauseBtn.addEventListener("click", () => {
  playPauseAudio();
});
function playPauseAudio() {
  if (isPlaying) {
    myAudio.pause();
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    playPauseBtn.style.backgroundColor = "purple";
    playPauseBtn.style.borderColor = "grey";
    playPauseBtn.style.color = "grey";
  } else {
    myAudio.play();
    playPauseBtn.style.backgroundColor = "red";
    playPauseBtn.style.borderColor = "white";
    playPauseBtn.style.color = "white";
    playPauseBtn.classList.replace("fa-play", "fa-pause");
  }
  isPlaying = !isPlaying;
}

likeBtn.addEventListener("click", () => {
  if (!isLiked) {
    likeBtn.classList.replace("fa-regular", "fa-solid");
    likeBtn.style.color = "red";
    favroiteAudio.push(myAudio);
    localStorage.setItem("favroite", favroiteAudio);
    // let fs = localStorage.getItem("favroite");
  } else {
    likeBtn.classList.replace("fa-solid", "fa-regular");
    likeBtn.style.color = "grey";
  }
  likeBtn.classList.add("hover");
  isLiked = !isLiked;
});

myAudio.addEventListener("timeupdate", (audio) => {
  let totalAudioTime = audio.target.duration;
  let currentAudioTime = audio.target.currentTime;

  calulateTimes(totalAudioTime, currentAudioTime);
});

repeatSongBtn.addEventListener("click", () => {
  if (isRepeatAudio) {
    myAudio.loop = false;
    repeatSongBtn.style.color = "grey";
  } else {
    myAudio.loop = true;
    repeatSongBtn.style.color = "white";
  }
  isRepeatAudio = !isRepeatAudio;
});

trackBar.addEventListener("click", (track) => {
  let totalPageWidth = window.innerWidth;
  let leftPadding = 60;
  let musicPlayerCardWidth = 420; // 300-image-width 60+60 left and right padding
  let PageWidthWithoutMusicPlay = totalPageWidth - musicPlayerCardWidth; // width of left and right side of music player
  let startingTrackPoint = PageWidthWithoutMusicPlay / 2 + leftPadding;
  let currentClickedPoint = track.clientX - startingTrackPoint;
  let percentageMove = (currentClickedPoint / 300) * 100;
  progressBarTack.style.width = `${percentageMove}%`;

  let totalAudioTime = myAudio.duration;
  let currentAudioTime = (percentageMove * totalAudioTime) / 100;

  calulateTimes(totalAudioTime, currentAudioTime);
  myAudio.currentTime = currentAudioTime;
  isPlaying = false; // to start playing automatically
  playPauseAudio();
});

function calulateTimes(totalAudioTime, currentAudioTime) {
  // Auto pause, when completed
  let playTime = currentAudioTime;
  if (totalAudioTime === currentAudioTime) {
    currentSong++;
    currentSong = currentSong%playList.songs.length;
    songChange();
  }

  //Start track | Start Audio progressBar
  let audioCompletePercentage = (currentAudioTime / totalAudioTime) * 100;
  progressBarTack.style.width = `${audioCompletePercentage}%`;

  // Total Duration Calculation
  let totalAudioTimeInMinutes = Math.floor(totalAudioTime / 60);
  let totalAudioTimeInSeconds = Math.floor(totalAudioTime % 60);
  if (totalAudioTimeInSeconds < 10) {
    totalAudioTimeInSeconds = `0${totalAudioTimeInSeconds}`;
  }
  totalAudioTime = `${totalAudioTimeInMinutes}:${totalAudioTimeInSeconds}`;
  totalDuration.textContent = totalAudioTime;

  // current Time Calculation
  let currentAudioTimeInMinutes = Math.floor(currentAudioTime / 60);
  let currentAudioTimeInSeconds = Math.floor(currentAudioTime % 60);
  if (currentAudioTimeInSeconds < 10) {
    currentAudioTimeInSeconds = `0${currentAudioTimeInSeconds}`;
  }
  currentAudioTime = `${currentAudioTimeInMinutes}:${currentAudioTimeInSeconds}`;
  currentDuration.textContent = currentAudioTime;
}

backwardBtn.addEventListener("click", () => {
  disabledBackwardForward(backwardBtn, currentSong, true);
  if (currentSong > 0) {
    currentSong--;
    songChange();
  }
});

forwardBtn.addEventListener("click", () => {
  disabledBackwardForward(forwardBtn, currentSong, false);
  if (currentSong < playList.length - 1) {
    currentSong++;
    songChange();
  }
});
function songChange(){
  myAudio.setAttribute("src", playList.songs[currentSong].audio);
  songThumbnail.setAttribute("src", playList.songs[currentSong].thumbnail);
  setSongDetails(playList.songs[currentSong].song, playList.songs[currentSong].artist);
  let totalAudioTime = myAudio.duration;
  let currentAudioTime = myAudio.currentTime;
  calulateTimes(totalAudioTime, currentAudioTime);
  isPlaying = false;
  playPauseAudio();
}
function disabledBackwardForward(btn, songNo, isBackward) {
  // if (song === songNo) {
  //   console.log(songNo, btn);
  //   btn.style.pointerEvents = "none";
  // }else{
  //   btn.style.pointerEvents = "auto";
  // }
  if (songNo === 0 || songNo === playList.length - 1) {
    repeatPlayList(songNo, isBackward);
  }
}

repeatPlayListBtn.addEventListener("click", () => {
  isPlayListRepeat = !isPlayListRepeat;
  if (isPlayListRepeat) {
    repeatPlayListBtn.style.color = "blue";
  } else {
    repeatPlayListBtn.style.color = "grey";
  }
});
function repeatPlayList(songNo, isBackward=false) {
  if (isPlayListRepeat && isBackward && songNo == 0) {
    currentSong = playList.length;
  }
  if (isPlayListRepeat && !isBackward && songNo == playList.length - 1) {
    currentSong = -1;
  }
}

setSongDetails(playList.songs[0].song, playList.songs[0].artist);
playListName.innerHTML = playList.name;
function setSongDetails(song, artist) {
  SongName.innerHTML = `<i class="fa-solid fa-music"></i> ${song}`;
  AsrtistName.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${artist}`;
};
