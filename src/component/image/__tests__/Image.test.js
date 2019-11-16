import React from 'react';
import Renderer from 'react-test-renderer';
import Image from '../Image';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Image', () => {
  const callback = jest.fn();
  let component = Renderer.create(<Image src="none.jpg" />);
  it('should have same snapshot when loading', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('when rendering visible', () => {
    beforeEach(() => {
      component = Renderer.create(<Image src="none.jpg" />);
    });
    it('should call set state on image load', () => {
      const instance = component.root.instance;
      instance.setState = callback;
      instance.handleLoad();

      expect(callback.mock.calls).toHaveLength(1);
      expect(callback.mock.calls[0][0]).toEqual({ ready: true });
    });
  });
});
