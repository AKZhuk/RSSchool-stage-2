export interface Car {
  name: string;
  color: string;
  id?: number;
}
export interface Winner {
  id: number;
  wins: number;
  time: string;
}
export interface AnimateParam {
  carId: number;
  duration: number;
}

export type Sort = 'id' | 'wins' | 'time';
export interface State {
  garagePage: number;
  winnerPage: number;
  sortBy: Sort;
  orderBy: 'DESC' | 'ASC';
  selectedCarId: number | null;
  amimation: { [id: number]: number };
  view: string;
  winner: null | { id: number; time: number };
  winnersPagesCount: number;
  garagePagesCount: number;
}

export type GetsCarsResponse = { items: Car[]; count: string };
