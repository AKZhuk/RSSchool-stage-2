import {
  createCar,
  updateCar,
  getCars,
  getCar,
  deleteCar,
  toggleEngine,
} from './api';
import { Car } from './interfaces';
import { $, enableForm, disableForm } from './utils';
import './styles.scss';
import { renderCar } from './ui/car';
import { renderHeader } from './ui/header';
import { renderForm } from './ui/form';
import { renderWinners } from './ui/winners';

let selectedCarId: number;
let page = 1;
const render = async (page: number) => {
  const response = await await getCars(page, 7);
  document.body.innerHTML = `
  ${renderHeader()}
  <div id="nav" class="garage-view">
    <div class="form">${renderForm()}</div>
    <h2>Garage (${response.count})</h2>
    <h3>Page #(${page})</h3>
    <div class="garage"></div>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <a id="prevPage" class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item">
          <a id="nextPage" class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <div id="nav" class="winners hidden">
    ${renderWinners()}
  </div>`;

  response.items.forEach((car: Car) => {
    $('.garage').innerHTML += renderCar(car);
  });
};

document.body.addEventListener('submit', async (e) => {
  if (e.target === null) {
    return;
  }
  const form = <HTMLFormElement>e.target;

  if (form.id === 'formCreateCar') {
    const car: Car = {
      name: (<HTMLInputElement>$('#formCreateCar').children[0]).value,
      color: (<HTMLInputElement>$('#formCreateCar').children[1]).value,
    };
    await createCar(car);
  }

  if (form.id === 'formUpdateCar') {
    const car: Car = {
      name: (<HTMLInputElement>$('#formUpdateCar').children[0]).value,
      color: (<HTMLInputElement>$('#formUpdateCar').children[1]).value,
    };
    await updateCar(selectedCarId, car);
  }
  await render(page);
});

document.body.addEventListener('click', async (e) => {
  if (e.target === null) {
    return;
  }
  const elem = <HTMLElement>e.target;

  if (elem.id === 'remove') {
    const carId = Number(elem.dataset.id);
    await deleteCar(carId);
    await render(page);
  }
  if (elem.id === 'select') {
    selectedCarId = Number(elem.dataset.id);
    enableForm();
  }
  if (elem.id === 'engine') {
    const carId = Number(elem.dataset.id);
    const param = await toggleEngine(carId, 'started');
    const time = param.distance / param.velocity;
    console.log(param, time);
  }

  if (elem.id === 'nextPage') {
    page++;
    render(page);
  }

  if (elem.id === 'prevPage' && page > 1) {
    page--;
    render(page);
  }

  if (elem.id === 'winners') {
    document.querySelectorAll('.nav-link');
    $('.garage-view').classList.add('hidden');
    $('.winners').classList.remove('hidden');
  }

  if (elem.id === 'garage') {
    document.querySelectorAll('.nav-link');
    $('.winners').classList.add('hidden');
    $('.garage-view').classList.remove('hidden');
  }
});

render(page);
