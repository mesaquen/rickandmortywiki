import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../button/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 4px;
`;

const Header = styled.header`
  display: flex
  max-width: 300px;
  background: red;
  position: relative;  
`;

const Title = styled.span`
  position: absolute;
  padding-left: 12px;
  bottom: 0;
  left: 0;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
`;

const Image = styled.img`
  display: flex;
`;

const Label = styled.span`
  font-size: 14px;
`;

const ItemButton = styled(Button)`
  margin-top: 8px;
`;

export default class CharacterItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
  };
  render() {
    const { item } = this.props;
    return (
      <Container>
        <Header>
          <Image src={item.image} />
          <Title>{item.name}</Title>
        </Header>

        <Label>Species: {item.species}</Label>
        <Label>Gender: {item.gender}</Label>
        <Label>Origin: {item.origin.name}</Label>
        <ItemButton>Details</ItemButton>
      </Container>
    );
  }
}
