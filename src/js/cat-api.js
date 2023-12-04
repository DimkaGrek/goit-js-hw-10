import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_V0wYFkuURgKZGgRQUkHQF4Un6yu0RgI8y2zfWOeA0a2Es96tqWIYY8AuRYUjI5Ja';

const url = 'https://api.thecatapi.com/v1';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${url}/breeds`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `${url}/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
