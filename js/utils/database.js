import { getRandomInt, getRandomArrayElement} from './utils.js';

const DESCRIPTIONS = [
  'На пляже',
  'Отпуск',
  'Рабочие будни',
  '<3',
  ':)'
];

const NAMES = [
  'Артем',
  'Петька',
  'Роман',
  'Иван',
  'Виталя',
  'Елена',
  'Мария',
  'Полина',
  'Мишка',
  'Валентина',
  'Алексей',
  'Олег'
];

const COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTOS_COUNT = 25;

const createPhoto = (photo, number) => {
  photo = {
    id: number + 1,
    url: `photos/${  number + 1 }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: Array.from({length: getRandomInt(2, 5)}, (comment, commentIndex) => {
      comment = {
        id: (number + 1) * 100 + commentIndex + 1,
        avatar: `img/avatar-${  getRandomInt(1, 6)  }.svg`,
        message: getRandomArrayElement(COMMENT_TEXT) + (getRandomInt(0, 1) ? ` ${  getRandomArrayElement(COMMENT_TEXT)}` : ''),
        name: getRandomArrayElement(NAMES)
      };
      return comment;
    })
  };
  return photo;
};

const photoDataBase = Array.from({length: PHOTOS_COUNT}, createPhoto);

export {photoDataBase};
