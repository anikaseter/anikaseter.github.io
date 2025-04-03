const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */

const pics = ["AttitudeGoofy.jpg", "strategy.JPG", "GetLoud.JPG", "AttitudeSolo.jpeg", "TippyToes.jpeg"];

/* Declaring the alternative text for each image file */

const altText = ["Me and two friends posing for a selfie in front of a lake after filming Attitude.", "A picture from afar of nine of us in the middle of dancing Strategy.", "A picture of four of us lit by red lighting performing Get Loud.", "A solo shot of me sitting in front of a lake for Attitude.", "A shot of us on stage in the middle of performing Tippy Toes."];

/* Looping through images */

for(let i = 0; i < 5; i++) {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", "images/" + pics[i]);
    newImage.setAttribute("alt", altText[i]);
    newImage.addEventListener("click", () => displayBig("images/" + pics[i], altText[i]));
    thumbBar.appendChild(newImage);
}

function displayBig(src, altText) {
    displayedImage.setAttribute("src", src);
    displayedImage.setAttribute("alt", altText);
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", darken);
let isDark = false;

function darken() {
    if(isDark) {
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
        btn.textContent = "Darken";
        isDark = false;
    }
    else if(!isDark) {
        overlay.style.backgroundColor = "rgba(0,0,0,.5)";
        btn.textContent = "Lighten";
        isDark = true;
    }
}
