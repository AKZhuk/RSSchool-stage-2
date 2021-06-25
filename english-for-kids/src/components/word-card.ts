import { BaseComponent } from '../shared/base-component';
import { CardType } from '../shared/interfaces';
import { $ } from '../shared/utils';

export class WordCard extends BaseComponent {
  readonly imageSRC: string;

  readonly audioSRC: string;

  readonly word: string;

  private isFlip: boolean;

  translation: string;

  constructor(card: CardType) {
    super($('.main'), 'div', ['card-container']);
    this.isFlip = false;
    this.imageSRC = card.image;
    this.audioSRC = `./${card.audioSrc}`;
    this.word = card.word;
    this.translation = card.translation;
    this.element.innerHTML = this.render();
    this.listen();
  }

  private render = (): string => {
    return `
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
          <h5 class="description__title">${this.translation}</h5>
        </div>
      </div>`;
  };

  private listen = (): void => {
    this.element.addEventListener('click', () => {
      this.playAudio();
    });

    (<HTMLElement>this.element.querySelector('.card__rotate')).addEventListener(
      'click',
      async () => this.flipToBack()
    );

    this.element.addEventListener('mouseleave', async () => {
      if (this.isFlip) this.flipToFront();
    });
  };

  playAudio = (): void => {
    const audio = new Audio();
    audio.currentTime = 0;
    audio.src = this.audioSRC;
    audio.play();
  };

  flipToBack = (): Promise<void> => {
    this.isFlip = true;
    return this.flip(true);
  };

  flipToFront = (): Promise<void> => {
    return this.flip();
  };

  private flip = (isFront = false): Promise<void> => {
    return new Promise((resolve) => {
      this.element.classList.toggle('flip', isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  };
}
