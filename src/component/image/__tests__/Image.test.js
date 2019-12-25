import React from 'react';
import Renderer from 'react-test-renderer';
import Image from '../Image';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Image', () => {
  let component = Renderer.create(<Image src="none.jpg" />);
  it('should have same snapshot when loading', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
