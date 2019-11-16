import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
const primaryColor = props => (props.primary ? props.color : 'white');
const reversePrimaryColor = props => (!props.primary ? props.color : 'white');
const border = props => {
  if (props.flat) {
    return 'none';
  }

  return `1px solid ${props.color}`;
};

const StyledButton = styled.button`
  border: ${border};
  background: ${primaryColor};
  color: ${reversePrimaryColor};
  padding: 10px 5px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${reversePrimaryColor};
    color: ${primaryColor};
  }
`;

export default class Button extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    primary: PropTypes.bool,
  };

  static defaultProps = {
    primary: false,
    color: 'teal',
  };

  handleClick = () => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick.call(null);
    }
  };

  render() {
    const props = this.props;
    return <StyledButton {...props} onClick={this.handleClick} />;
  }
}
