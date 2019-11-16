import React from 'react';
import Renderer from 'react-test-renderer';
import Text from '../Text';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Text', () => {
  let component = Renderer.create(<Text size="18px">Value</Text>);
  it('should have same snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
