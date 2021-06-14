import {
  getAllCars, getCar, getWinners, saveWinner,
} from '../api';
import { Car, Winner } from '../interfaces';
import { state } from '../state';
import { $ } from '../utils';
import { renderCarImage } from './carImage';

const renderWinner = (winner: Winner, car: Car, index: number): string => `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${renderCarImage(car)}</td>
      <td>${car.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>
`;

export const renderWinners = async (): Promise<void> => {
  const winners = await getWinners(
    state.winnerPage,
    10,
    state.sortBy,
    state.orderBy,
  );
  let index = 0;
  const cars = await getAllCars();
  state.winnersPagesCount = Math.ceil(Number(winners.count) / 10);
  $('.winners__count').innerHTML = `Winners (${winners.count})`;
  $('.winners__page').innerHTML = `Page #(${state.winnerPage})`;
  $('.table-result').innerHTML = '';

  winners.items.forEach(async (winner: Winner) => {
    $('.table-result').innerHTML += renderWinner(
      winner,
      cars.items[winner.id],
      index + (state.winnerPage - 1) * 10,
    );
    index++;
  });
};

export const winnerHandler = async (winner: {
  carId: number;
  time: number;
}): Promise<void> => {
  const time = (winner.time / 1000).toFixed(2);
  await saveWinner(winner.carId, time);
  await getCar(winner.carId).then((response: Car) => {
    $('.pop-up').innerHTML = `${response.name} went first (${time}s)!!`;
  });
  $('#resetRace').removeAttribute('disabled');
  await renderWinners();
};
