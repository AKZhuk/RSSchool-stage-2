import { IRoutes } from './interfaces';

export class Router {
  routes: IRoutes[] = [];

  root = '/english-for-kids/dist/';

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

  clearSlashes = (path: string): string => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = (): string => {
    let fragment = '';
    const match = window.location.href.match(/#(.*)$/);

    fragment = match ? match[1] : '';
    return this.clearSlashes(fragment);
  };

  navigate = (path = ''): this => {
    window.location.href = `${window.location.href.replace(
      /#(.*)$/,
      '',
    )}#${path}`;
    this.routes.some((route): boolean => {
      if (route.path === path) {
        route.cb();
        return true;
      }
      return false;
    });

    return this;
  };

  listen = (): void => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.interval, 50);
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
