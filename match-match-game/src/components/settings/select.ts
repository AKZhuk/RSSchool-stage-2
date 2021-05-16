import { BaseComponent } from '../base-component';
import { ImageCategory } from '../interfaces';
import { Option } from './option';
import './select.scss';

export class Select extends BaseComponent {
  private readonly json;

  readonly name;

  constructor(classList: string, json: string) {
    super('select', [`${classList}`]);
    this.name = classList;
    this.json = json;
  }

  async getOptions() {
    const res = await fetch(`./${this.json}`);
    const categories: ImageCategory[] = await res.json();
    categories.forEach((category) => {
      const index = String(categories.indexOf(category));
      const option = new Option(`${category.category}`, index);
      this.element.appendChild(option.element);
    });
  }
}
