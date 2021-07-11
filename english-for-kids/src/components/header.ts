import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { Router } from '../shared/routes';
import { $ } from '../shared/utils';

export class Header extends BaseComponent {
  openButton: BaseComponent;

  constructor() {
    super(document.body, 'header', ['header']);
    this.openButton = new BaseComponent(this.element, 'span', ['openBtn']);
    this.openButton.element.innerHTML = '&#9776;';
    this.element.innerHTML += this.renderSideNav();
  }

  listen(router: Router): void {
    const header = this.element;
    header.addEventListener('click', (e) => {
      const elem = e.target as HTMLElement;
      if (elem.classList.contains('openBtn')) {
        this.renderLinks();
        $('.sidenav').classList.add('open');
        $('.sidenav__overlay').classList.add('open');
      }

      if (elem.classList.contains('close')) {
        $('.sidenav').classList.remove('open');
        $('.sidenav__overlay').classList.remove('open');
      }

      if (elem.classList.contains('category-link')) {
        appState.currentCategoryID = elem.dataset.id as string;
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

  renderLinks(): void {
    let HTMLText = '';
    appState.categories.forEach((category) => {
      HTMLText += `<a href="/#/category/${category.name}" data-id="${category._id}"
       class="close category-link">${category.name}</a>`;
    });
    HTMLText
      += '<a href="/#/statistic" class="close category-link">Statistic</a></a>';
    $('.link-container').innerHTML = HTMLText;
  }

  renderSideNav(): string {
    this.element.id = 'openBtn';
    return `
    <aside id="mySidenav" class="sidenav">
      <ul class="sidenav__links">
      <a  class="closebtn close">&times;</a>
      <a href="#" class="close">Main page</a>
      <a href="#/admin/categories" class="close">Admin panel</a>
      <div class="link-container"></div>
      </ul>
      <footer class="footer">
        <a class="footer__github" href="https://github.com/AKZhuk"
        target="_blank" rel="noopener noreferrer">github/AKZhuk</a>
        <a href="https://rs.school/js/" class="footer__logo"></a>
      </footer>
    </aside>
    <div id="overlay" class="sidenav__overlay close"></div>
    <div id="gameCheck" class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" >
    </div>`;
  }

  toggleActiveLink = (link: string): void => {
    document.querySelectorAll('.sidenav a').forEach((elem) => {
      if (elem.classList.contains('active-link')) {
        elem.classList.remove('active-link');
      }
      if (elem.getAttribute('href') === link) elem.classList.add('active-link');
    });
  };
}
