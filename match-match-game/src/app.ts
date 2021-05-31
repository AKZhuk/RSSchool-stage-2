import { BestScore } from './components/best-scores/best-scores';
import { About } from './components/about/about';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Category, User } from './shared/interfaces';
import { Settings } from './components/settings/settings';
import { Database } from './shared/db';
import { BaseComponent } from './shared/base-component';

export class App {
  iDB: Database;

  header: Header;

  readonly main: BaseComponent;

  readonly about: About;

  bestScore: BestScore;

  readonly settings: Settings;

  readonly game: Game;

  private readonly routes: { [key: string]: Node };

  constructor(private readonly rootElement: HTMLElement) {
    this.iDB = new Database();
    this.iDB.init();
    this.header = new Header();
    this.main = new BaseComponent('main', ['main']);
    this.about = new About();
    this.bestScore = new BestScore();
    this.settings = new Settings();
    this.game = new Game();
    this.routes = {
      about: this.about.element,
      'best-score': this.bestScore.element,
      settings: this.settings.element,
      game: this.game.element,
    };

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
    window.location.hash = 'about';
    this.header.toggleActiveLink('about');
    this.main.element.appendChild(this.about.element);
  }

  onNav(pathname: string): void {
    this.header.toggleActiveLink(pathname);

    if (pathname === 'best-score') {
      this.iDB.readAll('users').then(arr => {
        this.bestScore.renderScore(arr);
      });
    }

    if (window.location.hash === '#game') {
      this.game.resetGame();
      this.header.addStartGameButton();
    }

    window.location.hash = pathname;
  }

  private clear() {
    this.main.element.innerHTML = '';
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: Category[] = await res.json();
    const imageCategory = categories[this.settings.settingsValues[0]];
    const difficulty = this.settings.settingsValues[1];
    const images = imageCategory.images
      .slice(0, difficulty)
      .map(name => `${categories[this.settings.settingsValues[0]].category}/${name}`);
    this.game.newGame(images, difficulty);
  }

  addListeners(): void {
    window.onpopstate = () => {
      const id = window.location.hash.slice(1);
      this.clear();
      this.header.toggleActiveLink(id);
      this.main.element.appendChild(this.routes[id]);
    };

    this.header.StartGameButton.element.addEventListener('click', e => {
      const navItem = e.target as HTMLElement;
      this.start();
      this.onNav(navItem.dataset.link as string);
      this.header.addStopGameButton();
    });

    this.header.StopGameButton.element.addEventListener('click', e => {
      e.preventDefault();
      this.game.resetGame();
      const navItem = e.target as HTMLElement;
      this.onNav(navItem.dataset.link as string);
    });

    window.onload = () => {
      const navItems = document.querySelectorAll('.navigation__item');
      navItems.forEach((item: Element) => {
        item.addEventListener('click', e => {
          e.preventDefault();
          const navItem = e.target as HTMLElement;
          this.onNav(navItem.dataset.link as string);
        });
      });
    };

    this.game.modal.element.addEventListener('submit', e => {
      e.preventDefault();
      const user: User = {
        firstName: (<HTMLInputElement>this.game.modal.inputs[0].element).value,
        lastName: (<HTMLInputElement>this.game.modal.inputs[1].element).value,
        email: (<HTMLInputElement>this.game.modal.inputs[2].element).value,
        image: this.game.modal.canvas.base64Files,
        score: this.game.modal.score,
      };
      this.iDB.write('users', user);

      this.onNav('best-score');
    });

    this.game.modal.buttonCancel.element.addEventListener('click', e => {
      e.preventDefault();
      this.onNav('about');
    });
  }
}
