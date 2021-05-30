import { BaseComponent } from '../../shared/base-component';
import { Button } from '../../shared/button';
import { Input } from './input';
import { InputFile } from './inputFile';
import { Canvas } from '../../shared/canvas';
import { inputsParam } from '../../shared/constants';
import './form.scss';

export class Registration extends BaseComponent {
  readonly form: BaseComponent;

  private readonly formWrapper: BaseComponent;

  private readonly buttonWrapper: BaseComponent;

  congratulation: BaseComponent;

  inputs: Input[];

  buttonCancel: Button;

  buttonAdd: Button;

  inputFile: InputFile;

  canvas: Canvas;

  score: number;

  constructor() {
    super('div', ['cover']);
    this.inputs = [];
    this.score = 0;
    this.form = new BaseComponent('form', ['form']);
    this.congratulation = new BaseComponent('span', ['congratulations__text']);
    this.formWrapper = new BaseComponent('div', ['form-wrapper']);
    this.buttonWrapper = new BaseComponent('div', ['form__buttons-wrapper']);
    this.buttonAdd = new Button(['btn', 'btn_add-user'], 'ADD USER', 'about', 'button', true);
    this.canvas = new Canvas('form__image');
    this.inputFile = new InputFile(this.canvas);
    this.buttonCancel = new Button(['btn', 'btn_cancel'], 'CANCEL', 'about');
    const avatarWrapper = new BaseComponent('div', ['form__avatar']).element;

    this.element.appendChild(this.form.element);
    avatarWrapper.appendChild(this.canvas.element);
    avatarWrapper.appendChild(this.inputFile.element);
    this.form.element.appendChild(this.congratulation.element);
    this.form.element.appendChild(new BaseComponent('h2', ['title'], 'Registr new Player').element);
    this.form.element.appendChild(avatarWrapper);
    this.form.element.appendChild(this.formWrapper.element);
    this.form.element.appendChild(this.buttonWrapper.element);
    this.buttonWrapper.element.appendChild(this.buttonAdd.element);
    this.buttonWrapper.element.appendChild(this.buttonCancel.element);
  }

  clear(): void {
    this.congratulation.element.innerText = '';
    this.formWrapper.element.innerHTML = '';
    this.inputs = [];
    this.canvas.clear();
  }

  render(score: number, min: number, sec: number): void {
    this.clear();
    this.score = score;
    this.congratulation.element.innerText = `
    Congratulations! You successfully found all matches on ${min}.${sec} minutes.`;

    inputsParam.forEach((item) => {
      const label = new BaseComponent('label', ['form__label'], item.labelText);
      const errLabel = new BaseComponent('div', ['input_error-message'], 'заполните это поле');
      const input = new Input(item.id, item.type, item.rule, errLabel.element, this.inputs, this.buttonAdd);
      this.inputs.push(input);
      this.formWrapper.element.appendChild(input.element);
      this.formWrapper.element.appendChild(label.element);
      this.formWrapper.element.appendChild(errLabel.element);
    });
  }
}
