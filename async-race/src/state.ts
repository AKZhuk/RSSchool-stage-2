import { State } from './interfaces';

export const state: State = {
  garagePage: 1,
  winnerPage: 1,
  sortBy: 'id',
  orderBy: 'ASC',
  selectedCarId: null,
  amimation: {},
  view: 'garage',
  winner: null,
  garagePagesCount: 0,
  winnersPagesCount: 0,
  cars: { items: [], count: '0' },
};
