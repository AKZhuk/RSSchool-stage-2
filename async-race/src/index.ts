import { createCar, updateCar, deleteCar, getCar } from './api';
import { Car } from './interfaces';
import {
  $,
  disableButtons,
  disableUpdateForm,
  enableButtons,
  enableUpdateForm,
  generateCars,
  isEmpty,
  race,
} from './utils';
import { renderGarage } from './ui/garage';
import { renderHeader } from './ui/header';
import { renderForm } from './ui/form';
import { renderWinners, sortWinners, winnerHandler } from './ui/winners';
import './styles.scss';
import { state } from './state';
import { resetCar } from './ui/car';

const render = async () => {
  document.body.innerHTML = `
  ${renderHeader()}
  <div id="nav" class="garage-view">

    <div class="form">${renderForm()}</div>
    <h4 class="car__count"></h4>
    <h5 class="garage__page"></h5>
    <div class="garage"></div>
    <h2 class="pop-up"></h2>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link prevPage" data-view="garage">Previous</button>
        </li>
        <li class="page-item">
          <button class="page-link nextPage" data-view="garage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
  <div id="nav" class="winners hidden">
  <h4 class="winners__count"></h4>
  <h5 class="winners__page"></h5>
  <div class="table__wrapper">
  <table class="table table-striped table-sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Car</th>
      <th scope="col">Name</th>
      <th scope="col" class="sort" data-sort="wins">Wins </th>
      <th scope="col" class="sort" data-sort="time">Time <i class="bi bi-sort-numeric-down"></i></th>
    </tr>
  </thead>
  <tbody class="table-result">
  </tbody>
  </table>
  </div>
   <nav>
    <ul class="pagination">
      <li class="page-item">
        <a  class="page-link prevPage" data-view="winners" href="#">Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link nextPage" data-view="winners" href="#">Next</a>
      </li>
    </ul>
    </nav>
  </div>`;
  renderGarage();
  renderWinners();
};

document.body.addEventListener('submit', async (e) => {
  if (e.target === null) {
    return;
  }
  const form = <HTMLFormElement>e.target;
  let requestResult = false;

  if (form.id === 'formCreateCar') {
    const car: Car = {
      name: (<HTMLInputElement>$('#formCreateCar').children[0]).value,
      color: (<HTMLInputElement>$('#formCreateCar').children[1]).value,
    };
    requestResult = await createCar(car);
  }

  if (form.id === 'formUpdateCar') {
    const car: Car = {
      name: (<HTMLInputElement>$('#formUpdateCar').children[0]).value,
      color: (<HTMLInputElement>$('#formUpdateCar').children[1]).value,
    };
    requestResult = await updateCar(<number>state.selectedCarId, car);
  }

  if (requestResult) {
    await renderGarage();
    await renderWinners();
  }
  disableUpdateForm();
});

document.body.addEventListener('click', async (e) => {
  if (e.target === null) {
    return;
  }
  const elem = <HTMLElement>e.target;

  if (elem.classList.contains('remove')) {
    const carId = Number(elem.dataset.id);
    await deleteCar(carId);
    await renderGarage();
    await renderWinners();
  }
  if (elem.classList.contains('select')) {
    state.selectedCarId = Number(elem.dataset.id);
    const car: Car = await getCar(state.selectedCarId);
    enableUpdateForm(car);
  }

  if (elem.classList.contains('engine')) {
    const carId = Number(elem.dataset.id);
    disableButtons();
    race(carId);
    elem.nextElementSibling?.removeAttribute('disabled');
  }

  if (elem.classList.contains('reset-car')) {
    const carId = Number(elem.dataset.id);
    await resetCar(carId);
    if (isEmpty(state.amimation)) enableButtons();
  }

  if (elem.id === 'startRace') {
    disableButtons();
    let isWin = false;
    $('.garage')
      .querySelectorAll('.car__svg')
      .forEach(async (car) => {
        const carId = Number((<HTMLElement>car).dataset.id);
        const result = await race(carId);

        if (result.success !== false && !isWin) {
          isWin = true;
          await winnerHandler(result);
        }
      });
  }

  if (elem.id === 'resetRace') {
    $('.pop-up').innerHTML = '';
    $('.garage')
      .querySelectorAll('.car__svg')
      .forEach(async (car) => {
        const carId = Number((<HTMLElement>car).dataset.id);
        await resetCar(carId);
      });
    enableButtons();
    elem.setAttribute('disabled', '');
  }

  if (elem.classList.contains('nextPage')) {
    if (
      elem.dataset.view === 'garage' &&
      state.garagePage < state.garagePagesCount
    ) {
      state.garagePage++;
      renderGarage();
    } else if (state.winnerPage < state.winnersPagesCount) {
      state.winnerPage++;
      renderWinners();
    }
  }

  if (elem.classList.contains('prevPage')) {
    if (elem.dataset.view === 'garage' && state.garagePage > 1) {
      state.garagePage--;
      renderGarage();
    } else if (elem.dataset.view === 'winners' && state.winnerPage > 1) {
      state.winnerPage--;
      renderWinners();
    }
  }

  if (elem.id === 'winners') {
    $('.garage-view').classList.add('hidden');
    $('.winners').classList.remove('hidden');
  }

  if (elem.id === 'garage') {
    $('.winners').classList.add('hidden');
    $('.garage-view').classList.remove('hidden');
  }

  if (elem.classList.contains('sort')) {
    sortWinners(elem);
    renderWinners();
  }

  if (elem.id === 'generateCars') {
    await generateCars();
    await renderGarage();
  }
});

render();
