import { Card } from './card';
import { Header } from './header';
import { BaseComponent } from '../shared/base-component';
import { cards } from '../shared/constants';
import { CardType } from '../shared/interfaces';
import { Router } from '../shared/routes';
import { WordCard } from './word-card';

export class App {
  readonly main: BaseComponent;

  readonly header: Header;

  router: Router;

  constructor() {
    this.header = new Header(cards[0] as string[]);
    this.main = new BaseComponent(document.body, 'main', ['main']);
    this.router = new Router();
    this.configRoutes();
  }

  configRoutes = (): void => {
    cards[0].forEach((category, index) => {
      this.router.add(`category/${index + 1}`, () => {
        const words: CardType[] = cards[index + 1] as CardType[];
        words.forEach((word) => {
          new WordCard(word);
        });
      });
    });

    this.router.add('', () => {
      const categories: string[] = cards[0] as string[];
      categories.forEach((category, index) => {
        const words: CardType[] = cards[index + 1] as CardType[];
        new Card(this.main, <string>category, words, index + 1);
      });
    });
  };
}
