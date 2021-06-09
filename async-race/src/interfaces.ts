export interface Car {
  name: string;
  color: string;
  id?: number;
}

export interface Winner {
  id: number;
  wins?: number;
  time: string;
}
export interface AnimateParam {
  carId: number;
  duration: number;
}

export interface State {
  garagePage: number;
  winnerPage: number;
  sortBy: 'id' | 'wins' | 'time';
  selectedCarId: number | null;
  amimation: { [id: number]: number };
  view: string;
  winner: null | { id: number; time: number };
}
