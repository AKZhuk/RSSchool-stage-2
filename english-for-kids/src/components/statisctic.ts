import { BaseComponent } from '../shared/base-component';
import { appState, cards } from '../shared/constants';
import { ICard, IWordStatistic } from '../shared/interfaces';
import { $ } from '../shared/utils';

export class Statistic extends BaseComponent {
  constructor() {
    super($('.main'), 'div', ['statistic']);

    if (localStorage.length < 1) {
      this.setDefaultData();
    }
  }

  setDefaultData = (): void => {
    for (let i = 1; i < cards.length; i++) {
      const words: ICard[] = cards[i] as ICard[];
      words.forEach((elem) => {
        localStorage.setItem(
          elem.word,
          JSON.stringify({
            word: elem.word,
            translation: elem.translation,
            category: cards[0][i - 1] as string,
            trained: 0,
            correct: 0,
            incorect: 0,
            result: 100,
          }),
        );
      });
    }
  };

  static getWordStatistic = (word: string): IWordStatistic => JSON.parse(localStorage.getItem(`${word}`) as string);

  getAllStatistic = (): IWordStatistic[] => {
    const stat: IWordStatistic[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (Statistic.getWordStatistic(key)) {
        stat.push(Statistic.getWordStatistic(key));
      }
    });
    stat.sort((a, b) => b.incorect - a.incorect);
    return stat;
  };

  render = (): void => {
    $('.main').innerHTML += `
    <button id="resetBtn" class="btn">Reset</button>
    <a id="trainBtn" href="#/train" class="btn">Train difficult</a>
    <div style="overflow-x:auto; width:100%">
    <table class="table table-striped  table-hover">
    <thead>
    <tr>
      <th scope="col">Word</th>
      <th scope="col">Translation</th>
      <th scope="col">Category</th>
      <th scope="col">Trained</th>
      <th scope="col">Correct</th>
      <th scope="col">Incorect</th>
      <th scope="col">%</th>
    </tr>
  </thead>
  <tbody>
    ${this.renderData()}
  </tbody>
</table>
    </div>`;
  };

  static update = (
    word: string,
    StatisticType: 'correct' | 'incorect' | 'trained',
  ): void => {
    const wordStat: IWordStatistic = Statistic.getWordStatistic(word);
    wordStat[StatisticType] += 1;
    localStorage.setItem(word, JSON.stringify(wordStat));
  };

  renderData = (): string => {
    let HTML = '';
    Object.keys(localStorage).forEach((key) => {
      const wordStat = Statistic.getWordStatistic(key);
      if (wordStat) {
        HTML += `<tr>
      <th scope="row">${wordStat.word}</th>
      <td>${wordStat.translation}</td>
      <td>${wordStat.category}</td>
      <td>${wordStat.trained}</td>
      <td>${wordStat.correct}</td>
      <td>${wordStat.incorect}</td>
      <td>${this.calculateResult(wordStat.correct, wordStat.incorect)}</td>
      </tr>`;
      }
    });
    return HTML;
  };

  calculateResult = (correct: number, incorrect: number): string => {
    if (correct === 0 || incorrect === 0) {
      return '0';
    }
    return `${((correct / incorrect) * 100).toFixed()}%`;
  };

  listen = (): void => {
    $('#resetBtn').addEventListener('click', () => {
      this.setDefaultData();
      $('tbody').innerHTML = this.renderData();
    });

    $('#trainBtn').addEventListener('click', () => {
      const words = this.getAllStatistic().slice(0, 8);
      const data = (cards.slice(1) as ICard[][]).reduce(
        (acc: ICard[], val: ICard[]) => acc.concat(val),
      );
      appState.trainWords = data.filter((x: ICard) => words.some((y) => x.word === y.word));
    });
  };
}
