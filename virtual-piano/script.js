const docElement = document.documentElement;
const piano = document.querySelector(".piano");
const pianoKey = document.querySelectorAll(".piano-key");
const buttonFullScreen = document.querySelector(".openfullscreen");
const switchButton = document.querySelector(".btn-container");

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

switchButton.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-active")) {
    pianoKey.forEach((item) => item.classList.toggle("key-letter"));
    document.querySelector(".btn-active").classList.remove("btn-active");
    e.target.classList.add("btn-active");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key in letterNote) {
    playAudio(letterNote[e.key]);
  }
});

piano.addEventListener("mousedown", function (e) {
  e.target.classList.add("piano-key-active");
  playAudio(e.target.dataset.note);
});
piano.addEventListener("mouseup", function (e) {
  e.target.classList.remove("piano-key-active");
});

buttonFullScreen.addEventListener("click", function () {
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
