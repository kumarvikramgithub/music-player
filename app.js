const playPauseBtn = document.querySelector("#playPause");
const backwardBtn = document.querySelector("#backward");
const forwardBtn = document.querySelector("#forward");
const myAudio = document.querySelector("#myAudio");
const likeBtn = document.querySelector("#addLike");
const repeatPlayListBtn = document.querySelector("#repeatPlayList");

const trackBar = document.querySelector(".track");
const progressBarTack = document.querySelector(".progressBar");

const currentDuration = document.querySelector("#currentTime");
const totalDuration = document.querySelector("#totalDuration");

let isPlaying = false;
playPauseBtn.addEventListener("click", ()=>{
    playPauseAudio();
});
 function playPauseAudio() {

    if(isPlaying){
        myAudio.pause();
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playPauseBtn.style.backgroundColor = "purple";
        playPauseBtn.style.borderColor = "grey";
        playPauseBtn.style.color = "grey";
    }else{
        myAudio.play();
        playPauseBtn.style.backgroundColor = "red";
        playPauseBtn.style.borderColor = "white";
        playPauseBtn.style.color = "white";
        playPauseBtn.classList.replace(
          "fa-play",
          "fa-pause"
        );
    }
    isPlaying = !isPlaying;
 }


 let isLiked = false;
 likeBtn.addEventListener("click",()=>{
    if (!isLiked) {
        likeBtn.classList.replace("fa-regular", "fa-solid");
        likeBtn.style.color = "red";
    }else{
        likeBtn.classList.replace("fa-solid", "fa-regular");
        likeBtn.style.color = "grey";
    }
    likeBtn.classList.add("hover");
    isLiked = !isLiked;
 })


 myAudio.addEventListener("timeupdate", (audio)=>{
    let totalAudioTime = audio.target.duration;
    let currentAudioTime = audio.target.currentTime;

    calulateTimes(totalAudioTime, currentAudioTime);

 })

 let isRepeatAudio = false;
 repeatPlayListBtn.addEventListener("click", ()=>{
    if(isRepeatAudio){
        myAudio.loop = false;
        repeatPlayListBtn.style.color="grey";
    } 
    else{
        myAudio.loop = true;
        repeatPlayListBtn.style.color="white";

    }
    isRepeatAudio = !isRepeatAudio;
 })

 trackBar.addEventListener("click",(track)=>{
    console.log(track);
    let totalPageWidth = window.innerWidth;
    let leftPadding = 60;
    let musicPlayerCardWidth = 420; // 300-image-width 60+60 left and right padding
    let PageWidthWithoutMusicPlay = totalPageWidth - musicPlayerCardWidth; // width of left and right side of music player
    let startingTrackPoint = (PageWidthWithoutMusicPlay / 2) + leftPadding;
    let currentClickedPoint = track.clientX - startingTrackPoint;
    let percentageMove = (currentClickedPoint / 300) * 100;
    progressBarTack.style.width = `${percentageMove}%`;

    let totalAudioTime = myAudio.duration;
    let currentAudioTime = (percentageMove*totalAudioTime)/100;

    calulateTimes(totalAudioTime, currentAudioTime);
    myAudio.currentTime = currentAudioTime;
    isPlaying = false; // to start playing automatically
    playPauseAudio();
 })

 function calulateTimes(totalAudioTime, currentAudioTime) {
   // Auto pause, when completed
   if (totalAudioTime === currentAudioTime) {
     playPauseAudio();
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