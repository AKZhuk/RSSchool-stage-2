import { BaseComponent } from '../../shared/base-component';
import { Button } from '../../shared/button';
import { Rules } from '../../shared/interfaces';

export class Input extends BaseComponent {
  isValid: boolean;

  errField: HTMLElement;

  constructor(id: string, type: string, rules: Rules[], errField: HTMLElement, inputs: Input[], buttonAdd: Button) {
    super('input', ['form__input']);
    this.element.id = id;
    this.isValid = false;
    this.element.setAttribute('type', type);
    this.element.setAttribute('maxlength', '30');
    this.errField = errField;
    // this.addListener(form, rules, type);

    this.element.addEventListener('input', (e) => {
      this.element.className = 'form__input';
      const { value } = <HTMLInputElement>e.target;
      this.isValid = this.checkIsEmpty();
      this.errField.innerText = '';
      rules.forEach((rule) => {
        let test = value.match(rule.RegExp);
        if (type === 'email') {
          if (test != null) {
            test = null;
          } else {
            test = ['3'];
          }
        }

        if (test != null) {
          this.element.classList.add('input_error');

          this.errField.innerText = rule.errMessage;
          this.isValid = false;
        }
      });
      if (this.isValid) {
        this.element.className = 'form__input input_valid';
      }

      if (inputs.every((input) => input.isValid)) {
        buttonAdd.element.removeAttribute('disabled');
      } else {
        buttonAdd.element.setAttribute('disabled', '');
      }
    });
  }

  checkIsEmpty(): boolean {
    const { value } = <HTMLInputElement> this.element;
    if (value === '') {
      this.errField.innerText = 'заполните это поле';
      this.isValid = false;
      return false;
    }
    return true;
  }
  /*
  addListener(form: Registration, rules: Rules[], type: string): void {
    this.element.addEventListener('input', (e) => {
      this.element.className = 'form__input';
      const { value } = <HTMLInputElement>e.target;
      this.isValid = this.checkIsEmpty();
      this.errField.innerText = '';
      rules.forEach((rule) => {
        let test = value.match(rule.RegExp);
        if (type === 'email') {
          if (test != null) {
            test = null;
          } else {
            test = ['3'];
          }
        }

        if (test != null) {
          this.element.classList.add('input_error');

          this.errField.innerText = rule.errMessage;
          this.isValid = false;
        }
      });
      if (this.isValid) {
        this.element.className = 'form__input input_valid';
      }

      if (form.inputs.every((input) => input.isValid)) {
        form.buttonAdd.element.removeAttribute('disabled');
      } else {
        form.buttonAdd.element.setAttribute('disabled', '');
      }
    });
  } */
}
