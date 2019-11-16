import React from 'react';
import styled from 'styled-components';
import CharacterList from './component/character-list/CharacterList';
import Text from './component/text/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <Container>
      <Text size="24px" color="lightgray" bold>
        Rick and Morty Wiki
      </Text>
      <CharacterList />
    </Container>
  );
}

export default App;
