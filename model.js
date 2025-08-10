document.addEventListener('DOMContentLoaded', function () {
    var hoursElement = document.getElementById('hours');
    var minutesElement = document.getElementById('minutes');
    var secondsElement = document.getElementById('seconds');
    var millisecondsElement = document.getElementById('milliseconds');
    var startStopButton = document.getElementById('startStop');
    var resetButton = document.getElementById('reset');

    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    var timer;
    var isRunning = false;

    function updateDisplay() {
        hoursElement.textContent = padTime(hours);
        minutesElement.textContent = padTime(minutes);
        secondsElement.textContent = padTime(seconds);
        millisecondsElement.textContent = padTime(milliseconds, 3);
    }

    function padTime(time, length) {
        length = length || 2;
        var str = time.toString();
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    function startTimer() {
        isRunning = true;
        startStopButton.textContent = 'Stop';
        startStopButton.className = 'running';

        var startTime = Date.now() - (milliseconds + seconds * 1000 + minutes * 60000 + hours * 3600000);

        timer = setInterval(function () {
            var elapsedTime = Date.now() - startTime;

            hours = Math.floor(elapsedTime / 3600000);
            elapsedTime %= 3600000;

            minutes = Math.floor(elapsedTime / 60000);
            elapsedTime %= 60000;

            seconds = Math.floor(elapsedTime / 1000);
            elapsedTime %= 1000;

            milliseconds = elapsedTime;

            updateDisplay();
        }, 10);
    }

    function stopTimer() {
        isRunning = false;
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        startStopButton.className = '';
    }

    function resetTimer() {
        stopTimer();
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
    }

    startStopButton.addEventListener('click', function () {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    resetButton.addEventListener('click', resetTimer);

    updateDisplay();
});