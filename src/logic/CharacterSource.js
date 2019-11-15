import axios from 'axios';
const BASE_URL = 'https://rickandmortyapi.com/api';

async function fetchCharacters() {
  return await axios(`${BASE_URL}/character`);
}

async function fetchURL(url) {
  return await axios(url);
}

export default { fetchCharacters, fetchURL };
