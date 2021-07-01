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
    this.listen();
  }

  newGame = (cards: ICard[]): void => {
    if (!appState.isGame) {
      appState.gameWords = [...cards.sort(() => Math.random() - 0.5)];

      this.rating = new BaseComponent($('.main'), 'div', ['rating__container']);
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
    this.errorsCounter = 0;
  };

  listen = (): void => {
    $('.main').addEventListener('click', (e) => {
      const card = e.target as HTMLElement;

      if (
        card.classList.contains('correct')
        || !card.classList.contains('card_game')
        || !appState.isGame
      ) {
        return;
      }

      if (card.dataset.word === appState.currentGameWord?.word) {
        this.handleCorrect(card);
        Statistic.update(card.dataset.word as string, 'correct');
      } else {
        this.handleError();
        Statistic.update(appState.currentGameWord?.word as string, 'incorect');
      }
    });
  };

  handleCorrect = (card: HTMLElement): void => {
    playAudio('./audio/correct.mp3');
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
    playAudio('./audio/error.mp3');
    this.errorsCounter++;
    this.rating.element.innerHTML += '<div class="rating__error rating"></div>';
  };

  showResult = (): void => {
    appState.isGame = false;
    if (this.errorsCounter) {
      this.renderResult('failure', `${this.errorsCounter} mistakes`);
    } else {
      this.renderResult('success');
    }
  };

  renderResult = (result: string, text = ''): void => {
    $('main').innerHTML = `
    <section class="congratulation">
      <div class="congratulation__img ${result}"></div>
      <h2 class="congratulation__text">${text}</h2>
    </section>
    `;
    playAudio(`./audio/${result}.mp3`);
    setTimeout(() => {
      window.location.hash = '';
    }, 5000);
  };
}
