import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.span`
  font-size: ${props => props.size};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${props => props.color};
`;

function Text(props) {
  return <StyledText {...props} />;
}

Text.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
};

Text.defaultProps = {
  size: '16px',
  color: '#000000',
  bold: false,
};

export default memo(Text);
