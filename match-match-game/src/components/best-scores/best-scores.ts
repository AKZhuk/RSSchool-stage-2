import { Canvas } from '../../shared/canvas';
import { BaseComponent } from '../../shared/base-component';
import { User } from '../../shared/interfaces';
// import { Registration } from '../registration/registration';
import './best-score.scss';

export class BestScore extends BaseComponent {
  private readonly title: BaseComponent;

  wrapper: BaseComponent;

  constructor() {
    super('div', ['wrapper', 'best-scores']);
    this.title = new BaseComponent('h2', ['title'], 'Best players');
    this.wrapper = new BaseComponent('div', ['testtt']);
    this.element.appendChild(this.title.element);
    this.element.appendChild(this.wrapper.element);
  }

  clearScore(): void {
    this.wrapper.element.innerHTML = '';
  }

  renderScore(arr: User[]): void {
    this.clearScore();
    arr.sort((obj1, obj2) => {
      if (obj1.score > obj2.score) {
        return -1;
      }
      return 0;
    });

    arr.slice(0, 10).forEach((e) => {
      const canvas = new Canvas('user__avatar');
      canvas.drawImage(e.image);
      const section = new BaseComponent('section', ['top-players']);
      this.wrapper.element.appendChild(section.element);

      section.element.innerHTML += `
        <div class='top-players__user user'>
        <div class="user__information">
          <h3 class="user__name">${e.firstName} ${e.lastName}</h3 >
          <h4 class="user__email" > ${e.email}</h4></div>
        </div>
        <div class="top-players__score score">
          <span class="Score__title">Score:</span>
          <output class="score__result"> ${e.score}</output>
        </div>`;
      section.element.appendChild(canvas.element);
    });
    // this.element.appendChild(new Registration(0, 0, 0).element);
  }
}
