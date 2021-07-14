import { App } from './components/app';
import './styles/reset.css';
import './styles/bootstrap.min.css';
import './styles/styles.scss';
import { getCategories, getWords } from './shared/api';
import { appState } from './shared/constants';

const loadData = async () => {
  appState.categories = await getCategories();
  appState.words = await getWords();
};

loadData().then(() => {
  const app = new App();
  app.configRoutes();
});
