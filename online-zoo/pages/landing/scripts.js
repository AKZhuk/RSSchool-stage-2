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

const $ = (selector) => {
  return document.querySelector(selector);
};

function next() {
  if ($('.hide')) {
    $('.hide').remove();
  }

  /* Step */

  if ($('.prev')) {
    $('.prev').classList.add('hide');
    $('.prev').classList.remove('prev');
  }

  $('.act').classList.add('prev');
  $('.act').classList.remove('act');

  $('.next').classList.add('act');
  $('.next').classList.remove('next');

  /* New Next */

  $('.new-next').classList.remove('new-next');

  const addedEl = document.createElement('div');

  slider.appendChild(addedEl);
  addedEl.classList.add('dot', 'new-next', 'gallery__card');
}

function prev() {
  $('.new-next').remove();

  /* Step */

  $('.next').classList.add('new-next');

  $('.act').classList.add('next');
  $('.act').classList.remove('act');

  $('.prev').classList.add('act');
  $('.prev').classList.remove('prev');

  /* New Prev */

  $('.hide').classList.add('prev');
  $('.hide').classList.remove('hide');

  const addedEl = document.createElement('div');

  slider.insertBefore(addedEl, slider.firstChild);
  addedEl.classList.add('dot', 'prev', 'gallery__card');
}

slide = (element) => {
  /* Next slide */

  if (element.classList.contains('next')) {
    next();

    /* Previous slide */
  } else if (element.classList.contains('prev')) {
    prev();
  }
};

const slider = $('.gallery__carousel');

slider.onclick = (event) => {
  slide(event.target);
};
