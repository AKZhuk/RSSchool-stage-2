import { renderCarImage } from './carImage';
import { Car } from '../interfaces';

export const renderCar = (car: Car): string => `
<div class="road">
 <div class="car-wrapper">
    <div class="btn-group" role="group">
      <button id='select' type="button" class="btn btn-primary btn-sm select"
      data-id="${car.id}">select</button>
      <button id="remove" type="button" class="btn btn-danger btn-sm remove"
      data-id="${car.id}">
      remove</button>
      <span>${car.name}</span>
    </div>
    <div class="car">
      <button id='engine-${car.id}'
       type="button" class="btn btn-outline-success car__button engine"
      data-id="${car.id}">
        A
      </button>
      <button id='resetCar-${
  car.id
}' type="button" class="btn btn-outline-danger
      car__button reset-car" data-id="${car.id}" disabled>B</button>
    ${renderCarImage(car)}
    </div>
  </div>
<div class="road__flag"></div>`;
