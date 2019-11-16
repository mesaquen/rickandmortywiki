import React from 'react';
import Renderer from 'react-test-renderer';
import EpisodeList from '../EpisodeList';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('EpisodeList', () => {
  let component = Renderer.create(<EpisodeList ready={false} />);
  it('should have same snapshot when loading', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('when rendering values', () => {
    const episodes = [
      { id: 1, episode: 'S01E01', name: 'one' },
      { id: 2, episode: 'S01E02', name: 'two' },
    ];
    beforeEach(() => {
      component = Renderer.create(<EpisodeList episodes={episodes} ready />);
    });
    it('should have same snapshot', () => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
