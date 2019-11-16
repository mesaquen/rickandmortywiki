import React, { PureComponent } from 'react';
import CharacterSource from '../../logic/CharacterSource';
import CharacterItem from '../character-item/CharacterItem';
import Button from '../button/Button';
import styled from 'styled-components';
import Modal from '../modal/Modal';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default class CharacterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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

  handleShowDetails = item => {
    this.setState({
      showDetails: true,
    });
  };

  hideDetails = () => this.setState({ showDetails: false });

  itemRenderer = character => {
    return (
      <CharacterItem
        key={character.id}
        item={character}
        onClickDetails={this.handleShowDetails}
      />
    );
  };

  render() {
    const { characters, showDetails } = this.state;
    return (
      <>
        <Container>{characters.map(this.itemRenderer)}</Container>
        <footer>
          <Button onClick={this.fetchNext}>Load more</Button>
        </footer>
        <Modal visible={showDetails} onClose={this.hideDetails}></Modal>
      </>
    );
  }
}
