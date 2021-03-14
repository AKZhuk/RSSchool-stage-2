const fullScreen = document.querySelector(".fullscreen");

const filters = document.querySelector(".filters");
const buttonsContainer = document.querySelector(".btn-container");

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
  if (e.target.classList.contains("btn-reset")) resetStyles();
  if (e.target.classList.contains("btn-next")) getImage();
});

const resetStyles = () => {
  filters.querySelectorAll("input").forEach((item) => {
    item.value = item.getAttribute("value");
    item.nextElementSibling.value = item.value;
  });
};

const getImage = () => {
  let timeOfDay = getCurrentTime();
  console.log(timeOfDay);
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
