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
const actionBtn = document.querySelector("#openPop");
const actionAll = document.querySelector(".allAction");
const SongName = document.querySelector("#songName");
const AsrtistName = document.querySelector("#artistName");
const playListName = document.querySelector("#playListName");
const playlistPop = document.querySelector("#actionContainer");

let isPlaying = false;
let isRepeatAudio = false;

let favouriteSongs = {
  name: "Your Favourite Songs",
  songs: [],
};
let allPlaylists = [
  {
  name: `Bollywood Hits 2023 `,
  songs: [
    {
      audio: "./audio/audio1.mp3",
      thumbnail: "./images/image1.jpg",
      song: "Love is Life",
      artist: "Jone Rock",
      isLiked: false,
    },
    {
      audio: "./audio/audio2.mp3",
      thumbnail: "./images/image2.jpg",
      song: "O Bala O Bala",
      artist: "Sandeep Vidhi",
      isLiked: false,
    },
    {
      audio: "./audio/audio3.mp3",
      thumbnail: "./images/image3.jpg",
      song: "Teri Muskan",
      artist: "Arman",
      isLiked: false,
    },
    {
      audio: "./audio/audio4.mp3",
      thumbnail: "./images/image4.jpg",
      song: "Pare Pare tere Aakh",
      artist: "Pushpa Raj",
      isLiked: false,
    },
  ]
},
{
  name: `Bollywood old song `,
  songs: [
    {
      audio: "./audio/audio1.mp3",
      thumbnail: "./images/image1.jpg",
      song: "Love is Life",
      artist: "Jone Rock",
      isLiked: false,
    },
    {
      audio: "./audio/audio2.mp3",
      thumbnail: "./images/image2.jpg",
      song: "O Bala O Bala",
      artist: "Sandeep Vidhi",
      isLiked: false,
    },
    {
      audio: "./audio/audio3.mp3",
      thumbnail: "./images/image3.jpg",
      song: "Teri Muskan",
      artist: "Arman",
      isLiked: false,
    },
    {
      audio: "./audio/audio4.mp3",
      thumbnail: "./images/image4.jpg",
      song: "Pare Pare tere Aakh",
      artist: "Pushpa Raj",
      isLiked: false,
    },
  ]
}
]
let playList = allPlaylists[0];
let currentSong = 0;
let isPlayListRepeat = false;
let isPlayListsPopOpen= false;
var accordions = document.getElementsByClassName("accordion");
var panelClass = document.querySelector(".panel");




actionBtn.addEventListener("click",()=>{
  playListsPopOpen();
});

function playListsPopOpen(){
  if (!isPlayListsPopOpen) {
    playlistPop.style.display = "block";
  } else {
    playlistPop.style.display = "none";
  }
  isPlayListsPopOpen = !isPlayListsPopOpen;
}
accordionsText();
function accordionsText(){
      renderSongInPlaylist(favouriteSongs.songs, favouriteSongs.name, -1);
    for(let i=0; i<allPlaylists.length; i++){
      console.log(i)
      renderSongInPlaylist(allPlaylists[i].songs, allPlaylists[i].name, i);
    }
    renderPlaylist();
}
 function renderSongInPlaylist(songs, playlistName, indexOfCurrentPlaylist){
  let AccordionBtn = `<button class="accordion"><i class="fa-solid fa-notes-medical" title="Playlist"></i> `;
  let panelUlOpen =
    indexOfCurrentPlaylist === -1
      ? `</button><div class="panel"><ul id="myFavouriteSongs">`
      : `</button><div class="panel"><ul>`;
  let panelUlClose = `</ul></div>`;
  let innerHTMLContent = "";
  let divEle = document.createElement("div");
  for (let j = 0; j < songs.length; j++) {
    console.log(indexOfCurrentPlaylist, j);
    innerHTMLContent += `<li class="playlistSong" onclick="playSong(${indexOfCurrentPlaylist},${j})"><i class="fa-solid fa-music"></i> ${songs[j].song}</li>`;
  }
  divEle.innerHTML = `${AccordionBtn} ${playlistName} ${panelUlOpen} ${innerHTMLContent} ${panelUlClose}`;
  actionAll.appendChild(divEle);
  innerHTMLContent = "";
 }
playSong(0,0);
function playSong(playListIndex, songIndex){
  if(playListIndex===-1){
    playList = favouriteSongs;
  }else{
    playList = allPlaylists[playListIndex];
  }
  currentSong = songIndex;
  setSongDetails(
    playList.songs[songIndex].song,
    playList.songs[songIndex].artist
  ); 
  playListName.innerHTML = `<i class="fa-solid fa-compact-disc disk"></i> ${
    playList.name.length > 15
      ? playList.name.substring(0, 15) + "..."
      : playList.name
  }`;
  playListName.setAttribute("title", playList.name);
  playlistPop.style.display = "none";
  isPlayListsPopOpen = false;
  songChange();
}

