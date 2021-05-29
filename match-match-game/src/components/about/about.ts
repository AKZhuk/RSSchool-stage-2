import { BaseComponent } from '../../shared/base-component';
import './about.scss';

export class About extends BaseComponent {
  constructor() {
    super('div', ['app-field', 'wrapper']);
    this.element.innerHTML = `<h2 class="title">How to play?</h2>
      <div class="how-to-play">
        <section class="how-to-play__item">
          <figure class="circle">1</figure>
          <span class="how-to-play__text">Register new player in game</span>
        </section>
        <section class="how-to-play__item form-img"></section>
        <section class="how-to-play__item">
          <figure class="circle">2</figure>
          <span class="how-to-play__text">Configure your game settings</span>
        </section>
        <a href="#" data-link="/settings" class="navigation__item btn_game-settings"
          ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52
              22 12C22 6.48 17.52 2 11.99 2ZM16.23 18L12 15.45L7.77 18L8.89 13.19L5.16
              9.96L10.08 9.54L12 5L13.92 9.53L18.84 9.95L15.11 13.18L16.23 18Z"
              fill="white"
              fill-opacity="0.7"
            />
            <circle cx="12" cy="12" r="10" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.7487 12.624C16.7727 12.424 16.7887 12.216 16.7887 12C16.7887
              11.784 16.7727 11.576 16.7407 11.376L18.0927 10.32C18.2127 10.224
              18.2447 10.048 18.1727 9.91201L16.8927 7.69601C16.8127 7.55201 16.6447
               7.50401 16.5007 7.55201L14.9087 8.19201C14.5727 7.93601 14.2207
                7.72801 13.8287 7.56801L13.5887 5.87201C13.5647 5.71201 13.4287
                 5.60001 13.2687 5.60001H10.7087C10.5487 5.60001 10.4207 5.71201
                  10.3967 5.87201L10.1567 7.56801C9.76468 7.72801 9.40468 7.94401
                   9.07668 8.19201L7.48468 7.55201C7.34068 7.49601 7.17268 7.55201
                    7.09268 7.69601L5.81268 9.91201C5.73268 10.056 5.76468 10.224
                     5.89268 10.32L7.24468 11.376C7.21268 11.576 7.18868 11.792
                     7.18868 12C7.18868 12.208 7.20468 12.424 7.23668 12.624L5.88468
                      13.68C5.76468 13.776 5.73268 13.952 5.80468 14.088L7.08468
                       16.304C7.16468 16.448 7.33268 16.496 7.47668 16.448L9.06868
                        15.808C9.40468 16.064 9.75668 16.272 10.1487 16.432L10.3887
                         18.128C10.4207 18.288 10.5487 18.4 10.7087 18.4H13.2687C13.4287
                         18.4 13.5647 18.288 13.5807 18.128L13.8207 16.432C14.2127
                         16.272 14.5727 16.056 14.9007 15.808L16.4927
                          16.448C16.6367 16.504 16.8047 16.448 16.8847 16.304L18.1647
                           14.088C18.2447 13.944 18.2127 13.776 18.0847
                            13.68L16.7487 12.624ZM11.9887 14.4C10.6687
                             14.4 9.58867 13.32 9.58867 12C9.58867 10.68
                              10.6687 9.60001 11.9887 9.60001C13.3087
                              9.60001 14.3887 10.68 14.3887 12C14.3887 13.32
                              13.3087 14.4 11.9887 14.4Z"
              fill="#2F80ED"
            />
          </svg>
          Game Settings</a
        >
        <section class="how-to-play__item">
          <figure class="circle">3</figure>
          <span class="how-to-play__text"
            >Start you new game! Remember card <br />positions and match it before times up.</span
          >
        </section>
        <section class="how-to-play__item preview-img"></section>
      </div>
    `;
  }
}
