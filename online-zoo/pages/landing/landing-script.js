const $ = (selector) => {
  return document.querySelector(selector);
};

const slider = $('.gallery__carousel'),
  sliderCard = $('.gallery__card'),
  promoRange = $('.promo-range'),
  promoOutput = $('#PromoRange');
let sliderCardWidth = getElementWidth(sliderCard);

promoRange.addEventListener('input', (e) => {
  (slider.style.transform = `translateX(${-sliderCardWidth * (e.target.value - 1)}px)`), e.target.value;
  const newActive = document.getElementById(`${e.target.value}`);
  changeActiveSlide(newActive);
});

const nextItem = (nextActive) => {
  (slider.style.transform = `translateX(${-sliderCardWidth * (nextActive.id - 1)}px)`), slider.id;

  changeActiveSlide(nextActive);
  updateControl(promoRange, promoOutput, $('.act').id);
};

const prevItem = (nextActive) => {
  (slider.style.transform = `translateX(${-sliderCardWidth * ($('.act').id - 2)}px)`), slider.id;
  changeActiveSlide(nextActive);
  updateControl(promoRange, promoOutput, $('.act').id);
};

slide = (element) => {
  /* Next slide */

  if (element.id > $('.act').id) {
    nextItem(element);

    /* Previous slide */
  } else if (element.id < $('.act').id) {
    prevItem(element);
  }
};

slider.onclick = (e) => {
  if (e.target.classList.contains('gallery__card')) slide(e.target);
};

const changeActiveSlide = (nextActive) => {
  $('.act').classList.remove('act');
  nextActive.classList.add('act');
};

//Pets in Zoo slider

const carousel = document.querySelector('.layout-4-column-wrapper'),
  content = document.querySelector('.layout-4-column'),
  next = document.getElementById('next'),
  prev = document.getElementById('prev'),
  petsRange = document.querySelector('#petsRange'),
  petsOutput = document.querySelector('#PetsOutput');

let slideIndex = 0;
let carouselWidth = carousel.offsetWidth;

next.addEventListener('click', (e) => {
  slideIndex++;
  updateControl(petsRange, petsOutput, slideIndex + 1);

  if (slideIndex >= 8) {
    slideIndex = 0;
    updateControl(petsRange, petsOutput, 1);
  }

  carousel.scrollTo(carouselWidth * slideIndex, 0);
});
prev.addEventListener('click', (e) => {
  updateControl(petsRange, petsOutput, slideIndex);
  slideIndex--;

  if (slideIndex < 0) {
    slideIndex = 7;
    updateControl(petsRange, petsOutput, 8);
  }

  carousel.scrollTo(carouselWidth * slideIndex, 0);
});

petsRange.addEventListener('input', (e) => {
  carousel.scrollTo(carouselWidth * (e.target.value - 1), 0);
});

//common

const updateControl = (range, output, value) => {
  range.value = value;
  output.innerText = `0${value}/`;
};

function getElementWidth(element) {
  return element.offsetWidth + Number(getComputedStyle(element).marginRight.substring(2, 0));
}

window.addEventListener('resize', (e) => {
  carouselWidth = carousel.offsetWidth;
  sliderCardWidth = getElementWidth(sliderCard);
});
