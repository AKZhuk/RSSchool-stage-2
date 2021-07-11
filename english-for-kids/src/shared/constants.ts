import { IAppState } from './interfaces';

export const appState: IAppState = {
  isGameMode: false,
  isGame: false,
  gameWords: [],
  currentGameWord: undefined,
  trainWords: [],
  sortBy: 'result',
  orderBy: 'desc',
  categories: [],
  words: [],
  currentCategoryID: '',
};
/*
export const dataCategory = [
  {
    name: 'Action (set A)',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521113/english-for-kids/img/cry_jdpvnn.jpg',
  },
  {
    name: 'Action (set B)',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521116/english-for-kids/img/play_gsfhxv.jpg',
  },
  {
    name: 'Animal (set A))',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521114/english-for-kids/img/cat_uvu3wc.jpg',
  },
  {
    name: 'Animal (set B)',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521113/english-for-kids/img/bird_ud4fhq.jpg',
  },
  {
    name: 'Clothes (set A)',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521112/english-for-kids/img/clothes_llbdxo.png',
  },
  {
    name: 'Emotions',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521117/english-for-kids/img/sad_jqe5dz.jpg',
  },
  {
    name: 'Food',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521117/english-for-kids/img/salt_hyzcpc.jpg',
  },
  {
    name: 'Clothes (set B)',
    imageSRC:
      'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521112/english-for-kids/img/clothes_llbdxo.png',
  },
];

export const cards: TCardData = [
  [
    'Action (set A)',
    'Action (set B)',
    'Animal (set A)',
    'Animal (set B)',
    'Clothes (set A)',
    'Emotions',
    'Food',
    'Clothes (set B)',
  ],
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'img/cry.jpg',
      audioSrc: 'audio/cry.mp3',
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'img/dance.jpg',
      audioSrc: 'audio/dance.mp3',
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'img/dive.jpg',
      audioSrc: 'audio/dive.mp3',
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'img/draw.jpg',
      audioSrc: 'audio/draw.mp3',
    },
    {
      word: 'fishing',
      translation: 'ловить рыбу',
      image: 'img/fishing.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'img/fly.jpg',
      audioSrc: 'audio/fly.mp3',
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'img/hug.jpg',
      audioSrc: 'audio/hug.mp3',
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'img/jump.jpg',
      audioSrc: 'audio/jump.mp3',
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'img/open.jpg',
      audioSrc: 'audio/open.mp3',
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'img/play.jpg',
      audioSrc: 'audio/play.mp3',
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'img/point.jpg',
      audioSrc: 'audio/point.mp3',
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'img/ride.jpg',
      audioSrc: 'audio/ride.mp3',
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'img/run.jpg',
      audioSrc: 'audio/run.mp3',
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'img/sing.jpg',
      audioSrc: 'audio/sing.mp3',
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'img/skip.jpg',
      audioSrc: 'audio/skip.mp3',
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'img/swim.jpg',
      audioSrc: 'audio/swim.mp3',
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'img/cat.jpg',
      audioSrc: 'audio/cat.mp3',
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'img/chick.jpg',
      audioSrc: 'audio/chick.mp3',
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'img/chicken.jpg',
      audioSrc: 'audio/chicken.mp3',
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'img/dog.jpg',
      audioSrc: 'audio/dog.mp3',
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'img/horse.jpg',
      audioSrc: 'audio/horse.mp3',
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'img/pig.jpg',
      audioSrc: 'audio/pig.mp3',
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'img/rabbit.jpg',
      audioSrc: 'audio/rabbit.mp3',
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'img/sheep.jpg',
      audioSrc: 'audio/sheep.mp3',
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'img/bird.jpg',
      audioSrc: 'audio/bird.mp3',
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'img/fish1.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'img/frog.jpg',
      audioSrc: 'audio/frog.mp3',
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'img/giraffe.jpg',
      audioSrc: 'audio/giraffe.mp3',
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'img/lion.jpg',
      audioSrc: 'audio/lion.mp3',
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'img/mouse.jpg',
      audioSrc: 'audio/mouse.mp3',
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'img/turtle.jpg',
      audioSrc: 'audio/turtle.mp3',
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'img/dolphin.jpg',
      audioSrc: 'audio/dolphin.mp3',
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'img/skirt.jpg',
      audioSrc: 'audio/skirt.mp3',
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'img/pants.jpg',
      audioSrc: 'audio/pants.mp3',
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'img/blouse.jpg',
      audioSrc: 'audio/blouse.mp3',
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'img/dress.jpg',
      audioSrc: 'audio/dress.mp3',
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'img/boot.jpg',
      audioSrc: 'audio/boot.mp3',
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'img/shirt.jpg',
      audioSrc: 'audio/shirt.mp3',
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'img/coat.jpg',
      audioSrc: 'audio/coat.mp3',
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'img/shoe.jpg',
      audioSrc: 'audio/shoe.mp3',
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'img/sad.jpg',
      audioSrc: 'audio/sad.mp3',
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'img/angry.jpg',
      audioSrc: 'audio/angry.mp3',
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'img/happy.jpg',
      audioSrc: 'audio/happy.mp3',
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'img/tired.jpg',
      audioSrc: 'audio/tired.mp3',
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'img/surprised.jpg',
      audioSrc: 'audio/surprised.mp3',
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'img/scared.jpg',
      audioSrc: 'audio/scared.mp3',
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'img/smile.jpg',
      audioSrc: 'audio/smile.mp3',
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'img/laugh.jpg',
      audioSrc: 'audio/laugh.mp3',
    },
  ],
  [
    {
      word: 'butter',
      translation: 'масло',
      image: 'img/butter.jpg',
      audioSrc: 'audio/butter.mp3',
    },
    {
      word: 'tea',
      translation: 'чай',
      image: 'img/tea.jpg',
      audioSrc: 'audio/tea.mp3',
    },
    {
      word: 'salt',
      translation: 'соль',
      image: 'img/salt.jpg',
      audioSrc: 'audio/salt.mp3',
    },
    {
      word: 'caviar',
      translation: 'икра',
      image: 'img/caviar.jpg',
      audioSrc: 'audio/caviar.mp3',
    },
    {
      word: 'sugar',
      translation: 'сахар',
      image: 'img/sugar.jpg',
      audioSrc: 'audio/sugar.mp3',
    },
    {
      word: 'flour',
      translation: 'мука',
      image: 'img/flour.jpg',
      audioSrc: 'audio/flour.mp3',
    },
    {
      word: 'pancake',
      translation: 'блин',
      image: 'img/pancake.jpg',
      audioSrc: 'audio/pancake.mp3',
    },
    {
      word: 'bean',
      translation: 'фасоль',
      image: 'img/bean.jpg',
      audioSrc: 'audio/bean.mp3',
    },
  ],
  [
    {
      word: 'clothes',
      translation: 'одежда',
      image: 'img/clothes.png',
      audioSrc: 'audio/clothes.mp3',
    },
    {
      word: 'pajamas',
      translation: 'пижама',
      image: 'img/pajamas.jpg',
      audioSrc: 'audio/pajamas.mp3',
    },
    {
      word: 'buttons',
      translation: 'пуговицы',
      image: 'img/buttons.jpg',
      audioSrc: 'audio/buttons.mp3',
    },
    {
      word: 'gloves',
      translation: 'перччатки',
      image: 'img/gloves.jpg',
      audioSrc: 'audio/gloves.mp3',
    },
    {
      word: 'underpants',
      translation: 'трусы',
      image: 'img/underpants.jpg',
      audioSrc: 'audio/underpants.mp3',
    },
    {
      word: 'boots',
      translation: 'ботинки',
      image: 'img/boots.jpg',
      audioSrc: 'audio/boots.mp3',
    },
    {
      word: 'wellies',
      translation: 'резиновые сапоги',
      image: 'img/wellies.jpg',
      audioSrc: 'audio/wellies.mp3',
    },
    {
      word: 'raincoat',
      translation: 'плащ',
      image: 'img/raincoat.jpg',
      audioSrc: 'audio/raincoat.mp3',
    },
  ],
];
*/
