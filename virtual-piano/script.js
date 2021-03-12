const docElement = document.documentElement;
const piano = document.querySelector(".piano");
const pianoKey = document.querySelectorAll(".piano-key");
const buttonFullScreen = document.querySelector(".openfullscreen");
const switchButtonContainer = document.querySelector(".btn-container");
const switchButtons = document.querySelectorAll(".btn");
const letterNote = {
  d: "c",
  f: "d",
  g: "e",
  h: "f",
  j: "g",
  k: "a",
  l: "b",
  r: "c♯",
  t: "d♯",
  u: "f♯",
  i: "g♯",
  o: "a♯",
};

switchButtonContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-active")) {
    pianoKey.forEach((item) => item.classList.toggle("key-letter"));
    switchButtons.forEach((item) => item.classList.toggle("btn-active"));
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key in letterNote) {
    let pianoKeyLetter = document.querySelector(`[data-letter=${e.key.toUpperCase()}]`);
    changeClassList(pianoKeyLetter);
    playAudio(letterNote[e.key]);
    setTimeout((pressedPianoKey) => {
      changeClassList(pianoKeyLetter);
    }, 100);
  }
});

piano.addEventListener("mousedown", function (e) {
  changeClassList(e.target);
  playAudio(e.target.dataset.note);
});

piano.addEventListener("mouseover", function (e) {
  changeClassList(e.relatedTarget)
});

buttonFullScreen.addEventListener("mousedown", function () {
  if (docElement.requestFullscreen) {
    docElement.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

function playAudio(key) {
  const audio = new Audio();
  audio.currentTime = 0;
  audio.src = `http://127.0.0.1:5500/akzhuk-JSFE2021Q1/virtual-piano/assets/audio/${key}.mp3`;
  audio.play();
}

function changeClassList(item, changeClass = "piano-key-active") {
  item.classList.toggle(changeClass);
}
