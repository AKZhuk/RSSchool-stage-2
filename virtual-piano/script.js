const piano = document.querySelector(".piano");
const pianoKey = document.querySelectorAll(".piano-key");
const buttonFullScreen = document.querySelector(".openfullscreen");
const switchButtonContainer = document.querySelector(".btn-container");
const switchButtons = document.querySelectorAll(".btn");
const letterNote = {
  KeyD: "c",
  KeyF: "d",
  KeyG: "e",
  KeyH: "f",
  KeyJ: "g",
  KeyK: "a",
  KeyL: "b",
  KeyR: "c♯",
  KeyT: "d♯",
  KeyU: "f♯",
  KeyI: "g♯",
  KeyO: "a♯",
};

buttonFullScreen.addEventListener("mousedown", () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

switchButtonContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-active")) {
    pianoKey.forEach((item) => item.classList.toggle("key-letter"));
    switchButtons.forEach((item) => item.classList.toggle("btn-active"));
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code in letterNote && !e.repeat) {
    let pianoKeyLetter = document.querySelector(`[data-letter=${e.code[3]}]`);
    addClass(pianoKeyLetter);
    playAudio(letterNote[e.code]);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code in letterNote) {
    let pianoKeyLetter = document.querySelector(`[data-letter=${e.code[3]}]`);
    removeClass(pianoKeyLetter);
  }
});

piano.addEventListener("mousedown", startListenOver);

window.addEventListener("mouseup", stopListenOver);

function startListenOver(e) {
  if (e.target.classList.contains("piano-key")) {
    addClass(e.target);
    playAudio(e.target.dataset.note);
  }
  pianoKey.forEach((key) => {
    key.addEventListener("mouseover", pressKey);
    key.addEventListener("mouseout", upKey);
  });
}

function stopListenOver() {
  pianoKey.forEach((key) => {
    removeClass(key);
    key.removeEventListener("mouseover", pressKey);
    key.removeEventListener("mouseout", upKey);
  });
}

function pressKey(e) {
  addClass(e.target);
  playAudio(e.target.dataset.note);
}

function upKey(e) {
  removeClass(e.target);
}

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
