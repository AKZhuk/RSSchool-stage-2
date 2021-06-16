import { createCar, drive, startEngine } from './api';
import { Car, AnimateParam, RaceResult } from './interfaces';
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

export const $ = (cls: string): HTMLElement =>
  <HTMLElement>document.querySelector(cls);

export const disableUpdateForm = (): void => {
  const inputName = $('#updateName') as HTMLFormElement;
  const inputColor = $('#updateColor') as HTMLFormElement;
  inputName.value = '';
  inputColor.value = '#563d7c';
  inputName.disabled = true;
  inputColor.disabled = true;
};

export const enableUpdateForm = (car: Car): void => {
  ($('#formUpdateCar').children[0] as HTMLInputElement).value = car.name;
  ($('#formUpdateCar').children[1] as HTMLInputElement).value = car.color;
  document.querySelectorAll('#formUpdateCar *').forEach((elem) => {
    elem.removeAttribute('disabled');
  });
};

export function animate({ carId, duration }: AnimateParam): void {
  const start = performance.now();
  state.amimation[carId] = requestAnimationFrame(function animateCar(
    time
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

export const race = async (carId: number): Promise<RaceResult> => {
  const carParams = await startEngine(carId);
  const time = carParams.distance / carParams.velocity;
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

export const disableButtons = (): void => {
  document
    .querySelectorAll(
      '.select, .remove , button.page-link, #startRace, #resetRace, #generateCars, form button'
    )
    .forEach((elem) => elem.setAttribute('disabled', ''));
  disableUpdateForm();
};

export const enableButtons = (): void => {
  document
    .querySelectorAll(
      '.select, .remove , button.page-link, #startRace, #resetRace, #generateCars, #buttonCreate'
    )
    .forEach((elem) => elem.removeAttribute('disabled'));
};

export function isEmpty(obj: { [id: number]: number }): boolean {
  return Object.keys(obj).length === 0;
}
