import { BaseComponent } from '../../shared/base-component';
import { TWord } from '../../shared/interfaces';

export class AdminWordCard extends BaseComponent {
  data: TWord;

  constructor(parent: HTMLElement, data: TWord) {
    super(parent, 'div', ['card-container', 'card_admin', 'card_word']);
    this.data = data;
    this.render();
  }

  render = (): void => {
    this.element.innerHTML = `
      <a class="closebtn btnDeleteWord" data-id="${this.data._id}">×</a>
      <p class="card__description">Word:${this.data.word}</p>
      <p class="card__description">Translation:${this.data.translation}</p>
      <p class="card__description">Sound file:${this.data.translation}</p>
      <div class=" img" style="background-image: url(${this.data.imageSRC})"></div>
      <button type="button" class="btn btn-outline-success btnChangeWord" data-id="${this.data._id}">Change</button>
      `;
  };

  renderUpdateState = (): void => {
    this.element.innerHTML = `
    <form class="form formUpdateWord">
      <input class="form-control form-control-sm" type="text" placeholder="Word"
       id="wordInput" value="${this.data.word}">
      <input class="form-control form-control-sm" type="text" placeholder="Translation"
      id="translationInput" value="${this.data.translation}">
      <input class="btn btn-success" type="file" id="audioInput" value="${this.data.audioSRC}">
      <input class="form-control form-control-sm" type="file" id="imageInput" value="${this.data.imageSRC}">
      <div>
      <a  class="btn btn-outline-danger btnCancelUpdate" data-id="${this.data._id}">Cancel</a>
      <button type="submit" class="btn btn-outline-success">Submit</button>
      </div>
    </form>`;
  };
}
