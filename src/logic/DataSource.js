import axios from 'axios';
const BASE_URL = 'https://rickandmortyapi.com/api';

async function fetchCharacters() {
  return await axios(`${BASE_URL}/character`);
}

async function fetchURL(url) {
  return await axios(url);
}

async function fetchEpisodesNames(urls = []) {
  const promises = urls.map(url => fetchURL(url));
  const responses = await Promise.all(promises);

  return responses.map(response => response.data);
}

export default { fetchCharacters, fetchEpisodesNames, fetchURL };
