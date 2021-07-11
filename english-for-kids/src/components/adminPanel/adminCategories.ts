import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../../shared/api';
import { BaseComponent } from '../../shared/base-component';
import { appState } from '../../shared/constants';
import { $ } from '../../shared/utils';
import { AdminCategoryCard } from './adminCategoryCard';

export class AdminCategories extends BaseComponent {
  cards: { [key: string]: AdminCategoryCard } = {};

  activeCard: HTMLElement | undefined;

  addFormContainer: BaseComponent;

  constructor() {
    super(undefined, 'section', ['categories']);
    this.addFormContainer = new BaseComponent(this.element, 'div', [
      'card-container',
      'card_admin',
    ]);
    this.render();
  }

  render = (): void => {
    this.element.innerHTML = '';
    this.renderCategories();
    this.addFormContainer = new BaseComponent(this.element, 'div', [
      'card-container',
      'card_admin',
    ]);
    this.renderAddCategoriesCard();
  };

  renderCategories = async (): Promise<void> => {
    appState.categories.forEach((category) => {
      this.cards[category._id] = new AdminCategoryCard(this, category);
    });
  };

  renderAddCategoriesCard = (): void => {
    this.addFormContainer.element.innerHTML = `
    <p class="card__description">Add new Category</p>
    <div id="addCategory" class="add"></div>
    `;
  };

  renderForm = (categoryId = '', categoryName = ''): void => {
    this.addFormContainer.element.innerHTML = `
      <div class="form-group">
      <label for="newCategoryName" class="form-label mt-4">Category Name</label>
      <input type="text" class="form-control" id="newCategoryName"
       placeholder="Enter name" value="${categoryName}">
      </div>
      <div>
        <button id="cancelCreateBtn" type="button" class="btn btn-danger">Cancel</button>
        <button id="createCategoryBtn" datatype="submit" class=" oryBtn btn btn-success"
        data-id="${categoryId}">Create</button>
      </div>`;
  };

  listen = (): void => {
    this.element.addEventListener('click', async (e) => {
      const elem = e.target as HTMLElement;
      if (elem.id === 'createCategoryBtn') {
        const name = ($('#newCategoryName') as HTMLInputElement).value;
        await createCategory(name);
        appState.categories = await getCategories();
        this.render();
      }

      if (elem.classList.contains('delete-category')) {
        const categoryId = elem.parentElement?.dataset.id;

        await deleteCategory(categoryId as string);
        appState.categories = await getCategories();
        this.render();
      }
      if (elem.id === 'addCategory') {
        this.renderForm();
      }
      if (elem.id === 'cancelCreateBtn') {
        this.renderAddCategoriesCard();
      }

      if (elem.classList.contains('updateCategory')) {
        const categoryId: string = elem.dataset.id as string;
        this.cards[categoryId].renderUpdateState();
      }

      if (elem.id === 'saveUpdateBtn') {
        const categoryId: string = elem.dataset.id as string;
        const name = ($('#inputUpdateName') as HTMLInputElement).value;
        await updateCategory(categoryId, name);
        appState.categories = await getCategories();
        this.render();
      }

      if (elem.id === 'cancelUpdateBtn') {
        const categoryId: string = elem.dataset.id as string;
        this.cards[categoryId].render();
      }

      if (elem.classList.contains('addWord')) {
        // const categoryId = elem.dataset.id;
        appState.currentCategoryID = elem.dataset.id as string;
        // appState.gameWords =
      }
    });
  };
}
