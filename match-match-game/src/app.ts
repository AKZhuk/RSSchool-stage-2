import { BestScore } from './components/best-scores/best-scores';
import { About } from './components/about/about';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Settings } from './components/settings/settings';

export class App {
  private readonly header: Header;

  readonly main: Main;

  private readonly about: About;

  private readonly bestScore: BestScore;

  private readonly settings: Settings;

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
    this.routes = {
      '/': this.about.element,
      '/best-score': this.bestScore.element,
      '/settings': this.settings.element,
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
}
