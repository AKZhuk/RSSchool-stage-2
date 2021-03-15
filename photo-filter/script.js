const baseImgUrl =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
const fullScreen = document.querySelector(".fullscreen");
const filters = document.querySelector(".filters");
const buttonsContainer = document.querySelector(".btn-container");
const fileImport = document.querySelector(".btn-load--input");
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
  setStyle(e.target);
});

fileImport.addEventListener("change", (e) => {
  const file = fileImport.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    document.querySelector("img").setAttribute("src", img.src);
  };
  reader.readAsDataURL(file);
});

buttonsContainer.addEventListener("click", (e) => {
  resetStatusActive();
  setStatusActive(e.target);
  if (e.target.classList.contains("btn-reset")) resetStyles();
  if (e.target.classList.contains("btn-next")) getImage(e.target);
});

const setStyle = (filter) => {
  filter.nextElementSibling.value = filter.value;
  const unit = filter.dataset.sizing;
  document.documentElement.style.setProperty(
    `--${filter.name}`,
    filter.value + unit
  );
};

const resetStyles = () => {
  filters.querySelectorAll("input").forEach((filter) => {
    filter.value = filter.getAttribute("value");
    setStyle(filter);
  });
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

const getImage = (button) => {
  let timeOfDay = getCurrentTime();
  if (i === 19) i = 0;
  const img = new Image();
  img.src = baseImgUrl + timeOfDay + `/${images[i]}.jpg`;
  img.onload = () => {
    document.querySelector("img").setAttribute("src", img.src);
  };
  i++;
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
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
