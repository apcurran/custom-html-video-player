"use strict";

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateBtn(event) {
    const icon = event.target.paused ? "►" : "❚ ❚";
    
    toggle.textContent = icon;
}

function skip(event) {
    video.currentTime += Number(event.target.dataset.skip);
}

function handleRangeUpdate(event) {
    console.log(event.target.value);
}

// Event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);

toggle.addEventListener("click", togglePlay);
skipBtns.forEach(btn => btn.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));