function renderPlaylist() {
  var i;
  for (i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");
      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}
playPauseBtn.addEventListener("click", () => {
  playPauseAudio();
});
function playPauseAudio() {
  if (isPlaying) {
    myAudio.pause();
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    playPauseColors("purple", "grey");
  } else {
    myAudio.play();
    playPauseColors("red", "white");
    playPauseBtn.classList.replace("fa-play", "fa-pause");
  }
  isPlaying = !isPlaying;
}

function playPauseColors(bgColor, color) {
  playPauseBtn.style.backgroundColor = bgColor;
  playPauseBtn.style.borderColor = color;
  playPauseBtn.style.color = color;
}

likeBtn.addEventListener("click", () => {
  let isLike = !playList.songs[currentSong].isLiked;
  isSongLiked(isLike);
});

function isSongLiked(isLike) {
  playList.songs[currentSong].isLiked = isLike;
  likeBtn.classList.replace(
    isLike ? "fa-regular" : "fa-solid",
    isLike ? "fa-solid" : "fa-regular"
  );
  if(isLike){
    favouriteSongs.songs.push(playList.songs[currentSong]);
    console.log(favouriteSongs);
    addSongInFavouritePlaylist(favouriteSongs.songs.length-1);
  }
  likeBtn.style.color = isLike ? "red" : "grey";
}

function addSongInFavouritePlaylist(newSongIndex){
  const myplaylist = document.querySelector("#myFavouriteSongs");
  let indexOfCurrentPlaylist = -1;
  let myLi = document.createElement("li");
  myLi.classList.add("playlistSong");
  myLi.setAttribute(
    "onclick",
    `playSong(${indexOfCurrentPlaylist},${newSongIndex})`
  );
  console.log(indexOfCurrentPlaylist, newSongIndex);
  let innerHTMLContent = `<i class="fa-solid fa-music"></i> ${favouriteSongs.songs[newSongIndex].song}`;
  myLi.innerHTML = innerHTMLContent;
  myplaylist.appendChild(myLi);
}

myAudio.addEventListener("timeupdate", (audio) => {
  let totalAudioTime = audio.target.duration;
  let currentAudioTime = audio.target.currentTime;

  calulateTimes(totalAudioTime, currentAudioTime);
});

repeatSongBtn.addEventListener("click", () => {
  repeatSong();
  isRepeatAudio = !isRepeatAudio;
});

function repeatSong() {
  // isRepeatAudio ==true stop the loop else start the loop
  myAudio.loop = !isRepeatAudio;
  repeatSongBtn.style.color = isRepeatAudio ? "grey" : "white";
}

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
    currentSong = currentSong % playList.songs.length;
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
  if (currentSong < playList.songs.length - 1) {
    currentSong++;
    songChange();
  }
});

function songChange(isPlay = false) {
  if (isRepeatAudio) {
    repeatSong();
  }
  myAudio.setAttribute("src", playList.songs[currentSong].audio);
  songThumbnail.setAttribute("src", playList.songs[currentSong].thumbnail);
  setSongDetails(playList.songs[currentSong].song, playList.songs[currentSong].artist);
  let totalAudioTime = myAudio.duration;
  let currentAudioTime = myAudio.currentTime;
  calulateTimes(totalAudioTime, currentAudioTime);
  isPlaying = isPlay;
  isSongLiked(playList.songs[currentSong].isLiked);
  playPauseAudio();
}
function disabledBackwardForward(btn, songNo, isBackward) {
  if (songNo === 0 || songNo === playList.songs.length - 1) {
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
function repeatPlayList(songNo, isBackward = false) {
  if (isPlayListRepeat && isBackward && songNo == 0) {
    currentSong = playList.songs.length;
  }
  if (isPlayListRepeat && !isBackward && songNo == playList.songs.length - 1) {
    currentSong = -1;
  }
}

function setSongDetails(song, artist) {
  SongName.setAttribute("title", song);
  AsrtistName.setAttribute("title", artist);
  if(song.length > 12) {
    song = song.substring(0, 12) + "...";
  }
  if (artist.length > 12) {
    artist = artist.substring(0, 8) + "...";
  }
  SongName.innerHTML = `<i class="fa-solid fa-music"></i> ${song}`;
  AsrtistName.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${artist}`;
  myAudio.setAttribute('src',playList.songs[currentSong].audio);
}

// function resetMusicPlayer(newPlaylist, startingSongIndex) {
//   playList = playList;
//   playListName.innerHTML = playList.name;
//   currentSong = startingSongIndex;
//   setSongDetails(
//     playList.songs[currentSong].song,
//     playList.songs[currentSong].artist
//   );
//   songChange(true);
// }
// resetMusicPlayer(playList, 2);
