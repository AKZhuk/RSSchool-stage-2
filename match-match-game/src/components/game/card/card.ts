import { BaseComponent } from '../../../shared/base-component';
import './card.scss';

export class Card extends BaseComponent {
  image: string;

  isCorrect: boolean;

  constructor(image: string, difficulty: number) {
    const className = `card-${difficulty}`;
    super('div', ['card-container', className]);
    this.image = image;
    this.isCorrect = false;
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}')">
          <div class="card__cover"></div>
        </div>
        <div class="card__back"></div>
      </div>`;
  }

  flipToBack(): Promise<void> {
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    return this.flip();
  }

  changeStatus(status: string): void {
    if (status === 'correct') {
      this.isCorrect = true;
    }
    const cover = this.element.querySelector('.card__cover');
    cover?.classList.toggle(`${status}`);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise(resolve => {
      this.element.classList.toggle('flip', isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
