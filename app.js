let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let h3 = document.querySelector("h3");
// var audio = new Audio("/soundefx/mixkit-game-level-music-689.wav");
// audio.play();
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started!");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  var audio = new Audio("/levelup.wav");
  audio.play();
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);
}

function btnPress() {
  // console.log(this);
  let btn = this;
  btnFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  check(userSeq.length - 1);
}

let gameOverAudio = null; // Declare the audio object globally

function check(idx) {
  // console.log(`Current level is ${level}`);
  console.log(userSeq[idx]);
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! Your score is ${level} <br> Press any key to start`;
    playGameOverSound(); // Play the game over sound
    reset();
  }
}

function playGameOverSound() {
  if (!gameOverAudio) {
    // Ensure the sound plays only once
    gameOverAudio = new Audio("gameover.mp3");
    gameOverAudio.play();
  }
}

function stopGameOverSound() {
  if (gameOverAudio) {
    // Stop the audio if it is playing
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0; // Reset audio to the beginning
    gameOverAudio = null; // Clear the reference
  }
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
  // Stop the game over sound when the user presses a key to restart
  document.addEventListener("keydown", stopGameOverSound, { once: true });
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
