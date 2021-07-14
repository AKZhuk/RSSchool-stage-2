import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../../shared/api';
import { BaseComponent } from '../../shared/base-component';
import { appState } from '../../shared/constants';
import { TCategory } from '../../shared/interfaces';
import { $ } from '../../shared/utils';

export class AdminCategories extends BaseComponent {
  activeCard: HTMLElement | undefined;

  addFormContainer: BaseComponent | undefined;

  constructor() {
    super(undefined, 'section', [
      'categories',
      'categories__infinite-container',
    ]);
    this.render();
  }

  render = (): void => {
    this.renderCategories();
    this.addFormContainer = new BaseComponent(this.element, 'div', [
      'card-container',
      'card_admin',
    ]);
    this.renderAddCategoriesCard(this.addFormContainer.element);
  };

  renderCategories = async (): Promise<void> => {
    appState.categories.forEach((category) => {
      this.element.innerHTML += `<div class="card-container card_admin"
        data-category="${category.name}" data-id="${category._id}">
        ${this.renderCategoryCard(category)}
        </div>`;
    });
  };

  renderCategoryCard = (category: TCategory): string => {
    const words = appState.words.filter(
      (word) => word.categoryID === category._id,
    );
    return `
  <a class="closebtn delete-category">×</a>
  <p class="card__description">${category.name}</p>
  <p class="card__description">Кол-во слов: ${words ? words.length : 0}</p>
  <div>
    <a
      type="button"
      class="btn btn-danger updateCategory"
      data-id="${category._id}"
       data-name="${category.name}"
      >Update</a
    >
    <a
      href="#/admin/category=${category.name}/words"
      class="btn btn-success addWord"
      data-id="${category._id}"

      >Add word</a
    >
  </div>    `;
  };

  renderAddCategoriesCard = (node: HTMLElement): void => {
    node.innerHTML = `
    <p class="card__description">Add new Category</p>
    <div id="renderCreateForm" class="add"></div>
    `;
  };

  renderForm = (
    node: HTMLElement,
    action: 'Create' | 'Update',
    categoryId = '',
    categoryName = '',
  ): void => {
    node.innerHTML = `
      <div class="form-group">
      <label for="newCategoryName" class="form-label mt-4">Category Name</label>
      <input type="text" class="form-control" id="input${action}Name"
       placeholder="Enter name" value="${categoryName}">
      </div>
      <div>
        <button id="close${action}Form" type="button" class="btn btn-danger">Cancel</button>
        <button id="${action}CategoryBtn" datatype="submit" class=" oryBtn btn btn-success"
        data-id="${categoryId}">${action}</button>
      </div>`;
  };

  listen = (): void => {
    this.element.addEventListener('click', async (e) => {
      const elem = e.target as HTMLElement;
      if (elem.classList.contains('delete-category')) {
        const categoryId: string = elem.parentElement?.dataset.id as string;
        await deleteCategory(categoryId);
        appState.categories = await getCategories();
        this.clear();
        this.render();
      }

      if (elem.id === 'renderCreateForm') {
        this.renderForm(elem.parentElement as HTMLElement, 'Create');
      }

      if (elem.id === 'CreateCategoryBtn') {
        const name = ($('#inputCreateName') as HTMLInputElement).value;
        await createCategory(name);
        appState.categories = await getCategories();
        this.clear();
        this.render();
      }

      if (elem.id === 'closeCreateForm') {
        const card = elem.parentElement?.parentElement as HTMLElement;
        this.renderAddCategoriesCard(card);
      }

      if (elem.classList.contains('updateCategory')) {
        const categoryId: string = elem.dataset.id as string;
        const categoryName: string = elem.dataset.name as string;
        const card = elem.parentElement?.parentElement as HTMLElement;
        this.renderForm(card, 'Update', categoryId, categoryName);
      }

      if (elem.id === 'UpdateCategoryForm') {
        const categoryId: string = elem.dataset.id as string;
        const name = ($('#inputUpdateName') as HTMLInputElement).value;
        await updateCategory(categoryId, name);
        appState.categories = await getCategories();
        this.clear();
        this.render();
      }

      if (elem.id === 'closeUpdateForm') {
        const card = elem.parentElement?.parentElement as HTMLElement;
        const categoryId: string = card.dataset.id as string;
        const categoryName: string = card.dataset.category as string;
        card.innerHTML = this.renderCategoryCard({
          _id: categoryId,
          name: categoryName,
        });
      }

      if (elem.classList.contains('addWord')) {
        appState.currentCategoryID = elem.dataset.id as string;
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
}
