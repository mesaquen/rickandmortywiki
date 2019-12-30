import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Button from '../Button';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */
describe('Button', () => {
  afterEach(cleanup);

  test('button is rendererd without errors', function() {
    const { asFragment } = render(<Button onClick={jest.fn()}>Sample</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('button click callback is called', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<Button onClick={callback}>Sample</Button>);
    const element = getByTestId('button');
    fireEvent.click(element);
    expect(callback.mock.calls).toHaveLength(1);
  });
});
