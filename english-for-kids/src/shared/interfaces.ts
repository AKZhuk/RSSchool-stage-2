export interface State {
  isGame: boolean;
}

export interface CardType {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface IRoutes {
  path: string;
  cb: () => void;
}
