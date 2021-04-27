const baseImgUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const canvas = document.querySelector('canvas');
const displayImg = document.querySelector('img');
const filters = document.querySelector('.filters');
const buttonsContainer = document.querySelector('.btn-container');
const fileImport = document.querySelector('.btn-load--input');
const buttons = document.querySelectorAll('.btn');
const fullScreen = document.querySelector('.fullscreen');

const filtersState = {
  blur: 0,
  invert: 0,
  sepia: 0,
  saturate: 100,
  hue: 0,
};
const images = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

window.onload = () => {
  drawImage(displayImg.src);
};
const img = new Image();
let i = 0;

filters.addEventListener('input', (e) => {
  e.target.nextElementSibling.value = e.target.value;
  filtersState[e.target.name] = e.target.value;
  setStyle(e.target);
});

fileImport.addEventListener('change', (e) => {
  const file = fileImport.files[0];
  const reader = new FileReader();
  setStatusActive(e.target.parentElement);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    drawImage(img.src);
    displayImg.src = img.src;
    fileImport.value = null;
  };
  reader.readAsDataURL(file);
});

const setStyle = (filter) => {
  const unit = filter.dataset.sizing;
  displayImg.style.setProperty(`--${filter.name}`, filter.value + unit);
  drawImage(img.src);
};

buttonsContainer.addEventListener('click', (e) => {
  resetStatusActive();
  setStatusActive(e.target);
  if (e.target.classList.contains('btn-reset')) resetStyles();
  if (e.target.classList.contains('btn-next')) getImage(e.target);
  if (e.target.classList.contains('btn-save')) saveImage(e.target);
});

const resetStyles = () => {
  filters.querySelectorAll('input').forEach((filter) => {
    filter.value = filter.getAttribute('value');
    filter.nextElementSibling.value = filter.value;
    setStyle(filter);
    filtersState[filter.name] = filter.value;
  });
  drawImage(img.src);
};

const getImage = (button) => {
  let timeOfDay = getCurrentTime();
  if (i === 20) i = 0;
  const img = new Image();
  img.src = baseImgUrl + timeOfDay + `/${images[i]}.jpg`;
  img.onload = () => {
    displayImg.setAttribute('src', img.src);
  };
  i++;
  drawImage(img.src);
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 500);
};

const saveImage = () => {
  const link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
};

function drawImage(src) {
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    const coef =
      img.window > img.height ? img.width / displayImg.clientWidth : img.height / displayImg.clientHeight;
    ctx.filter = `blur(${filtersState.blur * coef}px) invert(${filtersState.invert}%) sepia(${
      filtersState.sepia
    }%) saturate(${filtersState.saturate}%) hue-rotate(${filtersState.hue}deg)`;
    ctx.drawImage(img, 0, 0);
  };
}

const getCurrentTime = () => {
  let currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'day';
  } else if (currentHour >= 18 && currentHour < 24) {
    return 'evening';
  } else if (currentHour >= 0 && currentHour < 6) {
    return 'night';
  }
};

const resetStatusActive = () => {
  buttons.forEach((button) => {
    button.classList.remove('btn-active');
  });
};

const setStatusActive = (button) => {
  if (button.classList.contains('btn')) {
    button.classList.add('btn-active');
  }
};

fullScreen.addEventListener('mousedown', function () {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});
