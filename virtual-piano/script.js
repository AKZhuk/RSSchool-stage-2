const docElement = document.documentElement;
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
  let pressKey=e.code[3]
  if (pressKey in letterNote) {
    let pianoKeyLetter = document.querySelector(`[data-letter=${pressKey}]`);
    changeClassList(pianoKeyLetter);
    playAudio(letterNote[pressKey]);
    setTimeout(() => {
      changeClassList(pianoKeyLetter);
    }, 100);
  }
});

piano.addEventListener("mouseover", function (e) {
  if (e.buttons==1){
  changeClassList(e.relatedTarget);
  changeClassList(e.target);
  playAudio(e.target.dataset.note);
}
});

piano.addEventListener("mousedown", function (e) {

  changeClassList(e.target);
  playAudio(e.target.dataset.note);
});

piano.addEventListener("mouseup", function (e) {
  changeClassList(e.target)
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
