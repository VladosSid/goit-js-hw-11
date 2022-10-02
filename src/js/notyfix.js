import Notiflix from 'notiflix';
import { refs } from './variables';

// ошибка запроса
export function errorRequest() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

// маиксимум картинок
export function errorMaxImg() {
  refs.buttBox.style.display = 'none';
  Notiflix.Notify.warning(
    `We're sorry, but you've reached the end of search results.`
  );
}

//вуведомление о кол-ве найденых картинок
export function amountImg() {
  Notiflix.Notify.success(
    `Hooray! We found ${refs.variables.totalHits} images.`
  );
}
