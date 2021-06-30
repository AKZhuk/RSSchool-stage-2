import { BaseComponent } from '../shared/base-component';
import { ICard } from '../shared/interfaces';

export class CategoryCard extends BaseComponent {
  constructor(
    parent: BaseComponent,
    text: string,
    words: ICard[],
    index: number,
  ) {
    super(parent.element, 'a', ['card-container']);
    this.element.setAttribute('href', `/#/category/${index}`);
    this.element.dataset.category = text;
    this.element.innerHTML = `
      <div class="card">
        <div class='img' style="background-image: url('./${words[0].image}')"></div>
        <p class="card__description">${text}</p>
      </div>
    `;
  }
}
