import { Card } from './card';
import { Header } from './header';
import { BaseComponent } from '../shared/base-component';
import { appState, cards } from '../shared/constants';
import { ICard } from '../shared/interfaces';
import { Router } from '../shared/routes';
import { WordCard } from './word-card';
import { $ } from '../shared/utils';
import { Game } from './game';

export class App {
  readonly main: BaseComponent;

  readonly header: Header;

  game: Game;

  router: Router;

  constructor() {
    this.header = new Header(cards[0] as string[]);
    this.main = new BaseComponent(document.body, 'main', ['main']);
    this.game = new Game();
    this.router = new Router();
    this.header.listen(this.router);
    this.configRoutes();
  }

  configRoutes = (): void => {
    cards[0].forEach((category, index) => {
      this.router.add(`category/${index + 1}`, () => {
        this.game.resetGame();
        this.clearMain();
        this.header.toggleActiveLink(`/#/category/${index + 1}`);
        $(`a[href="/#/category/${index + 1}"]`).classList.add('active-link');
        this.renderWordCards(index);
      });
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
      new Card(this.main, <string>category, words, index + 1);
    });
  };

  renderWordCards = (index: number): void => {
    const words: ICard[] = cards[index + 1] as ICard[];
    words.forEach((word) => {
      const wordCard = new WordCard(word);
      wordCard.render();
      wordCard.listen();
    });

    if (appState.isGameMode) {
      const startBtn = new BaseComponent(
        this.main.element,
        'div',
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
