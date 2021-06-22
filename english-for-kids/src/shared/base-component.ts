export class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    parent: HTMLElement,
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    text = '',
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerText = text;
    this.element.innerHTML = '<h1>APP<h1>';
    parent.appendChild(this.element);
  }
}
