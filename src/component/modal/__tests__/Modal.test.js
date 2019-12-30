import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Modal from '../Modal';
import Text from '../../text/Text';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Modal', () => {
  afterEach(cleanup);

  it('should have same snapshot when hidden', () => {
    const { asFragment } = render(<Modal onClose={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have same snapshot when visible', () => {
    const { asFragment } = render(
      <Modal visible onClose={jest.fn()}>
        <Text>Sample</Text>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call modal onClose callback when button is cliked', () => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={callback} visible>
        <Text>Sample</Text>
      </Modal>
    );

    const element = getByTestId('button');
    fireEvent.click(element);

    expect(callback.mock.calls).toHaveLength(1);
  });
});
