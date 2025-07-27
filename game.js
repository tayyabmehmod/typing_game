const words = [
  "apple", "banana", "keyboard", "javascript", "mobile", "laptop",
  "university", "punjab", "pakistan", "europe", "computer", "science",
  "developer", "interface", "syntax", "function", "internet", "network",
  "variable", "constant", "browser", "website", "document", "object", "loop"
];

let currentWord = "";
let yPos = 0;
let score = 0;
let lives = 3;
let speed = 1;
let animationFrame;
let isRunning = false;

const WIN_SCORE = 20;

const wordEl = document.getElementById("falling-word");
const inputEl = document.getElementById("typed-input");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const difficultySelect = document.getElementById("difficulty");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showPopup(message) {
  document.getElementById("popup-message").innerText = message;
  document.getElementById("popup").style.display = "flex";
}

function resetWord() {
  currentWord = getRandomWord();
  wordEl.innerText = currentWord;
  yPos = 0;
  wordEl.style.top = yPos + "px";
}

function updateGame() {
  if (!isRunning) return;

  yPos += speed;
  wordEl.style.top = yPos + "px";

  if (yPos > 360) {
    lives--;
    livesEl.innerText = lives;
    if (lives === 0) {
      showPopup("💥 Game Over! Your score: " + score);
      stopGame();
      return;
    }
    resetWord();
  }

  animationFrame = requestAnimationFrame(updateGame);
}

function startGame() {
  if (!isRunning) {
    isRunning = true;
    inputEl.disabled = false;
    inputEl.focus();
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // Set speed from difficulty dropdown
    speed = parseFloat(difficultySelect.value);
    difficultySelect.disabled = true;

    resetWord();
    updateGame();
  }
}

function stopGame() {
  isRunning = false;
  inputEl.disabled = true;
  cancelAnimationFrame(animationFrame);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetGame() {
  score = 0;
  lives = 3;
  speed = parseFloat(difficultySelect.value);
  scoreEl.innerText = score;
  livesEl.innerText = lives;
  inputEl.value = "";
  stopGame();
  wordEl.style.top = "0px";
  wordEl.innerText = "Word";
  document.getElementById("popup").style.display = "none";
  difficultySelect.disabled = false;
}

inputEl.addEventListener("input", () => {
  if (inputEl.value.trim().toLowerCase() === currentWord.toLowerCase()) {
    score++;
    speed += 0.2;
    scoreEl.innerText = score;
    inputEl.value = "";

    if (score >= WIN_SCORE) {
      showPopup("🎉 You Win! Final Score: " + score);
      stopGame();
      return;
    }

    resetWord();
  }
});

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
resetBtn.addEventListener("click", resetGame);
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isMusicPlaying = false;

// Autoplay attempt on page load (some browsers may block)
window.addEventListener("load", () => {
  music.volume = 0.5;
  music.play()
    .then(() => {
      isMusicPlaying = true;
      musicBtn.innerText = "🔊";
    })
    .catch((err) => {
      console.log("Autoplay blocked. Music will start on interaction.");
    });
});

// Toggle music manually
musicBtn.addEventListener("click", () => {
  if (isMusicPlaying) {
    music.pause();
    isMusicPlaying = false;
    musicBtn.innerText = "🔇";
  } else {
    music.play()
      .then(() => {
        isMusicPlaying = true;
        musicBtn.innerText = "🔊";
      })
      .catch((err) => {
        console.log("User interaction required to play music.");
      });
  }
});
