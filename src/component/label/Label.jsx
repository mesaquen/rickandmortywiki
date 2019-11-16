import React, { memo } from 'react';
import styled from 'styled-components';
import Text from '../text/Text';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(Text)`
  text-align: right;
`;

function Label(props) {
  const { title, children } = props;
  return (
    <Container>
      <Text color="#999">{title}</Text>
      <StyledText color="teal">{children}</StyledText>
    </Container>
  );
}

export default memo(Label);
