import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { ICard } from '../shared/interfaces';
import { $, playAudio } from '../shared/utils';

export class WordCard extends BaseComponent {
  readonly imageSRC: string;

  readonly audioSRC: string;

  readonly word: string;

  private isFlip: boolean;

  translation: string;

  constructor(card: ICard) {
    super($('.main'), 'div', ['card-container']);
    this.isFlip = false;
    this.imageSRC = card.image;
    this.audioSRC = `./${card.audioSrc}`;
    this.word = card.word;
    this.translation = card.translation;
    this.element.innerHTML = this.render();
  }

  render = (): string => (appState.isGameMode ? this.renderGameCard() : this.renderTrainCard());

  renderGameCard = (): string => `
      <div class="card card_game" data-word="${this.word}" style="background-image: url('./${this.imageSRC}')" >
         <div class=""></div>
      </div>`;

  renderTrainCard = (): string => `
      <div class="card">
        <div class="card__front " >
          <div class=" img" style="background-image: url('./${this.imageSRC}')"></div>
          <div class="card__description">
            <h5 class="description__title">${this.word}</h5>
            <div class="card__rotate"></div>
          </div>
        </div>
        <div class="card__back">
          <div class="img" style="background-image: url('./${this.imageSRC}')"></div>
          <h5 class="card__description">${this.translation}</h5>
        </div>
      </div>`;

  listen = (): void => {
    if (!appState.isGameMode) {
      this.element.addEventListener('click', () => {
        playAudio(this.audioSRC);
      });

      (<HTMLElement>(
        this.element.querySelector('.card__rotate')
      )).addEventListener('click', async () => this.flipToBack());

      this.element.addEventListener('mouseleave', async () => {
        if (this.isFlip) this.flipToFront();
      });
    }
  };

  flipToBack = (): Promise<void> => {
    this.isFlip = true;
    return this.flip(true);
  };

  flipToFront = (): Promise<void> => this.flip();

  private flip = (isFront = false): Promise<void> => new Promise((resolve) => {
    this.element.classList.toggle('flip', isFront);
    this.element.addEventListener('transitionend', () => resolve(), {
      once: true,
    });
  });
}
