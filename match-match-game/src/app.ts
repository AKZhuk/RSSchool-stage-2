import { BestScore } from './components/best-scores/best-scores';
import { About } from './components/about/about';
// import { appField } from './components/app-field/app-field';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ImageCategory } from './components/interfaces';
import { Main } from './components/main/main';
import { Settings } from './components/settings/settings';

export class App {
  private readonly header: Header;

  readonly main: Main;

  private readonly about: About;

  private readonly bestScore: BestScore;

  private readonly settings: Settings;

  private readonly game: Game;

  private readonly routes: { [key: string]: Node };

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.main = new Main();
    this.about = new About();
    this.bestScore = new BestScore();
    this.settings = new Settings();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
    this.main.element.appendChild(this.about.element);
    this.game = new Game();
    this.routes = {
      '/': this.about.element,
      '/best-score': this.bestScore.element,
      '/settings': this.settings.element,
      '/game': this.game.element,
    };
  }

  onNav(pathname: string) {
    this.clear();
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

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();
    const images = categories[this.settings.settingsValues[0]].images
      .slice(0, (this.settings.settingsValues[1] + 1) * 8)
      .map((name) => `${categories[this.settings.settingsValues[0]].category}/${name}`);
    this.game.newGame(images);
  }
}
