import {
  createWord, deleteWord, getWords, updateWord,
} from '../../shared/api';
import { BaseComponent } from '../../shared/base-component';
import { appState } from '../../shared/constants';
import { TWord } from '../../shared/interfaces';
import { $, getWord, playAudio } from '../../shared/utils';

export class AdminWords extends BaseComponent {
  addFormContainer: BaseComponent | undefined;

  categoryID: string;

  words: TWord[] = [];

  constructor(categoryID: string) {
    super(undefined, 'section', [
      'categories',
      'categories__infinite-container',
    ]);
    this.categoryID = categoryID;

    this.render();
  }

  listen = (): void => {
    this.element.addEventListener('click', async (e) => {
      const elem = e.target as HTMLElement;
      const wordId: string = elem.dataset.id as string;

      if (elem.classList.contains('btnChangeWord')) {
        const card = elem.parentElement as HTMLElement;
        this.renderFormUpdateWord(card, wordId);
      }

      if (elem.id === 'openCreateForm') {
        this.renderFormCreateWord(<HTMLElement>elem.parentElement);
      }

      if (elem.id === 'closeCreateForm') {
        const card = elem.parentElement?.parentElement as HTMLElement;
        this.renderAddWordCard(card);
      }

      if (elem.classList.contains('btnCancelUpdate')) {
        const card = elem.parentElement?.parentElement as HTMLElement;
        const word = getWord(wordId);
        card.innerHTML = this.renderWordCard(word);
      }

      if (elem.classList.contains('btnDeleteWord')) {
        await deleteWord(wordId);
        appState.words = await getWords();
        this.clear();
        this.render();
      }
      if (elem.id === 'btnPlay') {
        const file = (<HTMLFormElement>(
          $(`#audioInput[data-id="${elem.dataset.id}"]`)
        )).files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
          playAudio(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }

      if (elem.id === 'btnPlayDB') {
        playAudio(elem.dataset.audio as string);
      }
    });

    this.element.addEventListener('submit', async (e) => {
      e.preventDefault();
      const elem = e.target as HTMLFormElement;
      const data = new FormData(elem);

      if (elem.id === 'formCreateWord') {
        await createWord(data);
      }

      if (elem.classList.contains('formUpdateWord')) {
        const id: string = elem.dataset.id as string;
        await updateWord(data, id);
      }
      appState.words = await getWords();
      this.clear();
      this.render();
    });

    this.element.addEventListener('change', (e) => {
      const elem = e.target as HTMLFormElement;
      if (elem.id === 'audioInput') {
        $(`.btn__play[data-id="${elem.dataset.id}"]`).classList.remove(
          'hidden',
        );
      }
    });

    this.element.addEventListener('scroll', () => {
      if (
        this.element.scrollTop + this.element.clientHeight
        >= this.element.scrollHeight
      ) {
        this.render();
      }
    });
  };

  render = (): void => {
    this.renderWords();
    this.addFormContainer = new BaseComponent(this.element, 'div', [
      'card-container',
      'card_admin',
      'card_word',
    ]);
    this.renderAddWordCard(this.addFormContainer.element);
  };

  renderWords = (): void => {
    this.words = appState.words.filter(
      (word) => word.categoryID === this.categoryID,
    );

    this.words.forEach((word) => {
      this.element.innerHTML += `<div class="card-container card_admin card_word">
      ${this.renderWordCard(word)}
      </div>`;
    });
  };

  renderWordCard = (
    word: TWord,
  ): string => `<a class="closebtn btnDeleteWord" data-id="${word._id}">×</a>
    <p class="card__description">Word: ${word.word}</p>
    <p class="card__description">Translation: ${word.translation}</p>
    <p class="card__description">
      Sound
      <svg  class="svg-play" id="btnPlayDB" data-audio="${word.audioSRC}" xmlns="http://www.w3.org/2000/svg"
       width="20" height="20" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0
         1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
      </svg>
    </p>
    <div class="img form__img" style="background-image: url(${word.imageSRC})"></div>
    <button
      type="button"
      class="btn btn-outline-success btnChangeWord"
      data-id="${word._id}"
    >
      Change
    </button>`;

  renderFormUpdateWord = (node: HTMLElement, id: string): void => {
    const word = getWord(id);
    node.innerHTML = ` <form class="form formUpdateWord" action method="put" data-id="${word._id}">
      <input
        name="categoryID"
        type="hidden"
        value="${word.categoryID}"
        readonly
      />
      <div class="form__row">
        <label class="form__label">Word:</label>
        <input
        name="word"
          class="form-control form-control-sm"
          type="text"
          placeholder="Word"
          id="wordInput"
          value="${word.word}"
        />
      </div>
      <div class="form__row">
        <label class="form__label">Translation:</label>
        <input
          name="translation"
          class="form-control form-control-sm"
          type="text"
          placeholder="Translation"
          id="translationInput"
          value="${word.translation}"
        />
      </div>
      <div class="form__row">
        <label class="form__label">Sound:</label>
        <button
          id="btnPlay"
          data-id="${word._id}"
          type="button"
          class="btn btn__play btn-outline-success hidden"
          data-audio="${word.audioSRC}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-play-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            ></path>
            <path
              d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1
               6 10.5v-5a.5.5 0 0 1 .271-.445z"
            ></path>
          </svg>
          Play
        </button>
        <label class="btn btn_colored btn-load" for="btnInput">
          Change
          <input
          name="audio"
            class="btn-load--input"
            type="file"
            id="audioInput"
            accept="audio/*, .mp3"
            data-id="${word._id}"
          />
        </label>
      </div>
      <div class="form__row">
        <label class="form__label">Image:</label>
        <label class="btn btn_colored btn-load" for="btnInput">
          Change
          <input
            name="img"
            class="btn-load--input"
            type="file"
            accept="image/*"
            id="imageInput"
          />
        </label>
      </div>
      <div>
        <a
          class="btn btn-outline-danger btnCancelUpdate"
          data-id="${word._id}"
          >Cancel</a
        >
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </div>
    </form>`;
  };

  renderAddWordCard = (node: HTMLElement): void => {
    node.innerHTML = `
    <p class="card__description">Add new Word</p>
    <div id="openCreateForm" class="add"></div>
    `;
  };

  renderFormCreateWord = (node: HTMLElement): void => {
    node.innerHTML = `
    <form id="formCreateWord" class="form" action="" method="post">
      <input
        name="categoryID"
        type="hidden"
        value="${this.categoryID}"
        readonly
      />
      <div class="form__row">
        <label class="form__label">Word:</label>
        <input
          name="word"
          class="form-control form-control-sm"
          type="text"
          placeholder="Word"
          id="wordInput"
          required
        />
      </div>
      <div class="form__row">
        <label class="form__label">Translation:</label>
        <input
          name="translation"
          class="form-control form-control-sm"
          type="text"
          placeholder="Translation"
          id="translationInput"
          required
        />
      </div>
      <div class="form__row">
        <label class="form__label">Image:</label>
        <label class="btn btn_colored btn-load" for="btnInput">
          Select
          <input
            name="img"
            class="btn-load--input"
            type="file"
            accept="image/*"
            id="imageInput"

          />
        </label>
      </div>
      <div class="form__row">
        <label class="form__label">Audio:</label>
        <div
          id="btnPlay"
          class="btn btn-outline-success btn__play hidden"
          data-id="12345"
        >
          Play
        </div>
        <label class="btn btn_colored btn-load" for="btnInput">
          Select
          <input
            name="audio"
            class="btn-load--input"
            type="file"
            accept="audio/*"
            id="audioInput"
            data-id="12345"
            required
          />
        </label>
      </div>
      <div>
      <button id="closeCreateForm" type="button" class="btn btn-danger">Cancel</button>
      <button type="submit" class="btn btn-outline-success">Submit</button></div>
    </form>`;
  };
}
