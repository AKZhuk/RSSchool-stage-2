const mapItems = document.querySelectorAll('.map__item');
const carouselItems = document.querySelectorAll('.carousel__item');
const btnMap = document.querySelector('.btn_map');
const range = document.querySelector('.control__range');
const output = document.querySelector('#mapRange');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const carouselIndex = {
  1: 'gorilla',
  2: 'panda',
  3: 'crocodile',
  4: 'eagle',
  5: 'tiger',
  6: 'elephant',
  7: 'lion',
  8: 'zebra',
};

range.addEventListener('input', (e) => {
  removeActiveStatus();
  const carouselItem = document.querySelector(`#carousel-${carouselIndex[e.target.value]}`);
  const mapItem = document.querySelector(`#${carouselIndex[e.target.value]}`);
  addActiveStatus(mapItem, carouselItem, e.target.value);
});
mapItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    removeActiveStatus();
    console.log(e.target);
    const carouselItem = document.querySelector(`#carousel-${e.currentTarget.id}`);
    const outputValue = getKeyByValue(carouselIndex, e.currentTarget.id);
    addActiveStatus(e.currentTarget, carouselItem, outputValue);
  });
});

carouselItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    console.log(e.target);
    let outputValue;
    removeActiveStatus();
    if (e.target.classList.contains('carousel__item')) {
      outputValue = getKeyByValue(carouselIndex, e.target.children[0].alt);
    } else {
      outputValue = getKeyByValue(carouselIndex, e.target.alt);
    }
    addActiveStatus(document.querySelector(`#${e.target.alt}`), e.currentTarget, outputValue);
  });
});

next.addEventListener('click', () => {
  removeActiveStatus();
  if (range.value < 8) {
    const carouselItem = document.querySelector(`#carousel-${carouselIndex[Number(range.value) + 1]}`);
    const mapItem = document.querySelector(`#${carouselIndex[Number(range.value) + 1]}`);
    const outputValue = Number(range.value) + 1;
    addActiveStatus(mapItem, carouselItem, outputValue);
  } else {
    const carouselItem = document.querySelector(`#carousel-${carouselIndex[1]}`);
    const mapItem = document.querySelector(`#${carouselIndex[1]}`);
    addActiveStatus(mapItem, carouselItem, 1);
  }
});

prev.addEventListener('click', (e) => {
  removeActiveStatus();
  if (range.value > 1) {
    const carouselItem = document.querySelector(`#carousel-${carouselIndex[Number(range.value) - 1]}`);
    const mapItem = document.querySelector(`#${carouselIndex[Number(range.value) - 1]}`);
    const outputValue = Number(range.value) - 1;
    addActiveStatus(mapItem, carouselItem, outputValue);
  } else {
    const carouselItem = document.querySelector(`#carousel-${carouselIndex[8]}`);
    const mapItem = document.querySelector(`#${carouselIndex[8]}`);
    addActiveStatus(mapItem, carouselItem, 8);
  }
});

const removeClass = (items, cls) => {
  items.forEach((item) => {
    item.classList.remove(cls);
  });
};

const removeActiveStatus = () => {
  removeClass(mapItems, 'map__item__active');
  removeClass(carouselItems, 'carousel__item_active');
  carouselItems.forEach((item) => {
    item.firstChild.nextSibling.classList.remove('carousel__img_active');
  });
};

const addActiveStatus = (mapItem, carouselItem, outputValue) => {
  carouselItem.classList.add('carousel__item_active');
  carouselItem.children[0].classList.add('carousel__img_active');
  if (mapItem) {
    mapItem.classList.add('map__item__active');
    btnMap.setAttribute('href', `../zoos/${mapItem.id}.html`);
  } else {
    btnMap.setAttribute('href', '#');
  }
  range.value = outputValue;
  output.innerText = `0${outputValue}/`;
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
