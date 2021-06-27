import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { Router } from '../shared/routes';
import { $ } from '../shared/utils';

export class Header extends BaseComponent {
  constructor(categories: string[]) {
    super(document.body, 'header', ['header']);
    this.element.innerHTML = this.renderSideNav(categories);
  }

  openNav(): void {
    $('#mySidenav').style.width = '320px';
  }

  static closeNav(): void {
    $('#mySidenav').style.width = '0';
  }

  listen(router: Router): void {
    $('.openBtn').addEventListener('click', () => {
      this.openNav();
    });

    $('.closebtn').addEventListener('click', () => {
      Header.closeNav();
    });
    $('.sidenav__links').addEventListener('click', () => {
      Header.closeNav();
    });

    $('#gameCheck').addEventListener('input', (e) => {
      const element = <HTMLInputElement>e.target;
      element.toggleAttribute('checked');
      appState.isGameMode = element.checked;
      document.body.classList.toggle('game__mode');
      router.navigate(document.location.hash);
    });
  }

  renderLinks(categories: string[]): string {
    let HTMLText = '';
    categories.forEach((category, index) => {
      HTMLText += `<a href="/#/category/${index + 1}">${category}</a>`;
    });
    return HTMLText;
  }

  renderSideNav(categories: string[]): string {
    return `
     <span class="openBtn">&#9776;</span>
     <div id="mySidenav" class="sidenav">
        <ul class="sidenav__links">
        <a href="javascript:void(0)" class="closebtn">&times;</a>
        <a href="#">Main page</a>
        ${this.renderLinks(categories)}
        </ul>
      </div>
      </div>
      <div id="gameCheck" class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" >
      </div>
      `;
  }

  toggleActiveLink = (link: string): void => {
    document.querySelectorAll('.sidenav a').forEach((elem) => {
      if (elem.classList.contains('active-link')) elem.classList.remove('active-link');
      if (elem.getAttribute('href') === link) elem.classList.add('active-link');
    });
  };
}
