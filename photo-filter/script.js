const baseImgUrl = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
const fullScreen = document.querySelector(".fullscreen");
const filters = document.querySelector(".filters");
const buttonsContainer = document.querySelector(".btn-container");
const fileImport = document.querySelector(".btn-load--input");
const buttons = document.querySelectorAll(".btn");
const canvas = document.querySelector("canvas");
let filtersValue = {
  blur: 0,
  invert: 0,
  sepia: 0,
  saturate: 100,
  hue: 0,
  opacity: 100,
};
const images = [
  "01",
  "02",
  "03",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
window.onload = () => {
  drawImage("assets/img/img.jpg");
};
const img = new Image();
let i = 0;

filters.addEventListener("input", (e) => {
  e.target.nextElementSibling.value = e.target.value;
  setStyle(e.target);
  filtersValue[e.target.name] = e.target.value;
  drawImage(img.src);
});

fileImport.addEventListener("change", (e) => {
  const file = fileImport.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    drawImage(img.src);
    document.querySelector("img").setAttribute("src", img.src);
  };
  reader.readAsDataURL(file);
});

buttonsContainer.addEventListener("click", (e) => {
  resetStatusActive();
  setStatusActive(e.target);
  if (e.target.classList.contains("btn-reset")) resetStyles();
  if (e.target.classList.contains("btn-next")) getImage(e.target);
  if (e.target.classList.contains("btn-save")) saveImage(e.target);
});

const setStyle = (filter) => {
  const unit = filter.dataset.sizing;

  document.documentElement.querySelector("img").style.setProperty(`--${filter.name}`, filter.value + unit);
};

const resetStyles = () => {
  filters.querySelectorAll("input").forEach((filter) => {
    filter.value = filter.getAttribute("value");
    const output = filters.querySelector(`.${filter.name}-result`);
    output.innerHTML = filter.getAttribute("value");
    setStyle(filter);
    filtersValue[filter.name] = filter.getAttribute("value");
  });

  drawImage(img.src);
};

const getImage = (button) => {
  let timeOfDay = getCurrentTime();
  if (i === 19) i = 0;
  const img = new Image();
  img.src = baseImgUrl + timeOfDay + `/${images[i]}.jpg`;
  img.onload = () => {
    document.querySelector("img").setAttribute("src", img.src);
  };
  i++;
  drawImage(img.src);
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 1000);
};

const saveImage = () => {
  const link = document.createElement("a");
  link.download = "download.png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
};

function drawImage(src) {
  img.setAttribute("crossOrigin", "anonymous");
  img.src = src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = `blur(${filtersValue.blur}px) invert(${filtersValue.invert}%) sepia(${filtersValue.sepia}%) saturate(${filtersValue.saturate}%) hue-rotate(${filtersValue.hue}deg)  opacity(${filtersValue.opacity}%)`;
    ctx.drawImage(img, 0, 0);
  };
}

drawImage();

const getCurrentTime = () => {
  let currentHour = new Date().getHours();
  if ((timeOfDay = 6 < currentHour && currentHour < 12)) {
    return "morning";
  } else if (currentHour < 18) {
    return "day";
  } else if (currentHour < 24) {
    return "evening";
  } else {
    return "night";
  }
};

const resetStatusActive = () => {
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
};

const setStatusActive = (button) => {
  if (button.classList.contains("btn")) {
    button.classList.add("btn-active");
  }
};

fullScreen.addEventListener("mousedown", function () {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});
