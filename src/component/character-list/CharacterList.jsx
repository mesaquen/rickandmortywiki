import React, { PureComponent } from 'react';
import CharacterSource from '../../logic/CharacterSource';
import CharacterItem from '../character-item/CharacterItem';
import Button from '../button/Button';

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
      <div>
        <header>CharacterList</header>
        <section>{characters.map(this.itemRenderer)}</section>
        <footer>
          <Button onClick={this.fetchNext}>Load more</Button>
        </footer>
      </div>
    );
  }
}
