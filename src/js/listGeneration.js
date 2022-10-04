import { refs } from './variables';
import { learnMoreValidation } from './validationReques';
import { lightBox } from './liteBox';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = new SimpleLightbox('.gallery a');

// отрисовка карточек
export function listGeneration(data) {
  const markup = data
    .map(
      img =>
        `<a class="gallery__item" href="${img.webformatURL}">
        <div class="photo-card">
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
    </div>
    </a>`
    )
    .join('');

  if (!refs.variables.addPage) {
    refs.boxImg.innerHTML = markup;
    learnMoreValidation();
    gallery.refresh();

    return (refs.variables.liteBox = true);
  }

  refs.boxImg.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
  learnMoreValidation();
}
