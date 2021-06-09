import { state } from '.';
import { createWinner, drive, saveWinner, toggleEngine } from './api';
import { Car, AnimateParam, Winner } from './interfaces';
import { renderWinners } from './ui/winners';

export const $ = (cls: string): HTMLElement =>
  <HTMLElement>document.querySelector(cls);

export const disableForm = (): void => {
  $('#formUpdateCar').children[0].setAttribute('disabled', '');
  $('#formUpdateCar').children[1].setAttribute('disabled', '');
  $('#formUpdateCar').children[2].setAttribute('disabled', '');
};

export const enableForm = (car: Car): void => {
  ($('#formUpdateCar').children[0] as HTMLInputElement).value = car.name;
  ($('#formUpdateCar').children[1] as HTMLInputElement).value = car.color;
  $('#formUpdateCar').children[0].removeAttribute('disabled');
  $('#formUpdateCar').children[1].removeAttribute('disabled');
  $('#formUpdateCar').children[2].removeAttribute('disabled');
};

export function animate({ carId, duration }: AnimateParam): void {
  const start = performance.now();
  let animationReq: { id: number };

  state.amimation[carId] = requestAnimationFrame(function animate(time): void {
    let progress = (time - start) / duration;
    if (progress > 1) progress = 1;

    $(`#car-${carId}`).style.marginLeft = `${
      progress * (window.innerWidth - 210)
    }px`;

    if (progress < 1) {
      state.amimation[carId] = requestAnimationFrame(animate);
    }
  });
}

export const race = async (carId: number) => {
  const param = await toggleEngine(carId, 'started');
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

export const winnerHandler = async (winner) => {
  saveWinner(winner.carId, (winner.time / 1000).toFixed(2));
};
