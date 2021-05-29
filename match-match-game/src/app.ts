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
      '/': this.about.element,
      '/best-score': this.bestScore.element,
      '/settings': this.settings.element,
      '/game': this.game.element,
    };
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
    this.onNav(window.location.pathname);
  }

  onNav(pathname: string): void {
    this.clear();
    this.header.toggleActiveLink(pathname);
    document.querySelectorAll('.navigation__item').forEach((item) => {
      item.classList.remove('active');
    });
    document.getElementById(`${pathname}`)?.classList.add('active');

    if (pathname === '/best-score') {
      this.iDB.readAll('users').then((arr) => {
        this.bestScore.renderScore(arr);
      });
    }

    if (window.location.pathname === '/game') {
      this.header.addStartGameButton();
    }

    window.history.pushState({}, pathname, window.location.origin + pathname);
    this.main.element.appendChild(this.routes[pathname]);

    window.onpopstate = () => {
      this.clear();
      this.main.element.appendChild(this.routes[window.location.pathname]);
    };
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
      .map((name) => `${categories[this.settings.settingsValues[0]].category}/${name}`);
    this.game.newGame(images, difficulty);
    this.header.addStopGameButton();
  }

  addListeners(): void {
    this.header.StopGameButton.element.addEventListener('click', (e) => {
      e.preventDefault();
      const navItem = e.target as HTMLElement;
      this.onNav(navItem.dataset.link as string);
      this.header.addStartGameButton();
      this.header.element.appendChild(this.header.StartGameButton.element);
    });

    this.header.StartGameButton.element.addEventListener('click', (e) => {
      const navItem = e.target as HTMLElement;
      this.start();
      this.onNav(navItem.dataset.link as string);
      this.header.addStopGameButton();
    });

    window.onload = () => {
      const navItems = document.querySelectorAll('.navigation__item');
      navItems.forEach((item: Element) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const navItem = e.target as HTMLElement;
          this.onNav(navItem.dataset.link as string);
        });
      });
    };

    this.game.modal.element.addEventListener('submit', (e) => {
      e.preventDefault();
      const user: User = {
        firstName: (<HTMLInputElement> this.game.modal.inputs[0].element).value,
        lastName: (<HTMLInputElement> this.game.modal.inputs[1].element).value,
        email: (<HTMLInputElement> this.game.modal.inputs[2].element).value,
        image: this.game.modal.canvas.base64Files,
        score: this.game.modal.score,
      };
      this.iDB.write('users', user);

      this.onNav('/best-score');
    });

    this.game.modal.buttonCancel.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.onNav('/');
    });
  }
}
