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
