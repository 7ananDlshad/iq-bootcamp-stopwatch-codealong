const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const timer = document.getElementById("timer");
const timelapsList = document.getElementById("timelaps-list");

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let interval;
let timeLaps = [];

function formattingTime(hours, minutes, seconds, milliseconds) {

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    let millisecondsString = milliseconds.toString();
    while (millisecondsString.length < 3) {
        millisecondsString = '0' + millisecondsString;
    }

    return hours + ' : ' + minutes + ' : ' + seconds + '.' + millisecondsString;
}

function timeIt() {
    milliseconds++;
    if (milliseconds > 999) {
        seconds++;
        milliseconds = 0;
    }
    if (seconds > 59) {
        minutes++;
        seconds = 0;
    }
    if (minutes > 59) {
        hours++;
        minutes = 0;
    }
    timer.innerText = formattingTime(hours, minutes, seconds, milliseconds);
}

function startStopWatch() {
    if (interval == null) {
        interval = setInterval(timeIt, 1);
    }
}

function stopStopWatch() {
    clearInterval(interval);
    interval = null;
}

function resetStopWatch() {
    clearInterval(interval);
    interval = null;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.innerText = "00 : 00 : 00.000";
    timeLaps = [];
    timelapsList.innerHTML = "";
}

function lapStopWatch() {
    let currentDate = new Date();
    let timelapped = formattingTime(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());
    timelapped = timelapped.substring(0, 7);

    let lap = {
        capturedTime: timer.innerText,
        time: timelapped
    };
    timeLaps.push(lap);

    displayLaps(timeLaps);
}

function displayLaps(arr) {
    timelapsList.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const lapDiv = document.createElement('div');
        const capturedTimeDiv = document.createElement('div');
        const capturedTimeTextNode = document.createTextNode(arr[i].capturedTime);
        const timeLappedDiv = document.createElement('div');
        const timeLappedTextNode = document.createTextNode(arr[i].time);

        capturedTimeDiv.appendChild(capturedTimeTextNode);
        timeLappedDiv.appendChild(timeLappedTextNode);
        timeLappedDiv.setAttribute('class', 'timeLappedDiv')
        lapDiv.appendChild(capturedTimeDiv);
        lapDiv.appendChild(timeLappedDiv);
        li.appendChild(lapDiv);
        timelapsList.appendChild(li);
    }
}

startButton.addEventListener('click', startStopWatch);
stopButton.addEventListener('click', stopStopWatch);
resetButton.addEventListener('click', resetStopWatch);
lapButton.addEventListener('click', lapStopWatch);