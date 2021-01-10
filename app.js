const app = () => {
  const track = document.querySelector(".track");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  const sounds = document.querySelectorAll(".sound-picker button");

  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  const outlineLength = outline.getTotalLength();

  let fakeDuration = 1200;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      track.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(track);
    });
  });

  play.addEventListener("click", () => {
    checkPlaying(track);
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  const checkPlaying = (track) => {
    if (track.paused) {
      track.play();
      video.play();
      play.src = "./media/svg/pause.svg";
    } else {
      track.pause();
      video.pause();
      play.src = "./media/svg/play.svg";
    }
  };

  track.ontimeupdate = () => {
    let currentTime = track.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      track.pause();
      track.currentTime = 0;
      play.src = "./media/svg/play.svg";
      video.pause();
    }
  };
};

app();
