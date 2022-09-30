// import './css/styles.css';

// import { authenticate } from 'pixabay-api';
// const { searchImages, searchVideos } = authenticate(AUTH_KEY);

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

// переменные
const refs = {
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
  },
};

// кнопка поиска
refs.buttSubmit.addEventListener('click', async el => {
  el.preventDefault();
  try {
    refs.variables.addPage = false;
    refs.variables.page = 1;

    const lineCorrect = lineCorrection(refs.form.children[0].value.trim());
    await requestServer(lineCorrect).then(data => {
      refs.variables.totalHits = data.totalHits;
      console.log(data);
      requestValidation(data);
    });

    refs.variables.request = refs.form.children[0].value.trim();
  } catch (error) {
    console.log(error);
  }
});

// Кропка загрузки доп картинок
refs.buttLoadMore.addEventListener('click', el => {
  paginationRequest(refs.variables.request);
});

// пагинация запроса
function paginationRequest(line) {
  refs.variables.page += 1;
  refs.variables.addPage = true;
  return requestServer(line)
    .then(data => requestValidation(data))
    .catch(error => console.log(error));
}

// Запрос на сервер
function requestServer(request) {
  return fetch(
    `${refs.BASE_URL}?key=${refs.KEY}&q=${request}&image_type=photo&orientation=horizontal&per_page=40&page=${refs.variables.page}&safesearch=true`
  ).then(request => request.json());
}

// замена пробелов в запросе
function lineCorrection(line) {
  return line.replaceAll(' ', '+');
}

// проверка веденного запроса
function requestValidation(data) {
  if (data.hits.length === 0) {
    return errorRequest();
  }

  refs.buttBox.style.display = 'flex';
  listGeneration(data.hits);
}

// отрисовка карточек
function listGeneration(data) {
  const markup = data
    .map(
      img =>
        `<div class="photo-card">
      <div class='box-img'>
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${img.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${img.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${img.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${img.downloads}
        </p>
      </div>
    </div>`
    )
    .join('');

  if (!refs.variables.addPage) {
    return (refs.boxImg.innerHTML = markup);
  }

  refs.boxImg.insertAdjacentHTML('beforeend', markup);
  learnMoreValidation();
}

function learnMoreValidation() {
  if (refs.variables.totalHits <= refs.boxImg.childNodes.length) {
    return errorMaxImg();
  }
}

// ошибка запроса
function errorRequest() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

// маиксимум картинок
function errorMaxImg() {
  refs.buttBox.style.display = 'none';
  Notiflix.Notify.warning(
    `We're sorry, but you've reached the end of search results.`
  );
}
