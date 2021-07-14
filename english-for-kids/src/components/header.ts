import { BaseComponent } from '../shared/base-component';
import { appState } from '../shared/constants';
import { Router } from '../shared/routes';
import { $, checkLoginData, isAdmin } from '../shared/utils';

export class Header extends BaseComponent {
  constructor() {
    super(document.body, 'header', ['header']);

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

      if (elem.id === 'openLoginForm') {
        this.renderLoginForm();
      }
      if (elem.id === 'btnLogin') {
        const result = checkLoginData();
        if (result) {
          $('.pop-up__container').innerHTML = '';
          window.location.hash = 'admin/categories';
        } else {
          window.location.hash = '';
        }
        $('body').classList.remove('notScrollable');
        this.element.innerHTML = this.renderSideNav();
      }

      if (elem.id === 'btnLogout') {
        window.sessionStorage.setItem('IsAdmin', 'false');
        this.element.innerHTML = this.renderSideNav();
      }

      if (elem.classList.contains('pop-up__close')) {
        $('.pop-up__container').innerHTML = '';
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

  renderAdminLinks = (): string => {
    if (isAdmin()) {
      return `
    <a href="#/admin/categories" class="close">Admin panel</a>
    <a id="btnLogout" href="#" class="close">Logout</a>`;
    }
    return '<a id="openLoginForm" class="close" >Login</a>';
  };

  renderSideNav(): string {
    return `
    <span class="openBtn">&#9776</span>
    <aside id="mySidenav" class="sidenav">
      <ul class="sidenav__links">
      <a  class="closebtn close">&times;</a>
       ${this.renderAdminLinks()}
      <a href="#" class="close">Main page</a>
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
    </div>
    <div class="pop-up__container"></div>`;
  }

  renderLoginForm = (): void => {
    $('body').classList.add('notScrollable');
    $('.pop-up__container').innerHTML = `
      <div class="pop-up pop-up__close"></div>
        <div class="modal-content pop-up__content">
          <div class="modal-header">
            <h5 class="modal-title">Autorization</h5>
            <button type="button" class="btn-close pop-up__close"  aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
             <div class="form-group">
          <label for="InputLogin" class="form-label mt-4">Email address</label>
          <input type="text" class="form-control" id="inputLogin"  placeholder="Enter login">
        </div>
        <div class="form-group">
          <label for="InputPassword" class="form-label mt-4">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
          </div>
          <div class="modal-footer">
            <a  id="btnLogin"  class="btn btn-primary">Login</a>
            <button type="button" class="btn btn-secondary pop-up__close">Cancel</button>
          </div>
      </div>
      </div>
      `;
  };

  toggleActiveLink = (link: string): void => {
    document.querySelectorAll('.sidenav a').forEach((elem) => {
      if (elem.classList.contains('active-link')) {
        elem.classList.remove('active-link');
      }
      if (elem.getAttribute('href') === link) elem.classList.add('active-link');
    });
  };
}
