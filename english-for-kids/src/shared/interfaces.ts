export interface IState {
  isGame: boolean;
}

export interface IWordStatistic {
  word: string;
  translation: string;
  category: string;
  trained: number;
  correct: number;
  incorect: number;
  result: number;
}

export interface ICard {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface IRoutes {
  path: string;
  cb: () => void;
}

export interface IAppState {
  isGameMode: boolean;
  isGame: boolean;
  gameWords: ICard[];
  currentGameWord: ICard | undefined;
  trainWords: ICard[];
}
