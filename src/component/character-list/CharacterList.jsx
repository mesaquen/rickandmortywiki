import React, { PureComponent } from 'react';
import CharacterSource from '../../logic/CharacterSource';
import CharacterItem from '../character-item/CharacterItem';
import Button from '../button/Button';
import styled from 'styled-components';
import Modal from '../modal/Modal';
import Text from '../text/Text';

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
      error: null,
      showDetails: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await CharacterSource.fetchCharacters();
      this.updateList(response.data);
    } catch (error) {
      this.handleErrors(error);
    }
  };

  fetchNext = async () => {
    const { nextPage } = this.state;
    try {
      const response = await CharacterSource.fetchURL(nextPage);
      this.updateList(response.data);
    } catch (error) {
      this.handleErrors(error);
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

      this.setState({ characters, nextPage, error: null });
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

  renderCharacterDetails = () => {
    const { character } = this.state;
    if (character !== null) {
      return (
        <div>
          <Text>{character.name}</Text>
        </div>
      );
    }
    return null;
  };

  render() {
    const { characters, showDetails } = this.state;
    return (
      <>
        <Container>{characters.map(this.itemRenderer)}</Container>
        <footer>
          <Button onClick={this.fetchNext}>Load more</Button>
        </footer>
        <Modal visible={showDetails} onClose={this.hideDetails}>
          {this.renderCharacterDetails()}
        </Modal>
      </>
    );
  }
}
