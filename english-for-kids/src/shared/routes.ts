import { IRoutes } from './interfaces';

export class Router {
  routes: IRoutes[] = [];

  root = '/';

  current: string = this.root;

  intervalId: NodeJS.Timeout;

  constructor() {
    this.listen();
    this.intervalId = setInterval(this.interval, 50);
  }

  add = (path: string, cb: () => void): this => {
    this.routes.push({ path, cb });
    return this;
  };

  /*
  remove = (path: string) => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };
*/

  clearSlashes = (path: string): string => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = (): string => {
    let fragment = '';
    const match = window.location.href.match(/#(.*)$/);

    fragment = match ? match[1] : '';
    return this.clearSlashes(fragment);
  };

  navigate = (path = ''): void => {
    window.location.href = `${window.location.href.replace(
      /#(.*)$/,
      '',
    )}#${path}`;
    const func = this.routes[2].cb;
    func();
  };

  listen = (): void => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.interval, 50);
    //
  };

  interval = (): void => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match as []);
        return match;
      }
      return false;
    });
  };
}
