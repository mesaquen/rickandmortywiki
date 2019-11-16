import React from 'react';
import Renderer from 'react-test-renderer';
import Label from '../Label';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Label', () => {
  let component = Renderer.create(<Label title="title">Value</Label>);
  it('should have same snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
