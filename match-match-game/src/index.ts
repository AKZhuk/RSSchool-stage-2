import { App } from './app';
import './styles.scss';

export const application = new App(document.body);
application.addListeners();
