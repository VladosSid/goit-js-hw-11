import { refs } from './variables';
import { requestServer } from './requestServer';
import { errorRequest, errorMaxImg, amountImg } from './notyfix';
import { listGeneration } from './listGeneration';

// пагинация запроса
export function paginationRequest(line) {
  refs.variables.page += 1;
  refs.variables.addPage = true;
  return requestServer(line)
    .then(data => requestValidation(data))
    .catch(error => console.log(error));
}

// проверка веденного запроса
export function requestValidation(data) {
  if (data.hits.length === 0) {
    return errorRequest();
  }

  refs.buttBox.style.display = 'flex';
  listGeneration(data.hits);
  amountImg();
}

// замена пробелов в запросе
export function lineCorrection(line) {
  return line.replaceAll(' ', '+');
}

export function learnMoreValidation() {
  if (refs.variables.totalHits <= refs.boxImg.childNodes.length) {
    return errorMaxImg();
  }
}
