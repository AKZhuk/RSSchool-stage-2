import { BaseComponent } from '../../shared/base-component';
import { Button } from '../../shared/button';

import { Input } from './input';
import { InputFile } from './inputFile';
import { Canvas } from '../../shared/canvas';

import { inputsParam } from '../../shared/constants';

export class Registration extends BaseComponent {
  readonly form: BaseComponent;

  private readonly formWrapper: BaseComponent;

  private readonly buttonWrapper: BaseComponent;

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
    this.form = new BaseComponent('form', ['form-registration']);
    this.formWrapper = new BaseComponent('div', ['form-registration-wrapper']);
    this.buttonWrapper = new BaseComponent('div', ['form-registration__buttons-wrapper']);
    this.buttonAdd = new Button(['btn', 'btn_add-user'], 'ADD USER', '/about', 'button', true);
    this.canvas = new Canvas('form__image');
    this.inputFile = new InputFile(this.canvas);
    this.buttonCancel = new Button(['btn', 'btn_cancel'], 'CANCEL', '/about');
  }

  render(score: number, min: number, sec: number): void {
    this.score = score;
    this.form.element.innerHTML = `
    <span class="congratulations__text">Congratulations!
        You successfully found all matches on ${min}.${sec} minutes.
    </span>
    <h2 class='title'>Registr new Player</h2>
       `;
    const avatarWrapper = new BaseComponent('div', ['form__avatar']).element;

    inputsParam.forEach((item) => {
      const label = new BaseComponent('label', ['form-registration__label'], item.labelText);
      const errLabel = new BaseComponent('div', ['input_error-message'], 'заполните это поле');
      const input = new Input(item.id, item.type, item.rule, errLabel.element, this.inputs, this.buttonAdd);
      this.inputs.push(input);
      this.formWrapper.element.appendChild(input.element);
      this.formWrapper.element.appendChild(label.element);
      this.formWrapper.element.appendChild(errLabel.element);
    });

    this.form.element.appendChild(new BaseComponent('figure', ['form-registration__avatar']).element);
    this.form.element.appendChild(avatarWrapper);
    avatarWrapper.appendChild(this.canvas.element);
    avatarWrapper.appendChild(this.inputFile.element);

    this.element.appendChild(this.form.element);
    this.form.element.appendChild(this.formWrapper.element);
    this.form.element.appendChild(this.buttonWrapper.element);
    this.buttonWrapper.element.appendChild(this.buttonAdd.element);
    this.buttonWrapper.element.appendChild(this.buttonCancel.element);
  }
}
