import React from 'react';
import styled from 'styled-components';
import { Text } from '../../component';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(Text)`
  text-align: right;
`;

const Label = props => {
  const { title, children } = props;
  return (
    <Container>
      <Text color="#999">{title}</Text>
      <StyledText color="teal">{children}</StyledText>
    </Container>
  );
};

export default React.memo(Label);
