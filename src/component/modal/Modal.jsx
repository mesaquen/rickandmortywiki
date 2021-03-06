import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from '../../component';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
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

const Modal = props => {
  const stopPropagation = event => {
    event.stopPropagation();
  };

  const { children, onClose, visible } = props;

  return (
    <Fog visible={visible} onClick={onClose}>
      <Container onClick={stopPropagation}>
        <Text size="20px" bold>
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
};

Modal.ropTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  visible: false,
};

export default React.memo(Modal);
