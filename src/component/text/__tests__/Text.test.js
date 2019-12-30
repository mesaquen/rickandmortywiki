import React from 'react';
import { render } from '@testing-library/react';
import Text from '../Text';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Text', () => {
  it('should have same snapshot', () => {
    const { asFragment } = render(<Text size="18px">Value</Text>);
    expect(asFragment()).toMatchSnapshot();
  });
});
