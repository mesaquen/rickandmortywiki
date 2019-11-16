import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../button/Button';
import Text from '../text/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 4px;
`;

const Header = styled.header`
  display: flex
  max-width: 300px;
  background: red;
  position: relative;  
`;

const Title = styled(Text)`
  position: absolute;
  padding-left: 12px;
  bottom: 0;
  left: 0;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 288px;
`;

const Image = styled.img`
  display: flex;
  width: 300px;
`;

const Label = styled.span`
  font-size: 14px;
`;

const ItemButton = styled(Button)`
  margin-top: 8px;
`;

export default class CharacterItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onClickDetails: PropTypes.func.isRequired,
  };

  handleClickDetails = () => {
    const { item, onClickDetails } = this.props;
    onClickDetails.call(null, item);
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
        <ItemButton onClick={this.handleClickDetails}>Details</ItemButton>
      </Container>
    );
  }
}
