import React, { memo } from 'react';
import styled from 'styled-components';
import Text from '../text/Text';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Label(props) {
  const { title, children } = props;
  return (
    <Container>
      <Text color="#999">{title}</Text>
      <Text color="teal">{children}</Text>
    </Container>
  );
}

export default memo(Label);
