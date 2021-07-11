import { createWord, deleteWord, getWords } from '../../shared/api';
import { BaseComponent } from '../../shared/base-component';
import { appState } from '../../shared/constants';
import { TWord } from '../../shared/interfaces';
import { AdminWordCard } from './adminWordCard';

export class AdminWords extends BaseComponent {
  createContainer: BaseComponent;

  categoryID: string;

  words: TWord[] = [];

  wordsCard: { [key: string]: AdminWordCard } = {};

  constructor(categoryID: string) {
    super(undefined, 'section', ['categories']);
    this.categoryID = categoryID;
    this.createContainer = new BaseComponent(this.element, 'div', [
      'card-container',
      'card_admin',
      'card_word',
    ]);
    this.render();
  }

  render = (): void => {
    this.element.innerHTML = '';
    this.renderWords();
    this.createContainer = new BaseComponent(this.element, 'div', [
      'card-container',
      'card_admin',
      'card_word',
    ]);
    this.renderFormCreateWord();
  };

  renderWords = (): void => {
    this.words = appState.words.filter(
      (word) => word.categoryID === this.categoryID,
    );

    this.words.forEach((word) => {
      this.wordsCard[word._id] = new AdminWordCard(this.element, word);
    });
  };

  renderAddWordCard = (): void => {
    this.createContainer.element.innerHTML = `
    <p class="card__description">Add new Word</p>
    <div id="addCategory" class="add"></div>
    `;
  };

  renderFormCreateWord = (): void => {
    this.createContainer.element.innerHTML += `
     <form id="formCreateWord" class="form" action="" method="post">
     <input name="categoryID" type="hidden" value="${this.categoryID}" readonly>
     <input name="word" class="form-control form-control-sm" type="text" placeholder="Word" id="wordInput" required>
      <input name="translation" class="form-control form-control-sm" type="text"
      placeholder="Translation" id="translationInput" required>
      <input name="img" class="form-control form-control-sm" type="file" id="imageInput" required>
      <input name="audio" class="form-control form-control-sm" type="file" id="audioInput" required>
      <button fortype="submit" class="btn btn-outline-success" required>Submit</button>
     </form>`;
  };

  listen = (): void => {
    this.element.addEventListener('click', async (e) => {
      const elem = e.target as HTMLElement;
      const wordId: string = elem.dataset.id as string;

      if (elem.classList.contains('btnChangeWord')) {
        this.wordsCard[wordId].renderUpdateState();
      }

      if (elem.classList.contains('btnCancelUpdate')) {
        this.wordsCard[wordId].render();
      }

      if (elem.classList.contains('btnDeleteWord')) {
        await deleteWord(wordId);
        elem.parentElement?.remove();
        appState.words = await getWords();
      }
    });

    this.element.addEventListener('submit', async (e) => {
      e.preventDefault();
      const elem = e.target as HTMLFormElement;
      const data = new FormData(elem);

      if (elem.id === 'formCreateWord') {
        await createWord(data);
        appState.words = await getWords();
        this.render();
      }

      if (elem.classList.contains('formUpdateWord')) {
        // await updateWord(data)
      }
      this.render();
    });
  };
}
