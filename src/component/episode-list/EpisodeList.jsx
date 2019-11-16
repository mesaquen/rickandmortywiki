import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import Text from '../text/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  flex: 0 0 100%;
`;
const List = styled.ul`
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style-type: none;
  padding: 0;
`;
const Header = styled.div`
  margin-top: 12px;
`;
export default class EpisodeList extends Component {
  static propTypes = {
    episodes: PropTypes.arrayOf(PropTypes.object),
    ready: PropTypes.bool,
  };
  renderEpisodes = () => {
    const { episodes } = this.props;
    return episodes.map(episode => (
      <ListItem key={episode.id}>
        <Text size="12px">
          {episode.episode} - {episode.name}
        </Text>
      </ListItem>
    ));
  };

  renderSkeleton = () => {
    return <Skeleton count={3} />;
  };
  render() {
    const { ready, episodes } = this.props;

    return (
      <>
        <Header>
          <Text size="20px" bold>
            Episodes ({episodes.length})
          </Text>
        </Header>
        <Container>
          <List>{ready ? this.renderEpisodes() : this.renderSkeleton()}</List>
        </Container>
      </>
    );
  }
}
