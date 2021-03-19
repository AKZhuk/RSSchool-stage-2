const piano = document.querySelector(".piano");
const pianoKey = document.querySelectorAll(".piano-key");
const buttonFullScreen = document.querySelector(".openfullscreen");
const switchButtonContainer = document.querySelector(".btn-container");
const switchButtons = document.querySelectorAll(".btn");
const letterNote = {
  D: "c",
  F: "d",
  G: "e",
  H: "f",
  J: "g",
  K: "a",
  L: "b",
  R: "c♯",
  T: "d♯",
  U: "f♯",
  I: "g♯",
  O: "a♯",
};

switchButtonContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-active")) {
    pianoKey.forEach((item) => item.classList.toggle("key-letter"));
    switchButtons.forEach((item) => item.classList.toggle("btn-active"));
  }
});

window.addEventListener("keydown", (e) => {
  let pressKey = e.code[3];
  if (pressKey in letterNote && !e.repeat) {
    let pianoKeyLetter = document.querySelector(`[data-letter=${pressKey}]`);
    addClass(pianoKeyLetter);
    playAudio(letterNote[pressKey]);
  }
});

window.addEventListener("keyup", (e) => {
  let pressKey = e.code[3];
  if (pressKey in letterNote) {
    let pianoKeyLetter = document.querySelector(`[data-letter=${pressKey}]`);
    removeClass(pianoKeyLetter);
  }
});

piano.addEventListener("mouseover", function (e) {
  if (e.buttons == 1 && e.target.classList.contains("piano-key")) {
    removeClass(e.relatedTarget);
    addClass(e.target);
    playAudio(e.target.dataset.note);
  }
});

piano.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("piano-key")) {
    addClass(e.target);
    playAudio(e.target.dataset.note);
  }
});

window.addEventListener("mouseup", () => {
  pianoKey.forEach((key) => removeClass(key));
});

buttonFullScreen.addEventListener("mousedown", () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

function playAudio(key) {
  const audio = new Audio();
  audio.currentTime = 0;
  audio.src = `https://rolling-scopes-school.github.io/akzhuk-JSFE2021Q1/virtual-piano/assets/audio/${key}.mp3`;
  audio.play();
}

function addClass(item, changeClass = "piano-key-active") {
  item.classList.add(changeClass);
}

function removeClass(item, changeClass = "piano-key-active") {
  item.classList.remove(changeClass);
}
