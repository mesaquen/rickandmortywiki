import React, { PureComponent } from 'react';
import CharacterSource from '../../logic/CharacterSource';
import CharacterItem from '../character-item/CharacterItem';
import Button from '../button/Button';
import styled from 'styled-components';

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
      const {
        info: { next: nextPage },
        results: characters,
      } = data;
      this.setState({ characters, nextPage, error: null });
    }
  };

  handleErrors = error => {
    this.setState({ error });
  };

  itemRenderer = character => {
    return <CharacterItem key={character.id} item={character} />;
  };

  render() {
    const { characters } = this.state;
    return (
      <>
        <Container>{characters.map(this.itemRenderer)}</Container>
        <footer>
          <Button onClick={this.fetchNext}>Load more</Button>
        </footer>
      </>
    );
  }
}
