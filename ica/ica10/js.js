let stopButton = document.getElementById('photo');
let stopText = document.getElementById('stopText');
let spinningPhoto = document.getElementById('spinningPhoto');
let isButtonSpinning = true;
let sleepButton = document.getElementById('sleep');
let darkness = document.getElementById('darkness');

stopButton.addEventListener('click', pausePhoto);
sleepButton.addEventListener('click', sleep);

function pausePhoto() {
    if(isButtonSpinning) {
        spinningPhoto.style.animationPlayState = 'paused';
        stopText.textContent = 'Start the Photo';
        isButtonSpinning = false;
    }
    else if(!isButtonSpinning) {
        spinningPhoto.style.animationPlayState = 'running';
        stopText.textContent = 'Stop the Photo';
        isButtonSpinning = true;
    }
}

function sleep() {
    darkness.style.display = "contents";
}