import { delay } from '../../shared/delay';
import { GameField } from './game-field';
import { BaseComponent } from '../../shared/base-component';
import { Card } from './card/card';
import { application } from '../../index';
import { Registration } from '../registration/registration';
import { Timer } from '../../shared/timer';
import './game.scss'

export class Game extends BaseComponent {
  readonly timer: Timer;

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
    super('div', ['game', 'wrapper']);
    this.isAnimation = false;
    this.gameResult = {
      flips: 0,
      corrects: 0,
      mistakes: 0,
      cardsPairs: 0,
    };
    this.timer = new Timer();
    this.gameField = new GameField();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.gameField.element);
  }

  newGame(images: string[]): void {
    this.gameField.clear();
    this.timer.clear();
    this.timer.start();
    application.header.addStopGameButton();
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
        this.timer.stop();
        const score = this.calculateScore(this.timer.min, this.timer.sec);
        this.showModal(score, this.timer.min, this.timer.sec);
      }
    }
    this.isAnimation = false;
    this.activeCard = undefined;
  }

  calculateScore(min: number, sec: number): number {
    const score = (this.gameResult.flips - this.gameResult.mistakes) * 100 - (min * 60 + sec) * 10;
    console.log('calc', score);

    return score < 0 ? 0 : score;
  }
}
