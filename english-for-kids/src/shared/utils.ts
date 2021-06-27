export const $ = (cls: string): HTMLElement => <HTMLElement>document.querySelector(cls);

export const playAudio = (audioSRC: string): void => {
  const audio = new Audio();
  audio.currentTime = 0;
  audio.src = audioSRC;
  audio.play();
};
