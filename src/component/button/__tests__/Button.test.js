import React from 'react';
import Renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
describe('Button', () => {
  let callback = jest.fn();

  test('button is rendererd with default values', function() {
    const component = Renderer.create(
      <Button onClick={callback}>Sample</Button>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('buitton click callback is called', () => {
    const { getByTestId } = render(<Button onClick={callback}>Sample</Button>);
    const element = getByTestId('button');
    fireEvent.click(element);
    expect(callback.mock.calls).toHaveLength(1);
  });
});
