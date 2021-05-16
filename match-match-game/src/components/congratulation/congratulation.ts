import { BaseComponent } from '../base-component';

export class Congratulation extends BaseComponent {
  constructor() {
    super('div', ['cover']);
    this.element.innerHTML = `
    <div class="cover">
      <div class="congratulations">
        <span class="congratulations__text">Congratulations! You successfully found all matches on 1.21 minutes.</span>
        <a href="#" data-link="/best-score" class="congratulations__btn btn">OK</a>
      </div>
    </div>`;
  }
}
