const baseImgUrl =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
const fullScreen = document.querySelector(".fullscreen");
const filters = document.querySelector(".filters");
const buttonsContainer = document.querySelector(".btn-container");
const buttons = document.querySelectorAll(".btn");
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
let i = 0;

fullScreen.addEventListener("mousedown", function () {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

filters.addEventListener("input", (e) => {
  e.target.nextElementSibling.value = e.target.value;
});

buttonsContainer.addEventListener("click", (e) => {
  resetStatusActive();
  addStatusActive(e.target);
  if (e.target.classList.contains("btn-reset")) resetStyles();
  if (e.target.classList.contains("btn-next")) getImage(e.target);
});

const resetStyles = () => {
  filters.querySelectorAll("input").forEach((item) => {
    item.value = item.getAttribute("value");
    item.nextElementSibling.value = item.value;
  });
};

const resetStatusActive = () => {
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
};

const addStatusActive = (btn) => {
  btn.classList.add("btn-active");
};

const getImage = (btn) => {
  let timeOfDay = getCurrentTime();
  if (i === 19) i = 0;
  const img = new Image();
  img.src = baseImgUrl + timeOfDay + `/${images[i]}.jpg`;
  img.onload = () => {
    document.querySelector("img").setAttribute("src", img.src);
  };
  i++;
  btn.disabled = true;
  setTimeout(() => {
    btn.disabled = false;
  }, 1000);
};

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
