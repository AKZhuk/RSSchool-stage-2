import { App } from './app';
import './styles.scss';

export const application = new App(document.body);
window.onload = () => {
  const navItems = document.querySelectorAll('.navigation__item');
  const btn = document.querySelector('.btn');

  navItems.forEach((item: Element) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((item: Element) => {
        item.classList.remove('active');
      });
      const navItem = e.target as HTMLElement;
      item.classList.add('active');
      application.onNav(navItem.dataset.link as string);
    });
  });

  (btn as HTMLElement).addEventListener('click', (e) => {
    const navItem = e.target as HTMLElement;
    application.start();
    application.onNav(navItem.dataset.link as string);
  });
};
