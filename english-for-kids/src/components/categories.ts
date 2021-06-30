import { BaseComponent } from '../shared/base-component';
import { cards } from '../shared/constants';
import { ICard } from '../shared/interfaces';
import { CategoryCard } from './categoryCard';

export class Categories extends BaseComponent {
  cards: CategoryCard[] = [];

  constructor() {
    super(undefined, 'section', ['categories']);
    this.renderCategories();
  }

  renderCategories = (): void => {
    const categories: string[] = cards[0] as string[];
    categories.forEach((category, index) => {
      const words: ICard[] = cards[index + 1] as ICard[];
      this.cards.push(
        new CategoryCard(this, <string>category, words, index + 1),
      );
    });
  };
}
