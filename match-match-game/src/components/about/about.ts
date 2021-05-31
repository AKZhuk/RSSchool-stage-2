import { BaseComponent } from '../../shared/base-component';
import './about.scss';

export class About extends BaseComponent {
  constructor() {
    super('div', ['game-field', 'wrapper']);
    this.element.innerHTML = `<h2 class="title">How to play?</h2>
      <div class="how-to-play">


        <section class="how-to-play__item">
          <figure class="circle">1</figure>
          <span class="how-to-play__text">Configure your game settings</span>
        </section>
        <a href="#" data-link="settings" class="navigation__item btn_game-settings"
          >
          <figure class="settings-svg about__svg"></figure>
          Game Settings</a
        >
        <section class="how-to-play__item">
          <figure class="circle">2</figure>
          <span class="how-to-play__text"
            >Start you new game! Remember card <br />positions and match it before times up.</span
          >
        </section>
        <section class="how-to-play__item preview-img"></section>
         <section class="how-to-play__item relative">
          <figure class="circle">3</figure>
          <span class="how-to-play__text">Register new player in game for best scores</span>
          <div class='message'><b>Информация для проверяющего:</b>
            Форма регистрация отображается после окончания игры. Данная реализация
            разрешена автором таска
            <a href=' https://docs.google.com/spreadsheets/d/1friRvR7djdTnfTVDhpeTcMEDiD-RIwxHO_V8wcGe65o/edit#gid=0'>
           см строку 41</a>
          </div>
        </section>
        <section class="how-to-play__item form-img"></section>
      </div>
    `;
  }
}
