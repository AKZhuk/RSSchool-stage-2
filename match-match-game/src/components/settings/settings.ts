import { BaseComponent } from '../../shared/base-component';
import { Select } from './select';

export class Settings extends BaseComponent {
  settings: Select[];

  settingsValues: number[];

  constructor() {
    super('div', ['wrapper', 'best-scores']);
    this.settings = [new Select('Categories', 'images.json'), new Select('Difficulty', 'difficulties.json')];
    this.settingsValues = [0, 8];

    this.settings.forEach((setting, index) => {
      this.element.appendChild(new BaseComponent('h2', ['setting__name'], `${setting.element.classList}`).element);
      setting.getOptions();
      this.element.appendChild(setting.element);

      setting.element.addEventListener('change', (e) => {
        this.settingsValues[index] = Number((<HTMLInputElement>e.target).value);
      });
    });
  }
}
