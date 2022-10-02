import { refs } from './variables';
const axios = require('axios').default;

export { requestServer };

async function requestServer(request) {
  try {
    const requestImg = await axios.get(
      `${refs.BASE_URL}?key=${refs.KEY}&q=${request}&image_type=photo&orientation=horizontal&per_page=40&page=${refs.variables.page}&safesearch=true`
    );
    return requestImg.data;
  } catch (error) {
    console.log(error);
  }
}
