import {
  createCar, drive, startEngine, toggleEngine,
} from './api';
import { Car, AnimateParam } from './interfaces';
import { state } from './state';

const carBrands: string[] = [
  'Tesla',
  'Porsche',
  'Ferrari',
  'BMW',
  'Audi',
  'VAZ',
  'Mercedes',
  'Lamborgini',
  'Skoda',
  'Tayota',
];

const carModels: string[] = [
  '911',
  'huracan',
  'model S',
  'm5',
  'e-tron',
  '2101',
  'R8',
  'Octavia RS',
  'Camry 3.5',
  'AMG',
];

export const $ = (cls: string): HTMLElement => <HTMLElement>document.querySelector(cls);

export const disableForm = (): void => {
  document.querySelectorAll('#formUpdateCar *').forEach((elem) => {
    elem.setAttribute('disabled', '');
  });
};

export const enableForm = (car: Car): void => {
  ($('#formUpdateCar').children[0] as HTMLInputElement).value = car.name;
  ($('#formUpdateCar').children[1] as HTMLInputElement).value = car.color;
  document.querySelectorAll('#formUpdateCar *').forEach((elem) => {
    elem.removeAttribute('disabled');
  });
};

export function animate({ carId, duration }: AnimateParam): void {
  const start = performance.now();
  state.amimation[carId] = requestAnimationFrame(function animateCar(
    time,
  ): void {
    let progress = (time - start) / duration;
    if (progress > 1) progress = 1;

    $(`#car-${carId}`).style.marginLeft = `${
      progress * (window.innerWidth - 210)
    }px`;

    if (progress < 1) {
      state.amimation[carId] = requestAnimationFrame(animateCar);
    }
  });
}

export const race = async (carId: number) => {
  const param = await startEngine(carId);

  const time = param.distance / param.velocity;
  animate({
    duration: time,
    carId,
  });
  const { success } = await drive(carId);

  if (!success) {
    cancelAnimationFrame(state.amimation[carId]);
  }
  return { success, carId, time };
};

const generateColor = (): string => {
  const letter = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letter[Math.floor(Math.random() * 15)];
  }
  return color;
};

export const generateCars = async (): Promise<void> => {
  const createCarRequests: Promise<void>[] = [];
  for (let i = 0; i < 100; i++) {
    const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const model = carModels[Math.floor(Math.random() * carModels.length)];
    const car: Car = {
      name: `${brand} ${model}`,
      color: generateColor(),
    };
    createCarRequests.push(createCar(car));
  }
  Promise.all(createCarRequests);
};
