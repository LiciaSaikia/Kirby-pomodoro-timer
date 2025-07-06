let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let isComplete = false;

const timerDisplay = document.getElementById("timer");
const statusText = document.getElementById("status");
const petImage = document.getElementById("mainPet");
const sound = document.getElementById("victorySound");
const timeInput = document.getElementById("timeInput");

function updateTimerDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startPomodoro() {
  if (isRunning) return;

  if (isComplete) {
    resetTimer(); // Bring back to normal
  }

  const inputMinutes = parseInt(timeInput.value);
  if (isNaN(inputMinutes) || inputMinutes <= 0) return;

  timeLeft = inputMinutes * 60;
  updateTimerDisplay();

  isRunning = true;
  isComplete = false;
  statusText.textContent = "FOCUSING...";
  petImage.src = "assets/kirby_sleeping.gif";
  sound.pause();
  sound.currentTime = 0;

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endPomodoro();
    }
  }, 1000);
}

function endPomodoro() {
  isRunning = false;
  isComplete = true;
  petImage.src = "assets/kirby_dance.gif";
  statusText.textContent = "YAY! YOU MADE IT!";
  sound.play();
}

function resetTimer() {
  clearInterval(timer);
  const input = parseInt(timeInput.value || "25");
  timeLeft = input * 60;
  isRunning = false;
  isComplete = false;
  updateTimerDisplay();
  petImage.src = "assets/kirby.png";
  statusText.textContent = "READY TO FOCUS?";
  sound.pause();
  sound.currentTime = 0;
}

updateTimerDisplay();
