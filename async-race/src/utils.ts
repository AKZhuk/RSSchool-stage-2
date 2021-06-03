export const $ = (cls: string): HTMLElement => <HTMLElement>document.querySelector(cls);

export const disableForm = (): void => {
  $('#formUpdateCar').children[0].setAttribute('disabled', '');
  $('#formUpdateCar').children[1].setAttribute('disabled', '');
  $('#formUpdateCar').children[2].setAttribute('disabled', '');
};

export const enableForm = (): void => {
  $('#formUpdateCar').children[0].removeAttribute('disabled');
  $('#formUpdateCar').children[1].removeAttribute('disabled');
  $('#formUpdateCar').children[2].removeAttribute('disabled');
};
