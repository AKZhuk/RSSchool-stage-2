const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
console.log(piano);

window.addEventListener('keydown', function (e) {
    console.log(e.key);
    playAudio('https://zvukipro.com/uploads/files/2017-09/1504526458_zvuki-prirody-penie-solovya.mp3')
})


function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }