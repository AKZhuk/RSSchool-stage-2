import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { ICard } from '../shared/interfaces';
import { Router } from '../shared/routes';
import { $, playAudio } from '../shared/utils';
import { Statistic } from './statisctic';

export class Game {
  currentWord = '';

  errorsCounter = 0;

  rating: BaseComponent;

  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.rating = new BaseComponent($('.main'), 'div', ['rating__container']);
  }

  newGame = (cards: ICard[]): void => {
    if (!appState.isGame) {
      appState.gameWords = cards.sort(() => Math.random() - 0.5);
      this.listen();
      this.rating = new BaseComponent(undefined, 'div', ['rating__container']);
      appState.currentGameWord = appState.gameWords.shift();
      appState.isGame = true;
      $('.game__start-btn').innerText = 'repeat';
      $('.game__start-btn').classList.add('game__repeat-btn');
    }
    playAudio((appState.currentGameWord as ICard).audioSrc);
  };

  resetGame = (): void => {
    appState.isGame = false;
    appState.currentGameWord = undefined;
    appState.gameWords = [];
  };

  listen = (): void => {
    $('.main').addEventListener('click', (e) => {
      const card = e.target as HTMLElement;

      if (
        card.classList.contains('correct')
        || !card.classList.contains('card_game')
      ) {
        return;
      }

      if (card.dataset.word === appState.currentGameWord?.word) {
        this.handleCorrect(card);
        Statistic.update(card.dataset.word as string, 'correct');
      } else {
        this.handleError();
        Statistic.update(card.dataset.word as string, 'incorect');
      }
    });
  };

  handleCorrect = (card: HTMLElement): void => {
    card.classList.add('correct');

    if (appState.gameWords.length === 0) {
      this.showResult();
      return;
    }
    this.rating.element.innerHTML
      += '<div class="rating__success rating"></div>';
    appState.currentGameWord = appState.gameWords.shift();
    playAudio((appState.currentGameWord as ICard).audioSrc);
  };

  handleError = (): void => {
    playAudio('./audio/failure.mp3');
    this.rating.element.innerHTML += '<div class="rating__error rating"></div>';
    this.errorsCounter++;
  };

  showResult = (): void => {
    appState.isGame = false;
    if (this.errorsCounter) {
      this.renderResult(
        'failure',
        `Failure(( You have ${this.errorsCounter} mistakes`,
      );
    } else {
      this.renderResult('success');
    }
  };

  renderResult = (result: string, text = ''): void => {
    $('main').innerHTML = `
    <div class="congratulation">
    <div class="congratulation__img ${result}">
    </div>
    <h2>${text}</h2>
    </div>
    `;
    /* setTimeout(() => {
      window.location.hash = '';
    }, 5000);
*/
    // window.location.hash = '';
  };
}
