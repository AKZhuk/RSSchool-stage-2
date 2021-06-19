import { renderCarImage } from './carImage';
import { Car } from '../interfaces';
import { stopEngine } from '../api';
import { state } from '../state';
import { $ } from '../utils';

export const renderCar = (car: Car): string => `
  <div class="road">
    <div class="car-wrapper">
      <div class="btn-group" role="group">
        <button id='select-${
          car.id
        }' type="button" class="btn btn-primary btn-sm select"
        data-id="${car.id}">select</button>
        <button id="remove-${
          car.id
        }" type="button" class="btn btn-danger btn-sm remove"
        data-id="${car.id}">
        remove</button>
        <span>${car.name}</span>
      </div>
      <div class="car">
        <button id='engine-${car.id}'
        type="button" class="btn btn-outline-success car__button engine"
        data-id="${car.id}">A</button>
        <button id='resetCar-${
          car.id
        }' type="button" class="btn btn-outline-danger
        car__button reset-car" data-id="${car.id}" disabled>B</button>
      ${renderCarImage(car)}
      </div>
    </div>
  <div class="road__flag"></div>`;

export const resetCar = async (id: number): Promise<void> => {
  try {
    await stopEngine(id);
    cancelAnimationFrame(state.amimation[id]);
    delete state.amimation[id];
    $(`#car-${id}`).style.marginLeft = '';
  } catch (error) {}
};
