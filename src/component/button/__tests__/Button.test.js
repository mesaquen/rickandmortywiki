import React from 'react';
import Renderer from 'react-test-renderer';
import Button from '../Button';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
describe('Button', () => {
  let component;
  let callback = jest.fn();
  component = Renderer.create(<Button onClick={callback}>Sample</Button>);

  test('button is rendererd with default values', function() {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('buitton click callback is called', () => {
    const instance = component.root.instance;
    instance.handleClick();
    expect(callback.mock.calls).toHaveLength(1);
  });
});
