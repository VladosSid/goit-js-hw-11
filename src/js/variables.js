// переменные
export const refs = {
  form: document.querySelector('.search-form'),
  boxImg: document.querySelector('.gallery'),
  buttSubmit: document.querySelector('.button'),
  buttBox: document.querySelector('.button-box'),
  buttLoadMore: document.querySelector('.load-more'),

  DEBOUNCE_DELAY: 300,
  KEY: '30211191-8b572bab8f9e1a1e26903cf16',
  BASE_URL: 'https://pixabay.com/api/',

  variables: {
    request: '',
    page: 1,
    addPage: false,
    totalHits: 0,
    liteBox: false,
  },
};
