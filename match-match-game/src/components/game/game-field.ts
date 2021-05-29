import { BaseComponent } from '../../shared/base-component';
import { Card } from './card/card';

export class GameField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['app-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));

    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, 5000);
  }
}
