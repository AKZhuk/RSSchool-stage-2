import { Canvas } from '../../shared/canvas';
import { BaseComponent } from '../../shared/base-component';

export class InputFile extends BaseComponent {
  constructor(canvas: Canvas) {
    super('input', ['form__image-input']);
    this.element.setAttribute('type', 'file');
    this.element.addEventListener('change', () => {
      const file = (this.element as HTMLInputElement).files;
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        canvas.drawImage(reader.result as string);
        (this.element as HTMLInputElement).value = '';
      };
      reader.readAsDataURL(file[0]);
    });
  }
}
