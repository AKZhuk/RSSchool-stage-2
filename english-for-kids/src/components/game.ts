import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { ICard } from '../shared/interfaces';
import { $, playAudio } from '../shared/utils';

export class Game {
  currentWord = '';

  errorsCounter = 0;

  rating: BaseComponent;

  newGame = (cards: ICard[]): void => {
    if (!appState.isGame) {
      appState.gameWords = cards.sort(() => Math.random() - 0.5);
      this.listen();
      this.rating = new BaseComponent($('.main'), 'div', ['rating__container']);
      appState.currentGameWord = appState.gameWords.shift();
      appState.isGame = true;
      $('.game__start-btn').innerText = 'repeat';
    }
    playAudio(appState.currentGameWord.audioSrc);
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
      ) return;
      card.dataset.word === appState.currentGameWord?.word
        ? this.handleCorrect(card)
        : this.handleError();
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
    playAudio(appState.currentGameWord.audioSrc);
  };

  handleError = (): void => {
    playAudio('./audio/failure.mp3');
    this.rating.element.innerHTML += '<div class="rating__error rating"></div>';
    this.errorsCounter++;
  };

  showResult = (): void => {
    appState.isGame = false;
    this.errorsCounter
      ? this.renderResult('failure', `Failure(( You have ${this.errorsCounter}`)
      : this.renderResult('success');
  };

  renderResult = (result: string, text?: string): void => {
    $('main').innerHTML = `
    <div>
    <div class="game__result ${result}">
    </div>
    <h1>${text}</h1>
    </div>
    `;
    setTimeout(() => {
      window.location.hash = '';
    }, 5000);
  };
}
