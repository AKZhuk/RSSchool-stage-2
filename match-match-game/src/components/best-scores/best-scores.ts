import { BaseComponent } from '../base-component';
import './best-score.scss';

export class BestScore extends BaseComponent {
  constructor() {
    super('div', ['wrapper', 'best-scores']);
    this.element.innerHTML = `<h2 class="title">Best players</h2><section class="top-players"><div
class="top-players__user user"><figure
  class="user__avatar" > </figure><div class="user__information"><h3 class="user__name">Nicci Troiani</h3 >
  <h4 class="user__email" > nicci@gmail.com</h4></div>
  </div ><div class="top-players__score score"><span class="Score__title">
  Score:</span><output class="score__result">456</output></div></section>
  <section class="top-players"><div
class="top-players__user user"><figure
  class="user__avatar" > </figure><div class="user__information"><h3 class="user__name">Nicci Troiani</h3 >
  <h4 class="user__email" > nicci@gmail.com</h4></div>
  </div ><div class="top-players__score score"><span class="Score__title">
  Score:</span><output class="score__result">456</output></div></section>
  <section class="top-players"><div
class="top-players__user user"><figure
  class="user__avatar" > </figure><div class="user__information"><h3 class="user__name">Nicci Troiani</h3 >
  <h4 class="user__email" > nicci@gmail.com</h4></div>
  </div ><div class="top-players__score score"><span class="Score__title">
  Score:</span><output class="score__result">456</output></div></section>
  `;
  }
}
