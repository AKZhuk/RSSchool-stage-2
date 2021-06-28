import { Card } from './card';
import { Header } from './header';
import { BaseComponent } from '../shared/base-component';
import { appState, cards } from '../shared/constants';
import { ICard } from '../shared/interfaces';
import { Router } from '../shared/routes';
import { WordCard } from './word-card';
import { $ } from '../shared/utils';
import { Game } from './game';
import { Statistic } from './statisctic';

export class App {
  readonly main: BaseComponent;

  readonly header: Header;

  game: Game;

  router: Router;

  statistic: Statistic;

  constructor() {
    this.header = new Header(cards[0] as string[]);
    this.main = new BaseComponent(document.body, 'main', ['main']);
    this.router = new Router();
    this.header.listen(this.router);
    this.game = new Game(this.router);
    this.statistic = new Statistic();
  }

  configRoutes = (): void => {
    (cards[0] as string[]).forEach((category, index: number) => {
      this.router.add(`category/${index + 1}`, () => {
        this.game.resetGame();
        this.clearMain();
        this.header.toggleActiveLink(`/#/category/${index + 1}`);
        $(`a[href="/#/category/${index + 1}"]`).classList.add('active-link');
        const words: ICard[] = cards[index + 1] as ICard[];
        this.renderWordCards(words);
      });
    });

    this.router.add('statistic', () => {
      this.game.resetGame();
      this.clearMain();
      this.header.toggleActiveLink('/#/statistic');
      this.statistic.render();
      this.statistic.listen();
    });

    this.router.add('train', () => {
      this.game.resetGame();
      this.clearMain();
      this.header.toggleActiveLink('#/train');
      this.renderWordCards(appState.trainWords);
    });

    this.router.add('', () => {
      this.game.resetGame();
      this.clearMain();
      this.header.toggleActiveLink('#');
      this.renderWordCategories();
    });
  };

  renderWordCategories = (): void => {
    const categories: string[] = cards[0] as string[];
    categories.forEach((category, index) => {
      const words: ICard[] = cards[index + 1] as ICard[];
      const card = new Card(this.main, <string>category, words, index + 1);
    });
  };

  renderWordCards = (words: ICard[]): void => {
    words.forEach((word) => {
      const wordCard = new WordCard(word);
      wordCard.render();
      wordCard.listen();
    });

    if (appState.isGameMode) {
      const startBtn = new BaseComponent(
        this.main.element,
        'button',
        ['btn', 'game__start-btn'],
        'Start Game',
      );

      startBtn.element.addEventListener('click', () => {
        this.game.newGame(words);
      });
    }
  };

  clearMain = (): void => {
    this.main.element.innerHTML = '';
  };
}
