import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../button/Button';
import Text from '../text/Text';
import Label from '../label/Label';
import Image from '../image/Image';
import Skeleton from 'react-loading-skeleton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 4px;
  padding: 4px;
  background: rgb(68, 68, 68);
`;

const Header = styled.header`
  display: flex
  max-width: 300px;
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

const StyledImage = styled(Image)`
  display: flex;
`;

const ItemButton = styled(Button)`
  margin-top: 8px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    border-bottom: 1px solid lightgray;
  }
  > :last-child {
    border-bottom: none;
  }
`;

export default class CharacterItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onClickDetails: PropTypes.func,
  };

  handleClickDetails = () => {
    const { item, onClickDetails } = this.props;
    onClickDetails.call(null, item);
  };

  renderHeader = () => {
    const { item, loading } = this.props;
    let content = <Skeleton width={300} height={300} />;

    if (!loading) {
      content = (
        <>
          <StyledImage src={item.image} width={300} height={300} />
          <Title>{item.name}</Title>
        </>
      );
    }
    return <Header>{content}</Header>;
  };

  renderLabels = () => {
    const { item, loading } = this.props;
    if (loading) {
      return <Skeleton count={3} />;
    }
    return (
      <>
        <Label title="Species">{item.species}</Label>
        <Label title="Gender"> {item.gender}</Label>
        <Label title="Origin"> {item.origin.name}</Label>
      </>
    );
  };

  render() {
    const { loading } = this.props;
    return (
      <Container>
        {this.renderHeader()}

        <Details>{this.renderLabels()}</Details>
        {loading ? null : (
          <ItemButton primary onClick={this.handleClickDetails}>
            Details
          </ItemButton>
        )}
      </Container>
    );
  }
}
