const previewCarousel = document.querySelector('.carousel__content');
const videoMain = document.querySelector('.zoo__player');
const videoPreview = document.querySelector('.zoo__preview');

previewCarousel.addEventListener('click', (e) => {
  console.log('hui');
  const temp = videoMain.getAttribute('src');
  videoMain.setAttribute('src', `${e.target.children[0].getAttribute('src')}`);
  e.target.children[0].setAttribute('src', `${temp}`);
});
