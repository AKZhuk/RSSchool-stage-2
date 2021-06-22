import { BaseComponent } from './shared/base-component';

export class App {
  readonly main: BaseComponent;

  constructor() {
    this.main = new BaseComponent(document.body, 'main', ['main']);
    console.log('create app');
  }
}
