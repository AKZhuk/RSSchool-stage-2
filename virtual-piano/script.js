const piano = document.querySelector(".piano");
const pianoKey = document.querySelectorAll(".piano-key");

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

window.addEventListener("keydown", (e) => {
  if (e.key in letterNote) {
    playAudio(letterNote[e.key]);
  }
});

piano.addEventListener("click", function (e) {
  let a = e.target
  e.target.classList.add("active");
  console.log(a);
  playAudio(e.target.dataset.note);
});

function playAudio(key) {
  const audio = new Audio();
  audio.currentTime = 0;
  audio.src = `http://127.0.0.1:5500/akzhuk-JSFE2021Q1/virtual-piano/assets/audio/${key}.mp3`;
  audio.play();
}
