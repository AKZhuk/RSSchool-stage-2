import { Header } from './header';
import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { TWord } from '../shared/interfaces';
import { Router } from '../shared/routes';
import { WordCard } from './wordCard';
import { Game } from './game';
// import { Statistic } from './statisctic';
import { Categories } from './categories';
import { AdminCategories } from './adminPanel/adminCategories';
import { AdminWords } from './adminPanel/adminWords';
import { isAdmin } from '../shared/utils';

export class App {
  readonly main: BaseComponent;

  readonly header: Header;

  game: Game;

  router: Router;

  // statistic: Statistic;

  categories: Categories;

  constructor() {
    this.header = new Header();
    this.main = new BaseComponent(document.body, 'main', ['main']);
    this.router = new Router();
    this.header.listen(this.router);
    this.categories = new Categories();
    this.game = new Game(this.router);
    // this.statistic = new Statistic();
  }

  configRoutes = (): void => {
    this.router.add('/words', () => {
      this.clearMain();
      this.header.renderAdminView('words');
      const view = new AdminWords(appState.currentCategoryID);
      this.main.element.appendChild(view.element);
      view.listen();
    });

    this.router.add('category', () => {
      if (isAdmin()) {
        document.location.hash = 'admin/categories';
        return;
      }
      this.game.resetGame();
      this.clearMain();
      const words: TWord[] = appState.words.filter(
        (word) => word.categoryID === appState.currentCategoryID,
      );
      this.renderWordCards(words);
    });
    /*
    this.router.add('statistic', () => {
      this.game.resetGame();
      this.clearMain();
      this.header.toggleActiveLink('/#/statistic');
      this.main.element.appendChild(this.statistic.element);
      this.statistic.renderData();
    });
*/
    this.router.add('train', () => {
      if (isAdmin()) {
        document.location.hash = 'admin/categories';
        return;
      }
      this.game.resetGame();
      this.clearMain();
      this.header.toggleActiveLink('#/train');
      //   this.renderWordCards(appState.trainWords);
    });

    this.router.add('admin/categories', () => {
      if (!isAdmin()) return;
      this.game.resetGame();
      this.clearMain();
      this.header.renderAdminView('categories');
      // this.header.toggleActiveLink('#/admin/categories');
      const view = new AdminCategories();
      this.main.element.appendChild(view.element);
      view.listen();
    });

    this.router.add('', () => {
      if (isAdmin()) {
        document.location.hash = 'admin/categories';
        return;
      }
      this.game.resetGame();
      this.clearMain();
      this.header.toggleActiveLink('#');
      this.categories.render();
      this.main.element.appendChild(this.categories.element);
    });
  };

  renderWordCards = (words: TWord[]): void => {
    words.forEach((word) => {
      const wordCard = new WordCard(word);
      wordCard.render();
      wordCard.listen();
    });

    if (appState.isGameMode) {
      const startBtn = new BaseComponent(
        this.main.element,
        'button',
        ['btn', 'game__start-btn', 'btn_colored'],
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
