import { getCars } from '../api';
import { Car } from '../interfaces';
import { state } from '../state';
import { $ } from '../utils';
import { renderCar } from './car';

export const renderGarage = async (): Promise<void> => {
  state.cars = await getCars(state.garagePage, 7);
  state.garagePagesCount = Math.ceil(Number(state.cars.count) / 7);
  $(
    '.garage__control',
  ).innerHTML = `<button  id="startRace" type="button" class="btn btn-danger">Race</button>
      <button  id="resetRace" type="button" class="btn btn-info" disabled>Reset</button>
      <button  id="generateCars" type="button" class="btn btn-success">Generate Cars</button>`;
  $('.car__count').innerHTML = `Garage (${state.cars.count})`;
  $('.garage__page').innerHTML = `Page #(${state.garagePage})`;
  $('.garage').innerHTML = '';
  state.cars.items.forEach((car: Car) => {
    $('.garage').innerHTML += renderCar(car);
  });
};
