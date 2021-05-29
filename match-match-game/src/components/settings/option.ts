import { BaseComponent } from '../../shared/base-component';

export class Option extends BaseComponent {
  constructor(category: string, value: string) {
    super('option', [`${category}`], `${category}`);
    this.element.setAttribute('value', value);
  }
}
