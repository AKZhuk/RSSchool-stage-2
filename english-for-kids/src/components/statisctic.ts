import { BaseComponent } from '../shared/base-component';
import { appState, cards } from '../shared/constants';
import { ICard, IWordStatistic } from '../shared/interfaces';
import { $ } from '../shared/utils';

export class Statistic extends BaseComponent {
  constructor() {
    super($('.main'), 'section', ['statistic']);
    this.render();
    this.listen();
    this.renderData();
    if (localStorage.length < 1) {
      this.setDefaultData();
    }
  }

  private render = (): void => {
    this.element.innerHTML = `
    <button id="resetBtn" class="btn">Reset</button>
    <a id="trainBtn" href="#/train" class="btn">Train difficult</a>
    <div class="tableFixHead ">
    <table class="table table-striped  table-hover sortable">
      <thead>
        <tr>
          <th scope="col"  data-name="word">Word</th>
          <th scope="col" data-name="translation">Translation</th>
          <th scope="col" data-name="category">Category</th>
          <th scope="col" data-name="trained">Trained</th>
          <th scope="col" data-name="correct">Correct</th>
          <th scope="col" data-name="incorect">Incorect</th>
          <th scope="col" data-order="desc" data-name="result">%</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    </div>`;
  };

  renderData = (): void => {
    let data: IWordStatistic[] = this.getAllStatistic();
    data = this.sortData(data);
    $('tbody').innerHTML = '';

    data.forEach((word) => {
      $('tbody').innerHTML += `<tr>
      <th scope="row">${word.word}</th>
      <td>${word.translation}</td>
      <td>${word.category}</td>
      <td>${word.trained}</td>
      <td>${word.correct}</td>
      <td>${word.incorect}</td>
      <td>${word.result}%</td>
      </tr>`;
    });
  };

  private static calculateResult = (
    correct: number,
    incorrect: number,
  ): number => {
    if (correct === 0) {
      return 0;
    }
    return Math.ceil((correct / (incorrect + correct)) * 100);
  };

  private listen = (): void => {
    $('#resetBtn').addEventListener('click', () => {
      this.setDefaultData();
      this.renderData();
    });

    $('#trainBtn').addEventListener('click', () => {
      const words = this.getDifficultWords();
      const data = (cards.slice(1) as ICard[][]).reduce(
        (acc: ICard[], val: ICard[]) => acc.concat(val),
      );
      appState.trainWords = data.filter((x: ICard) => words.some((y) => x.word === y.word));
    });

    $('thead').addEventListener('click', (e) => {
      const cell = e.target as HTMLElement;
      if (cell.dataset.order === 'desc') {
        cell.dataset.order = 'asc';
        appState.orderBy = 'asc';
      } else {
        $('[data-order]').removeAttribute('data-order');
        cell.dataset.order = 'desc';
        appState.orderBy = 'desc';
      }

      appState.sortBy = cell.dataset.name as keyof IWordStatistic;
      this.renderData();
    });
  };

  private setDefaultData = (): void => {
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
            result: 0,
          }),
        );
      });
    }
  };

  getAllStatistic = (): IWordStatistic[] => {
    const stat: IWordStatistic[] = [];
    Object.keys(localStorage).forEach((key) => {
      const wordStat = Statistic.getWordStatistic(key);
      if (wordStat) {
        stat.push(wordStat);
      }
    });
    return stat;
  };

  sortData = (data: IWordStatistic[]): IWordStatistic[] => {
    let tempData = data;
    tempData.sort((b, a) => {
      if (a[appState.sortBy] > b[appState.sortBy]) {
        return 1;
      }
      if (a[appState.sortBy] < b[appState.sortBy]) {
        return -1;
      }
      return 0;
    });
    if (appState.orderBy === 'asc') {
      tempData = tempData.reverse();
    }
    return tempData;
  };

  static getWordStatistic = (word: string): IWordStatistic => JSON.parse(localStorage.getItem(`${word}`) as string);

  static update = (
    word: string,
    StatisticType: 'correct' | 'incorect' | 'trained',
  ): void => {
    const wordStat: IWordStatistic = Statistic.getWordStatistic(word);
    wordStat[StatisticType] += 1;
    wordStat.result = Statistic.calculateResult(
      wordStat.correct,
      wordStat.incorect,
    );
    localStorage.setItem(word, JSON.stringify(wordStat));
  };

  private getDifficultWords = (): IWordStatistic[] => {
    let stat = this.getAllStatistic();
    stat = stat.filter((word) => word.incorect > 0);
    stat.sort((a, b) => b.incorect - a.incorect);
    return stat.slice(0, 8);
  };
}
