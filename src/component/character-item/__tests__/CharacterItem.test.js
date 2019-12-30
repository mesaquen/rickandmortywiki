import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CharacterItem from '../CharacterItem';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('CharacterItem', () => {
  afterEach(cleanup);

  it('should have same snapshot', () => {
    const { asFragment } = render(<CharacterItem loading />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when passing valid values', () => {
    const callback = jest.fn();
    const item = {
      name: 'name',
      species: 'species',
      gender: 'gender',
      origin: { name: 'origin' },
    };

    it('should have same snapshot', () => {
      const { asFragment } = render(
        <CharacterItem item={item} onClickDetails={callback} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should call onCllickDetails with same value', () => {
      const { getByTestId } = render(
        <CharacterItem item={item} onClickDetails={callback} />
      );
      const element = getByTestId('button');
      fireEvent.click(element);

      expect(callback.mock.calls).toHaveLength(1);
      expect(callback.mock.calls[0][0]).toEqual(item);
    });
  });
});
