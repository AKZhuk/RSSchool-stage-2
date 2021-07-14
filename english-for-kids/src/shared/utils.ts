import { appState } from './constants';
import { TWord } from './interfaces';

export const $ = (cls: string): HTMLElement => <HTMLElement>document.querySelector(cls);

export const playAudio = (audioSRC: string): void => {
  const audio = new Audio();
  audio.currentTime = 0;
  audio.src = audioSRC;
  audio.play();
};

export const checkLoginData = (): boolean => {
  const login: string = ($('#inputLogin') as HTMLFormElement).value;
  const pass: string = ($('#inputPassword') as HTMLFormElement).value;

  if (login === 'admin' && pass === 'admin') {
    window.sessionStorage.setItem('IsAdmin', 'true');
    return true;
  }
  return false;
};

export const isAdmin = (): boolean => window.sessionStorage.getItem('IsAdmin') === 'true';

export const getWord = (id: string): TWord => {
  const wordData = appState.words.filter((word) => word._id === id);
  return wordData[0];
};
