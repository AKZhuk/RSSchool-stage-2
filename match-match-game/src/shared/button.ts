import { BaseComponent } from './base-component';

export class Button extends BaseComponent {
  constructor(
    styles: string[],
    text: string,
    link: string,
    tag: keyof HTMLElementTagNameMap = 'button',
    disabled?: boolean,
  ) {
    super(tag, styles, text);
    this.element.dataset.link = link;
    this.element.setAttribute('type', 'submit');
    if (disabled) {
      this.element.setAttribute('disabled', '');
    }
  }
}
