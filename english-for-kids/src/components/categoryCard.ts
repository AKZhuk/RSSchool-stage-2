import { BaseComponent } from '../shared/base-component';
import { TWord, TCategory } from '../shared/interfaces';

export class CategoryCard extends BaseComponent {
  constructor(parent: BaseComponent, categoryData: TCategory, words: TWord[]) {
    super(parent.element, 'a', ['card-container']);
    this.element.setAttribute('href', `/#/category/${categoryData.name}`);
    this.element.dataset.category = categoryData.name;
    this.element.dataset.id = categoryData._id;
    const imgSRC = words[0] ? words[0].imageSRC : '';
    this.element.innerHTML = `
      <div class="card">
        <div class='img' style="background-image: url('${imgSRC}')" data-id="${categoryData._id}"></div>
        <p class="card__description" data-id="${categoryData._id}">${categoryData.name} </p>
      </div>
    `;
  }
}
