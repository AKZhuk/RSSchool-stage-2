import { BaseComponent } from '../shared/base-component';
import { $ } from '../shared/utils';

export class Header extends BaseComponent {
  constructor(categories: string[]) {
    super(document.body, 'header', ['header']);
    this.element.innerHTML = this.renderSideNav(categories);
    this.listen();
  }

  openNav(): void {
    $('#mySidenav').style.width = '320px';
  }

  static closeNav(): void {
    $('#mySidenav').style.width = '0';
  }

  listen(): void {
    $('.openBtn').addEventListener('click', () => {
      this.openNav();
    });

    $('.closebtn').addEventListener('click', () => {
      Header.closeNav();
    });
    $('.sidenav__links').addEventListener('click', (e) => {
      Header.closeNav();
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
    <div class="navigation">
     <span class="openBtn" style="font-size:30px;cursor:pointer">&#9776;</span>
     <div id="mySidenav" class="sidenav bg-info">
        <ul class="sidenav__links">
        <a href="javascript:void(0)" class="closebtn">&times;</a>
        <a href="#">Main page</a>
        ${this.renderLinks(categories)}
        </ul>
      </div>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked="">
        <label class="form-check-label" for="flexSwitchCheckChecked">Checked</label>
      </div>`;
  }
}
