import { BaseComponent } from '../shared/base-component';
import { CardType } from '../shared/interfaces';

export class Card extends BaseComponent {
  constructor(
    parent: BaseComponent,
    text: string,
    words: CardType[],
    index: number,
  ) {
    super(parent.element, 'a', ['card']);
    this.element.setAttribute('href', `/#/category/${index}`);
    this.element.dataset.category = text;
    this.element.innerHTML = `
       <div class='img' style="background-image: url('./${words[0].image}')"></div>
      <p>${text}</p>
    `;
  }
}
