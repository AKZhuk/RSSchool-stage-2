import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { Router } from '../shared/routes';
import { $ } from '../shared/utils';

export class Header extends BaseComponent {
  openButton: BaseComponent;

  constructor(categories: string[]) {
    super(document.body, 'header', ['header']);
    this.openButton = new BaseComponent(this.element, 'span', ['openBtn']);
    this.openButton.element.innerHTML = '&#9776;';
    this.element.innerHTML += this.renderSideNav(categories);
  }

  listen(router: Router): void {
    const header = this.element;
    header.addEventListener('click', (e) => {
      const elem = e.target as HTMLElement;
      if (elem.classList.contains('openBtn')) {
        $('.sidenav').classList.add('open');
        $('.sidenav__overlay').classList.add('open');
      }

      if (elem.classList.contains('close')) {
        $('.sidenav').classList.remove('open');
        $('.sidenav__overlay').classList.remove('open');
      }
    });

    $('#gameCheck').addEventListener('input', (e) => {
      const element = <HTMLInputElement>e.target;
      element.toggleAttribute('checked');
      appState.isGameMode = element.checked;
      document.body.classList.toggle('game__mode');
      router.navigate(document.location.hash);
    });
  }

  static renderLinks(categories: string[]): string {
    let HTMLText = '';
    categories.forEach((category, index) => {
      HTMLText += `<a href="/#/category/${
        index + 1
      }" class="close">${category}</a>`;
    });
    HTMLText += '<a href="/#/statistic" class="close">Statistic</a></a>';
    return HTMLText;
  }

  renderSideNav(categories: string[]): string {
    this.element.id = 'openBtn';
    return `
    <aside id="mySidenav" class="sidenav">
      <ul class="sidenav__links">
      <a  class="closebtn close">&times;</a>
      <a href="#" class="close">Main page</a>
      ${Header.renderLinks(categories)}
      </ul>
    </aside>
    <div id="overlay" class="sidenav__overlay close"></div>
    <div id="gameCheck" class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" >
    </div>`;
  }

  toggleActiveLink = (link: string): void => {
    document.querySelectorAll('.sidenav a').forEach((elem) => {
      if (elem.classList.contains('active-link')) elem.classList.remove('active-link');
      if (elem.getAttribute('href') === link) elem.classList.add('active-link');
    });
  };
}
