import React, { useReducer, useEffect } from 'react';
import DataSource from '../../logic/DataSource';
import styled from 'styled-components';
import {
  Button,
  CharacterItem,
  EpisodeList,
  LabelList,
  Modal,
} from '../../component';

/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
const DUMMY_ITEMS = [1, 2, 3, 4];

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const initialState = {
  character: null,
  characters: [],
  episodes: [],
  error: null,
  showDetails: false,
};

const updateListReducer = (state, data) => {
  if (typeof data === 'object') {
    const { characters: oldCharacters } = state;
    const {
      info: { next: nextPage },
      results,
    } = data;

    const characters = oldCharacters.concat(results);

    return { ...state, ready: true, characters, nextPage, error: null };
  }
  return state;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateList':
      return updateListReducer(state, action.payload);
    case 'update':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

const CharacterList = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataSource.fetchCharacters();
        dispatch({ type: 'updateList', payload: response.data });
      } catch (error) {
        handleErrors(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const { showDetails } = state;
    if (showDetails) {
      fetchCharacterEpisodes();
    }
  });

  const fetchNext = async () => {
    const { nextPage } = state;
    try {
      const response = await DataSource.fetchURL(nextPage);
      dispatch({ type: 'updateList', payload: response.data });
    } catch (error) {
      handleErrors(error);
    }
  };

  const fetchCharacterEpisodes = async () => {
    const {
      character: { episode },
    } = state;

    try {
      const episodes = await DataSource.fetchEpisodesNames(episode);
      if (Array.isArray(episodes)) {
        dispatch({
          type: 'update',
          payload: {
            episodes,
            episodeReady: true,
          },
        });
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  const handleErrors = error => {
    dispatch({ type: 'update', payload: { error } });
  };

  const handleShowDetails = character => {
    dispatch({
      type: 'update',
      payload: {
        character,
        showDetails: true,
      },
    });
  };

  const hideDetails = () =>
    dispatch({
      type: 'update',
      payload: {
        episodeReady: false,
        character: null,
        showDetails: false,
        episodes: [],
      },
    });

  const itemRenderer = character => {
    return (
      <CharacterItem
        key={character.id}
        item={character}
        onClickDetails={handleShowDetails}
      />
    );
  };

  const dummyRenderer = value => {
    return <CharacterItem key={value} loading />;
  };

  const renderCharacterList = () => {
    const { characters, ready } = state;
    if (ready) {
      return characters.map(itemRenderer);
    }

    return DUMMY_ITEMS.map(dummyRenderer);
  };

  const renderCharacterDetails = () => {
    const { character, episodes, episodeReady } = state;
    if (character !== null) {
      const labels = [
        { title: 'Name', value: character.name },
        { title: 'Status', value: character.status },
        { title: 'Species', value: character.species },
        { title: 'Gender', value: character.gender },
        { title: 'Origin', value: character.origin.name },
        { title: 'Last location', value: character.location.name },
      ];

      return (
        <div style={{ flex: 1 }}>
          <LabelList items={labels} />
          <EpisodeList episodes={episodes} ready={episodeReady} />
        </div>
      );
    }
    return null;
  };

  const { showDetails } = state;

  return (
    <>
      <Container>{renderCharacterList()}</Container>
      <footer>
        <Button onClick={fetchNext} flat primary>
          Load more
        </Button>
      </footer>
      <Modal visible={showDetails} onClose={hideDetails}>
        {renderCharacterDetails()}
      </Modal>
    </>
  );
};

export default CharacterList;
