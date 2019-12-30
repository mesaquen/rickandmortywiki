import React from 'react';
import { render, cleanup } from '@testing-library/react';
import EpisodeList from '../EpisodeList';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('EpisodeList', () => {
  afterEach(cleanup);

  it('should have same snapshot when loading', () => {
    const { asFragment } = render(<EpisodeList ready={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have same snapshot when rendering values', () => {
    const episodes = [
      { id: 1, episode: 'S01E01', name: 'one' },
      { id: 2, episode: 'S01E02', name: 'two' },
    ];

    const { asFragment } = render(<EpisodeList episodes={episodes} ready />);
    expect(asFragment()).toMatchSnapshot();
  });
});
