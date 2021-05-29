import { BaseComponent } from '../../shared/base-component';
import { Button } from '../../shared/button';

export class NavItem extends Button {
  private readonly svg: BaseComponent;

  constructor(text: string, link: string, svgClass: string) {
    super(['navigation__item'], text, link, 'a');
    this.element.id = link;
    this.svg = new BaseComponent('figure', ['navigation__svg', `${svgClass}`]);
    this.element.appendChild(this.svg.element);
  }
}
