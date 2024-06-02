let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function toggleStartStop() {
    isRunning ? stop() : start();
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Pause';
    isRunning = true;
}

function stop() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startStopButton.textContent = 'Start';
    isRunning = false;
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    startStopButton.textContent = 'Start';
    display.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateDisplay() {
    const time = Date.now() - startTime;
    display.textContent = formatTime(time);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return String(number).padStart(digits, '0');
}
