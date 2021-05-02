let checkbox = document.querySelector('input[name=theme]');
let html = document.querySelector('.html');
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark-theme') {
    checkbox.checked = true;
  }
  html.classList.add(localStorage.getItem('theme'));
});
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
