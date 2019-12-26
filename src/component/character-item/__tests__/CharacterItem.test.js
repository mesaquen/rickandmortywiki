import React from 'react';
import Renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import CharacterItem from '../CharacterItem';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('CharacterItem', () => {
  let component = Renderer.create(<CharacterItem loading />);
  it('should have same snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('when passing valid values', () => {
    const callback = jest.fn();
    const item = {
      name: 'name',
      species: 'species',
      gender: 'gender',
      origin: { name: 'origin' },
    };
    beforeEach(() => {
      component = Renderer.create(
        <CharacterItem item={item} onClickDetails={callback} />
      );
    });

    it('should have same snapshot', () => {
      expect(component.toJSON()).toMatchSnapshot();
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
