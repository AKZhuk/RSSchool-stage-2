export const inputsParam = [
  {
    id: 'first-name',
    type: 'text',
    labelText: 'First name',
    rule: [
      {
        RegExp: /^\d{1,}$/gi,
        errMessage: ' Имя не может состоять из цифр.',
      },
      {
        RegExp: /[~!@#$%*()_—+=|:;"'`<>,.?/^]/gi,
        errMessage: 'Имя не может содержать: (~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^)',
      },
    ],
  },
  {
    id: 'last-name',
    type: 'text',
    labelText: 'Last Name',
    rule: [
      {
        RegExp: /^\d{1,}$/gi,
        errMessage: ' Имя не может состоять из цифр.',
      },
      {
        RegExp: /[~!@#$%*()_—+=|:;"'`<>,.?/^]/gi,
        errMessage: 'Фамилия не может содержать: (~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^)',
      },
    ],
  },
  {
    id: 'email',
    type: 'email',
    labelText: 'Email',
    rule: [
      {
        RegExp:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errMessage: 'email должен соответствовать стандартному правилу формированию email',
      },
    ],
  },
];

export const navLinkParam = [
  {
    link: '/',
    text: 'About Game',
    svgClass: 'about-svg',
  },
  {
    link: '/best-score',
    text: 'Best Score',
    svgClass: 'best-score-svg',
  },
  {
    link: '/settings',
    text: 'Game Settings',
    svgClass: 'settings-svg',
  },
];
