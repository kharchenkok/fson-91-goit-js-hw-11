import axios from 'axios';

const API_KEY = '17935343-c69abdbb5347cbe1498525dc9';

const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(inputValue, page, perPage) {
  axios.defaults.params = {
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page,
  };
  return await axios.get(BASE_URL).then(response => {
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data;
  });
}

export { fetchImages };
