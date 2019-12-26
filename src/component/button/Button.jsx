import React from 'react';
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

const Button = props => {
  const handleClick = () => {
    const { onClick } = props;
    if (typeof onClick === 'function') {
      onClick.call(null);
    }
  };

  return <StyledButton {...props} onClick={handleClick} data-testid="button" />;
};

Button.propTypes = {
  color: PropTypes.string,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  color: 'teal',
};

export default React.memo(Button);
