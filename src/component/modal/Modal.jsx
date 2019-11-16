import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default class Modal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visible: false,
  };

  render() {
    const { onClose, visible } = this.props;
    return <Fog visible={visible} onClick={onClose}></Fog>;
  }
}
