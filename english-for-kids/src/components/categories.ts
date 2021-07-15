import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { TWord } from '../shared/interfaces';
import { CategoryCard } from './categoryCard';

export class Categories extends BaseComponent {
  cards: CategoryCard[] = [];

  constructor() {
    super(undefined, 'section', ['categories']);
    this.listen();
  }

  render = (): void => {
    this.clear();
    appState.categories.forEach((category) => {
      const words: TWord[] = appState.words.filter(
        (word) => word.categoryID === category._id,
      );
      this.cards.push(new CategoryCard(this, category, words));
    });
  };

  listen = (): void => {
    this.element.addEventListener('click', (e) => {
      const elem = e.target as HTMLElement;

      appState.currentCategoryID = elem.dataset.id as string;
    });
  };
}
