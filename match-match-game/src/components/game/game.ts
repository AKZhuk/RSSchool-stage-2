import { delay } from '../../shared/delay';
import { GameField } from '../game-field/game-field';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { Congratulation } from '../congratulation/congratulation';
import { application } from '../../index';

export class Game extends BaseComponent {
  private readonly gameField: GameField;

  private activeCard?: Card;

  private isAnimation: boolean;

  private gameResult: {
    flips: number;
    corrects: number;
    mistakes: number;
    cardsPairs: number;
  };

  constructor() {
    super('div', ['game']);
    this.isAnimation = false;
    this.gameResult = {
      flips: 0,
      corrects: 0,
      mistakes: 0,
      cardsPairs: 0,
    };
    this.gameField = new GameField();
    this.element.appendChild(this.gameField.element);
  }

  newGame(images: string[]) {
    this.gameField.clear();
    this.gameResult.mistakes = 0;
    this.gameResult.corrects = 0;
    this.gameResult.flips = 0;
    this.gameResult.cardsPairs = images.length;
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });
    this.gameField.addCards(cards);
  }

  showCongratulation() {
    const congratulation = new Congratulation();
    this.gameField.element.appendChild(congratulation.element);
    const btn = document.querySelector('.congratulations__btn');
    (btn as HTMLElement).addEventListener('click', (e) => {
      e.preventDefault();
      application.onNav('/best-score');
    });
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    this.gameResult.flips++;
    if (this.activeCard.image !== card.image) {
      card.changeStatus('mistake');
      this.activeCard.changeStatus('mistake');
      await delay(3000);
      await Promise.all([
        this.activeCard.flipToBack(),
        this.activeCard.changeStatus('mistake'),
        card.flipToBack(),
        card.changeStatus('mistake'),
      ]);
      this.gameResult.mistakes++;
    } else {
      card.changeStatus('correct');
      this.activeCard.changeStatus('correct');
      this.gameResult.corrects++;

      if (this.gameResult.corrects === this.gameResult.cardsPairs) {
        this.showCongratulation();
      }
    }
    this.isAnimation = false;
    this.activeCard = undefined;
  }
}
