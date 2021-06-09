import {
  createCar,
  updateCar,
  getCars,
  getCar,
  deleteCar,
  toggleEngine,
  getWinners,
} from './api';
import { Car, State, Winner } from './interfaces';
import { $, enableForm, race, winnerHandler } from './utils';
import './styles.scss';
import { renderCar } from './ui/car';
import { renderHeader } from './ui/header';
import { renderForm } from './ui/form';
import { renderWinners } from './ui/winners';
import { renderWinner } from './ui/winner';

export const state: State = {
  garagePage: 1,
  winnerPage: 1,
  sortBy: 'id',
  selectedCarId: null,
  amimation: {},
  view: 'garage',
  winner: [],
};

const render = async () => {
  const cars = await getCars(state.garagePage, 7);
  const winners = await getWinners(state.winnerPage, 10, state.sortBy);
  document.body.innerHTML = `
  ${renderHeader()}
  <div id="nav" class="garage-view">
    <div class="form">${renderForm()}</div>
    <h4>Garage (${cars.count})</h4>
    <h5>Page #(${state.garagePage})</h5>
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
  cars.items.forEach((car: Car) => {
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
    await updateCar(<number>state.selectedCarId, car);
  }
  await render();
});

document.body.addEventListener('click', async (e) => {
  if (e.target === null) {
    return;
  }
  const elem = <HTMLElement>e.target;

  if (elem.id === 'remove') {
    const carId = Number(elem.dataset.id);
    await deleteCar(carId);
    await render();
  }
  if (elem.id === 'select') {
    state.selectedCarId = Number(elem.dataset.id);
    const car: Car = await getCar(state.selectedCarId);
    enableForm(car);
  }

  if (elem.id === 'engine') {
    const carId = Number(elem.dataset.id);
    race(carId);
  }

  if (elem.id === 'resetCar') {
    const carId = Number(elem.dataset.id);
    await toggleEngine(carId, 'stoppeded');
    $(`#car-${carId}`).style.marginLeft = '';
  }

  if (elem.id === 'nextPage') {
    state.garagePage++;
    render();
  }

  if (elem.id === 'prevPage' && state.garagePage > 1) {
    state.garagePage--;
    render();
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

  if (elem.id === 'startRace') {
    let isWin: boolean = false;
    $('.garage')
      .querySelectorAll('.car__svg')
      .forEach(async (car) => {
        const carId = Number(car.id[4]);
        let result = await race(carId);
        if (result.success !== false && !isWin) {
          isWin = true;
          await winnerHandler(result);
        }
      });
  }

  if (elem.id === 'resetRace') {
    document.querySelectorAll('.car__svg').forEach(async (car) => {
      (<HTMLElement>car).style.marginLeft = '';
    });
  }
});

render();
