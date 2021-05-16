import { BaseComponent } from '../base-component';
import './card.scss';

export class Card extends BaseComponent {
  image: string;

  constructor(image: string) {
    super('div', ['card-container']);
    this.image = image;
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}')">
          <div class="card__cover"></div>
        </div>
        <div class="card__back"></div>
      </div>`;
  }

  flipToBack() {
    return this.flip(true);
  }

  flipToFront() {
    return this.flip();
  }

  changeStatus(status: string) {
    const cover = this.element.querySelector('.card__cover');
    cover?.classList.toggle(`${status}`);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle('flip', isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
