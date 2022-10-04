import { refs } from './variables';
import { requestServer } from './requestServer';
import {
  lineCorrection,
  requestValidation,
  paginationRequest,
} from './validationReques';

import debounce from 'lodash.debounce';

// кнопка поиска
refs.buttSubmit.addEventListener('click', el => {
  el.preventDefault();

  try {
    refs.variables.addPage = false;
    refs.variables.page = 1;

    const lineCorrect = lineCorrection(refs.form.children[0].value.trim());
    requestServer(lineCorrect).then(data => {
      console.log(data);
      refs.variables.totalHits = data.totalHits;
      requestValidation(data);
    });

    refs.variables.request = refs.form.children[0].value.trim();
  } catch (error) {
    console.log(error);
  }
});

// debounce(startSearch, refs.DEBOUNCE_DELAY);

function startSearch(el) {
  el.preventDefault();

  try {
    refs.variables.addPage = false;
    refs.variables.page = 1;

    const lineCorrect = lineCorrection(refs.form.children[0].value.trim());
    requestServer(lineCorrect).then(data => {
      console.log(data);
      refs.variables.totalHits = data.totalHits;
      requestValidation(data);
    });

    refs.variables.request = refs.form.children[0].value.trim();
  } catch (error) {
    console.log(error);
  }
}

// Кропка загрузки доп картинок
refs.buttLoadMore.addEventListener('click', () => {
  paginationRequest(refs.variables.request);
});
