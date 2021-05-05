const previewCarousel = document.querySelector('.carousel__content'),
  videoMain = document.querySelector('.zoo__player'),
  videoPreview = document.querySelector('.zoo__preview'),
  previewWrapper = document.querySelector('.zoo__preview-wrapper'),
  zoosControl = document.querySelector('#zoos__control');
let shift;

previewCarousel.addEventListener('click', (e) => {
  const temp = videoMain.getAttribute('src');
  videoMain.setAttribute('src', `${e.target.children[0].getAttribute('src')}`);
  e.target.children[0].setAttribute('src', `${temp}`);
});

zoosControl.addEventListener('click', (e) => {
  shift = e.target.id[3];
  movePreview(shift);
});

const movePreview = (shift) => {
  let previewWidth =
    previewWrapper.offsetWidth + Number(getComputedStyle(previewWrapper).marginRight.substring(2, 0));
  previewCarousel.style.transform = `translateX(${-previewWidth * Number(shift - 1) * 2}px)`;
};

window.addEventListener('resize', () => {
  movePreview(shift);
});
