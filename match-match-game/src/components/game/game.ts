import { delay } from '../../shared/delay';
import { GameField } from './game-field';
import { BaseComponent } from '../../shared/base-component';
import { Card } from './card/card';
import { Registration } from '../registration/registration';
import { Timer } from '../../shared/timer';
import { GameResult } from '../../shared/interfaces';
import './game.scss';

export class Game extends BaseComponent {
  readonly timer: Timer;

  gameField: GameField;

  modal: Registration;

  private activeCard?: Card;

  private isAnimation: boolean;

  private gameResult: GameResult;

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
    this.modal = new Registration();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.gameField.element);
  }

  resetGame(): void {
    this.gameField.clear();
    this.activeCard = undefined;
    this.isAnimation = false;
    this.timer.stop();
    this.timer.clear();
    this.gameResult.mistakes = 0;
    this.gameResult.corrects = 0;
    this.gameResult.flips = 0;
  }

  newGame(images: string[], difficulty: number): void {
    this.resetGame();
    this.gameResult.cardsPairs = images.length;
    const cards = images
      .concat(images)
      .map(url => new Card(url, difficulty))
      .sort(() => Math.random() - 0.5);
    this.gameField.addCards(cards);

    setTimeout(() => {
      this.timer.start();
      cards.forEach(card => {
        card.element.addEventListener('click', () => {
          this.cardHandler(card);
        });
      });
    }, 5000);
  }

  showModal(score: number, min: number, sec: number): void {
    this.modal.render(score, min, sec);
    this.gameField.element.appendChild(this.modal.element);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation || card.isCorrect || card === this.activeCard) return;
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
      await delay(2000);
      await Promise.all([
        this.activeCard.changeStatus('mistake'),
        card.changeStatus('mistake'),
        this.activeCard.flipToBack(),
        card.flipToBack(),
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
    return score < 0 ? 0 : score;
  }
}
