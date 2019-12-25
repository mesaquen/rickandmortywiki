import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
const StyledImage = styled.img`
  display: ${props => (props.ready ? 'block' : 'none')};
`;

const Image = props => {
  const [ready, setReady] = useState(false);

  const handleLoad = () => void setReady(true);
  const { width, height, src } = props;

  return (
    <>
      {ready ? null : <Skeleton ready={ready} width={width} height={height} />}
      <StyledImage
        ready={ready}
        src={src}
        onLoad={handleLoad}
        width={width}
        height={height}
      />
    </>
  );
};

export default React.memo(Image);
