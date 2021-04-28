let checkbox = document.querySelector('input[name=theme]');
let html = document.querySelector('.html');

checkbox.addEventListener('change', function () {
  if (this.checked) {
    localStorage.setItem('theme', 'dark-theme');
    html.classList.remove('light-theme');
    html.classList.add('dark-theme');
    let map = document.querySelector('.map__object').contentWindow.document.querySelector('svg');
    map.classList.remove('light-theme');
    map.classList.add('dark-theme');
  } else {
    localStorage.setItem('theme', 'light-theme');
    html.classList.add('light-theme');
    html.classList.remove('dark-theme');
    let map = document.querySelector('.map__object').contentWindow.document.querySelector('svg');

    map.classList.add('light-theme');
    map.classList.remove('dark-theme');
  }
});

const carousel = document.querySelector('.layout-4-column-wrapper'),
  content = document.querySelector('.layout-4-column'),
  next = document.getElementById('next'),
  prev = document.getElementById('prev'),
  range = document.querySelector('#petsRange'),
  output = document.querySelector('#PetsOutput');

let slideIndex = 0;

let width = carousel.offsetWidth;
window.addEventListener('resize', (e) => {
  width = carousel.offsetWidth;
});

next.addEventListener('click', (e) => {
  slideIndex++;
  updateSliderControl(slideIndex + 1);
  if (slideIndex >= 8) {
    slideIndex = 0;
    updateSliderControl(1);
  }
  carousel.scrollTo(width * slideIndex, 0);
});

prev.addEventListener('click', (e) => {
  updateSliderControl(slideIndex);
  slideIndex--;
  console.log(slideIndex);
  if (slideIndex < 0) {
    slideIndex = 7;
    updateSliderControl(8);
  }
  carousel.scrollTo(width * slideIndex, 0);
});

const updateSliderControl = (value) => {
  range.value = value;
  output.innerText = `0${value}/`;
};

range.addEventListener('input', (e) => {
  carousel.scrollTo(width * (e.target.value - 1), 0);
});
