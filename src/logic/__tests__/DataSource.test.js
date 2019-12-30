import axios from 'axios';
import DataSource from '../DataSource';

jest.mock('axios');

const BASE_URL = 'https://rickandmortyapi.com/api';

describe('DataSource', () => {
  afterEach(jest.clearAllMocks);

  it('fetches successfuly characters data from API', async () => {
    const data = {
      data: {
        items: [{ id: 1 }],
      },
    };

    axios.mockImplementationOnce(() => Promise.resolve(data));

    await expect(DataSource.fetchCharacters()).resolves.toEqual(data);
    expect(axios).toHaveBeenCalledWith(`${BASE_URL}/character`);
  });

  it('fails to fetch characters data from API', async () => {
    const errorMessage = 'Network Error';

    axios.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(DataSource.fetchCharacters()).rejects.toThrow(errorMessage);
  });

  it('fetches successfuly a URL', async () => {
    const url = 'some.url';
    const data = {
      ok: true,
    };

    axios.mockImplementationOnce(() => Promise.resolve(data));

    await expect(DataSource.fetchURL(url)).resolves.toEqual(data);
    expect(axios).toHaveBeenCalledWith(url);
  });

  it('fails to fetch a URL', async () => {
    const errorMessage = 'Network Error';
    axios.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(DataSource.fetchURL()).rejects.toThrow(errorMessage);
  });

  it('fetches successfuly episodes names', async () => {
    const urls = ['url.one', 'url.two'];
    const response = {
      data: { name: 'episode name' },
    };

    axios.mockImplementation(() => Promise.resolve(response));

    const episodeNames = await DataSource.fetchEpisodesNames(urls);
    const expectedResponse = urls.map(() => response.data);
    const expectedCallArray = urls.map(url => [url]);

    expect(episodeNames).toHaveLength(urls.length);
    expect(episodeNames).toEqual(expectedResponse);
    expect(axios.mock.calls).toEqual(expectedCallArray);
  });

  it('fails to fetch episode names', async () => {
    const errorMessage = 'Network Error';
    const urls = ['url.one'];

    axios.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(DataSource.fetchEpisodesNames(urls)).rejects.toThrow(
      errorMessage
    );
  });
});
