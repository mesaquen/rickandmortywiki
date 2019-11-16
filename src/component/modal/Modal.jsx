import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../text/Text';
import Button from '../button/Button';

const showHideModal = props => (props.visible ? 'block' : 'none');

const Fog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  display: ${showHideModal};
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  min-width: 70%;
  min-height: 70%;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  cursor: auto;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default class Modal extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visible: false,
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { children, onClose, visible } = this.props;
    return (
      <Fog visible={visible} onClick={onClose}>
        <Container onClick={this.stopPropagation}>
          <Text size="20px" bold color="#444444">
            Character Details
          </Text>
          <Content>{children}</Content>
          <Footer>
            <Button onClick={onClose} flat>
              Close
            </Button>
          </Footer>
        </Container>
      </Fog>
    );
  }
}
