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
    type: 'text',
    labelText: 'Email',
    rule: [
      {
        RegExp:
          /^(?:[()a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}()~-]+)*|"(?:[ "\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]? [0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
        errMessage: 'email должен соответствовать стандартному правилу формированию email',
      },
    ],
  },
];

export const navLinkParam = [
  {
    link: 'about',
    text: 'About Game',
    svgClass: 'about-svg',
  },
  {
    link: 'best-score',
    text: 'Best Score',
    svgClass: 'best-score-svg',
  },
  {
    link: 'settings',
    text: 'Game Settings',
    svgClass: 'settings-svg',
  },
];
