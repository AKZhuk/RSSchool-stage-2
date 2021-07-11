import { TCategory } from '../../shared/interfaces';
import { BaseComponent } from '../../shared/base-component';
import { appState } from '../../shared/constants';

export class AdminCategoryCard extends BaseComponent {
  data: TCategory;

  constructor(parent: BaseComponent, category: TCategory) {
    super(parent.element, 'a', ['card-container', 'card_admin']);
    this.data = category;
    // this.words = words;
    this.element.dataset.category = category.name;
    this.element.dataset.id = category._id;
    this.render();
  }

  render = (): void => {
    const words = appState.words.filter(
      (word) => word.categoryID === this.data._id,
    );
    this.element.innerHTML = `
    <a class="closebtn delete-category">×</a>
        <p class="card__description">${this.data.name}</p>
         <p class="card__description">Кол-во слов: ${
  words ? words.length : 0
}</p>
        <div>
          <a type="button" class="btn btn-danger updateCategory" data-id="${
  this.data._id
}">Update</a>
          <a  href="#/admin/category=${
  this.data.name
}/words" class="btn btn-success addWord" data-id="${
  this.data._id
}">Add word</a>
        </div>
    `;
  };

  renderUpdateState = (): void => {
    this.element.innerHTML = `
      <div class="form-group">
      <label for="exampleInputEmail1" class="form-label mt-4">Name:</label>
      <input type="text" class="form-control" id="inputUpdateName"
      placeholder="Enter category name" value="${this.data.name}">
      </div>
        <div>
          <a id="cancelUpdateBtn" type="button" class="btn btn-danger" data-id="${this.data._id}">Cancel</a>
          <a id="saveUpdateBtn" datatype="submit" class=" oryBtn btn btn-success" data-id="${this.data._id}">Save</a>
        </div>`;
  };
}
