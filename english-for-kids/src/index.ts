import { App } from './components/app';
import './styles/reset.css';
import './styles/bootstrap.min.css';
import './styles/styles.scss';
import { getCategories, getWords } from './shared/api';
import { appState } from './shared/constants';

const loadData = async () => {
  // let b = await loadWord('60e404e3559dde48d459c469', cards[8] as ICard[]);
  // let c = await loadCategory(dataCategory);
  // let a = await getWords();
  appState.categories = await getCategories();
  appState.words = await getWords();

  /*
   'Action (set A)', '60e404e2559dde48d459c467'
    'Action (set B)', '60e404e2559dde48d459c465'
    'Animal (set A)', '60e404e2559dde48d459c463'
    'Animal (set B)', '60e404e2559dde48d459c465'
    'Clothes (set A)', '60e404e2559dde48d459c462'
    'Emotions', '60e404e2559dde48d459c466'
    'Food', '60e404e3559dde48d459c468'
    'Clothes (set B)', '60e404e3559dde48d459c469'
  */
};

loadData().then(() => {
  const app = new App();
  app.configRoutes();
});
