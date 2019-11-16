import React, { PureComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
const StyledImage = styled.img`
  display: ${props => (props.ready ? 'block' : 'none')};
`;

export default class Image extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  handleLoad = () => {
    this.setState({ ready: true });
  };
  render() {
    const { width, height, src } = this.props;
    const { ready } = this.state;

    return (
      <>
        {ready ? null : (
          <Skeleton ready={ready} width={width} height={height} />
        )}
        <StyledImage
          ready={ready}
          src={src}
          onLoad={this.handleLoad}
          width={width}
          height={height}
        />
      </>
    );
  }
}
