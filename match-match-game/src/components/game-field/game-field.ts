import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import './app-field.scss';

export class GameField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['app-field', 'wrapper', 'hui']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));

    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, 5000);
  }
}
