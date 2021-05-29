import { BaseComponent } from '../../shared/base-component';
import { Button } from '../../shared/button';
import { NavItem } from './navItem';
import { navLinkParam } from '../../shared/constants';
import './header.scss';

export class Header extends BaseComponent {
  private readonly logo: BaseComponent;

  navigationWrapper: BaseComponent;

  StartGameButton: Button;

  StopGameButton: Button;

  constructor() {
    super('header', ['header']);
    this.logo = new BaseComponent('div', ['logo']);
    this.navigationWrapper = new BaseComponent('div', ['header__navigation']);
    this.StartGameButton = new Button(['btn'], 'Start Game', '/game', 'a');
    this.StopGameButton = new Button(['btn'], 'STOP GAME', '/', 'a');
    this.element.appendChild(this.logo.element);
    this.element.appendChild(this.navigationWrapper.element);
    navLinkParam.forEach((item) => {
      const navItem = new NavItem(item.text, item.link, item.svgClass);
      this.navigationWrapper.element.appendChild(navItem.element);
    });
    this.element.appendChild(this.StartGameButton.element);
  }

  addStopGameButton(): void {
    this.element.removeChild(this.StartGameButton.element);
    this.element.appendChild(this.StopGameButton.element);
  }

  addStartGameButton(): void {
    this.element.removeChild(this.StopGameButton.element);
    this.element.appendChild(this.StartGameButton.element);
  }

  toggleActiveLink(id: string): void {
    this.element.querySelectorAll('.navigation__item').forEach((item) => {
      item.classList.remove('active');
    });
    document.getElementById(`${id}`)?.classList.add('active');
  }
}
