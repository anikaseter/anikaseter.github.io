let stopButton = document.getElementById('photo');
let stopText = document.getElementById('stopText');
let spinningPhoto = document.getElementById('spinningPhoto');
let isButtonSpinning = true;
let sleepButton = document.getElementById('sleep');
let sleepText = document.getElementById('sleepText');
let darkness = document.getElementById('darkness');
let isDark = false;

stopButton.addEventListener('click', pausePhoto);
sleepButton.addEventListener('click', sleep);

function pausePhoto() {
    if(isButtonSpinning) {
        spinningPhoto.style.animationPlayState = 'paused';
        spinningPhoto.querySelector('img').style.animationPlayState = 'paused';
        stopText.textContent = 'Start the Photo';
        isButtonSpinning = false;
    }
    else if(!isButtonSpinning) {
        spinningPhoto.style.animationPlayState = 'running';
        spinningPhoto.querySelector('img').style.animationPlayState = 'running';
        stopText.textContent = 'Stop the Photo';
        isButtonSpinning = true;
    }
}

function sleep() {
    if(!isDark) {
        darkness.style.display = 'unset';
        sleepText.textContent = 'Wake Up';
        sleepText.style.backgroundColor = 'rgb(5, 20, 31)';
        isDark = true;
    }
    else if(isDark) {
        darkness.style.display = 'none';
        sleepText.textContent = 'Go to Sleep';
        sleepText.style.backgroundColor = 'rgb(33, 97, 140)';
        isDark = false;
    }
}