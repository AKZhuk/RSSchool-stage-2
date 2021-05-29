export interface Category {
  value: string;
  category: string;
  images: string[];
}

export interface Difficulty {
  category: string;
  cards: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  score: number;
}

export interface Rules {
  RegExp: RegExp;
  errMessage: string;
}
