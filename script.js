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
    // Adjust volume or playback speed
    video[event.target.name] = event.target.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;

    if (window.CSS && CSS.number) {
        // Supports CSS Typed OM
        progressBar.attributeStyleMap.set("flex-basis", CSS.percent(percent));
    } else {
        progressBar.style.flexBasis = `${percent}%`;
    }

}

function scrubTimeline(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipBtns.forEach(btn => btn.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

let mouseDown = false; // Flag for event
progress.addEventListener("click", scrubTimeline);
progress.addEventListener("mousemove", (event) => {
    if (mouseDown) {
        scrubTimeline(event);
    };
});
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);