export interface IState {
  isGame: boolean;
}

export type TCategory = {
  _id: string;
  name: string;
};

export type TWord = {
  _id: string;
  categoryID: string;
  word: string;
  translation: string;
  imageSRC: string;
  audioSRC: string;
};
export interface IWordStatistic {
  word: string;
  translation: string;
  category: string;
  trained: number;
  correct: number;
  incorect: number;
  result: number;
}

export interface IRoutes {
  path: string;
  cb: () => void;
}

export interface IAppState {
  isGameMode: boolean;
  isGame: boolean;
  gameWords: TWord[];
  currentGameWord: TWord | undefined;
  trainWords: TWord[];
  sortBy: keyof IWordStatistic;
  orderBy: 'asc' | 'desc';
  categories: TCategory[];
  words: TWord[];
  currentCategoryID: string;
}
