let checkbox = document.querySelector("input[name=theme]");
let html = document.querySelector(".html");
checkbox.addEventListener("change", function () {
  if (this.checked) {
    html.classList.remove("light-theme");
    html.classList.add("dark-theme");
  } else {
    html.classList.add("light-theme");
    html.classList.remove("dark-theme");
  }
});
