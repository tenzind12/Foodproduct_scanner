export const rating = (nutriscore_grade) => {
  switch (nutriscore_grade) {
    case 'a':
      return '⭐⭐⭐⭐⭐';
    case 'b':
      return '⭐⭐⭐⭐';
    case 'c':
      return '⭐⭐⭐';
    case 'd':
      return '⭐⭐';
    case 'e':
      return '⭐';
    default:
      return 'No rating available :/';
  }
};

export const BASE_URL = 'https://68fa-82-121-4-45.eu.ngrok.io/';

export const filterArray = [
  'and',
  'vegetable',
  'fresh',
  'food',
  'marketplace',
  'their',
  'product',
  'paste',
  'red',
  'de',
  'in',
  'et',
  'rouge',
  'sec',
  'dry',
  'vegetale',
  'boisson',
  'frozen',
  'meat',
  'ready',
  'france',
  'source',
  'naturelle',
];
