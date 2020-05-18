const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const timer = document.getElementById("timer");
const timelapsList = document.getElementById("timelaps-list");

let timeStarted = null;
let timeStopped = null;
let pausedDuration = 0;
let intervalId = null;
const timeLaps = [];

function padZeros(num, length = 2) {
  const padded = num.toString().split("");
  while (padded.length < length) {
    padded.unshift(0);
  }
  return padded.join("");
}

function formatTime(time) {
  const h = time.getUTCHours();
  const m = time.getUTCMinutes();
  const s = time.getUTCSeconds();
  const ms = time.getUTCMilliseconds();

  let formatted = `${padZeros(h)} : ${padZeros(m)} : ${padZeros(s)}`;

  formatted += `<span class="faint">.${padZeros(ms, 3)}</span>`;

  return formatted;
}

function getTimeElapsed(time = Date.now()) {
  const timeElapsed = new Date(time - timeStarted - pausedDuration);
  return timeElapsed;
}

function timeIt() {
  const timeLapped = getTimeElapsed();
  timer.innerHTML = formatTime(timeLapped);
}

function resetInterval() {
  clearInterval(intervalId);
  intervalId = null;
}

function startStopWatch() {
  if (timeStarted === null) {
    timeStarted = Date.now();
  }

  if (timeStopped !== null) {
    pausedDuration += Date.now() - timeStopped;
  }

  if (intervalId == null) {
    intervalId = setInterval(timeIt, 10);
  }
}

function stopStopWatch() {
  if (timeStarted) {
    timeStopped = Date.now();
    resetInterval();
  }
}

function resetStopWatch() {
  resetInterval();

  pausedDuration = 0;
  timeStarted = null;
  timeStopped = null;

  timer.innerHTML = formatTime(new Date(0));

  timeLaps.splice(0);
  displayLaps(timeLaps);
}

function recordLap() {
  const currentTime = new Date();
  let lap = {
    timeLapped: timer.innerHTML,
    capturedOn: currentTime,
  };
  timeLaps.push(lap);

  displayLaps(timeLaps);
}

function displayLaps(arr) {
  timelapsList.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");

    const capturedTimeDiv = document.createElement("div");
    capturedTimeDiv.innerHTML = arr[i].timeLapped;

    const timeLappedDiv = document.createElement("div");
    timeLappedDiv.innerText = arr[i].capturedOn.toLocaleTimeString();

    timeLappedDiv.setAttribute("class", "timeCapturedDiv");
    li.appendChild(capturedTimeDiv);
    li.appendChild(timeLappedDiv);
    timelapsList.appendChild(li);
  }
}

startButton.addEventListener("click", startStopWatch);
stopButton.addEventListener("click", stopStopWatch);
resetButton.addEventListener("click", resetStopWatch);
lapButton.addEventListener("click", recordLap);
