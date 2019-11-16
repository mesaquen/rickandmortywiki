import React, { PureComponent } from 'react';
import DataSource from '../../logic/DataSource';
import CharacterItem from '../character-item/CharacterItem';
import Button from '../button/Button';
import styled from 'styled-components';
import Modal from '../modal/Modal';
import EpisodeList from '../episode-list/EpisodeList';
import Label from '../label/Label';

const DUMMY_ITEMS = [1, 2, 3, 4];

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default class CharacterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      characters: [],
      episodes: [],
      error: null,
      showDetails: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { showDetails: prevShowDetails } = prevState;
    const { showDetails } = this.state;

    if (showDetails && showDetails !== prevShowDetails) {
      this.fetchCharacterEpisodes();
    }
  }

  fetchData = async () => {
    try {
      const response = await DataSource.fetchCharacters();
      this.updateList(response.data);
    } catch (error) {
      this.handleErrors(error);
    }
  };

  fetchNext = async () => {
    const { nextPage } = this.state;
    try {
      const response = await DataSource.fetchURL(nextPage);
      this.updateList(response.data);
    } catch (error) {
      this.handleErrors(error);
    }
  };

  fetchCharacterEpisodes = async () => {
    const {
      character: { episode },
    } = this.state;

    try {
      const episodes = await DataSource.fetchEpisodesNames(episode);
      if (Array.isArray(episodes)) {
        this.setState({
          episodes,
          episodeReady: true,
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  updateList = data => {
    if (typeof data === 'object') {
      const { characters: oldCharacters } = this.state;
      const {
        info: { next: nextPage },
        results,
      } = data;

      const characters = oldCharacters.concat(results);

      this.setState({ ready: true, characters, nextPage, error: null });
    }
  };

  handleErrors = error => {
    this.setState({ error });
  };

  handleShowDetails = character => {
    this.setState({
      character,
      showDetails: true,
    });
  };

  hideDetails = () => this.setState({ character: null, showDetails: false });

  itemRenderer = character => {
    return (
      <CharacterItem
        key={character.id}
        item={character}
        onClickDetails={this.handleShowDetails}
      />
    );
  };

  dummyRenderer = value => {
    return <CharacterItem key={value} loading />;
  };

  renderCharacterList = () => {
    const { characters, ready } = this.state;
    if (ready) {
      return characters.map(this.itemRenderer);
    }

    return DUMMY_ITEMS.map(this.dummyRenderer);
  };

  renderCharacterDetails = () => {
    const { character, episodes, episodeReady } = this.state;
    if (character !== null) {
      return (
        <div style={{ flex: 1 }}>
          <Label title="Name">{character.name}</Label>
          <Label title="Status">{character.status}</Label>
          <Label title="Species">{character.species}</Label>
          <Label title="Gender"> {character.gender}</Label>
          <Label title="Origin"> {character.origin.name}</Label>
          <Label title="Last location"> {character.location.name}</Label>
          <EpisodeList episodes={episodes} ready={episodeReady} />
        </div>
      );
    }
    return null;
  };

  render() {
    const { showDetails } = this.state;

    return (
      <>
        <Container>{this.renderCharacterList()}</Container>
        <footer>
          <Button onClick={this.fetchNext} flat primary>
            Load more
          </Button>
        </footer>
        <Modal visible={showDetails} onClose={this.hideDetails}>
          {this.renderCharacterDetails()}
        </Modal>
      </>
    );
  }
}
