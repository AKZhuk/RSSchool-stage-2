import { BaseComponent } from '../../shared/base-component';
import { Category } from '../../shared/interfaces';
import { Option } from './option';

export class Select extends BaseComponent {
  private readonly json;

  readonly name;

  constructor(classList: string, json: string) {
    super('select', [`${classList}`]);
    this.name = classList;
    this.json = json;
  }

  async getOptions(): Promise<void> {
    const res = await fetch(`./${this.json}`);
    const categories: Category[] = await res.json();
    categories.forEach(category => {
      const index = category.value;

      const option = new Option(`${category.category}`, index);
      this.element.appendChild(option.element);
    });
  }
}
